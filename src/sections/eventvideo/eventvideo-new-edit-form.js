import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { UpdateEventVideo } from 'src/api/eventvideo';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentEventVideo }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewClientSchema = Yup.object().shape({
    video_title: Yup.string().required('Title is required'),
    top_sub_heading: Yup.string().required('Top Sub Heading is required'),
    video_sub_heading: Yup.string().required('Video Sub Heading is required'),
    video_url: Yup.string().url('Invalid URL format').required('Video link is required'),
  });

  const defaultValues = useMemo(
    () => ({
      video_title: currentEventVideo?.video_title || '',
      top_sub_heading: currentEventVideo?.top_sub_heading || '',
      video_sub_heading: currentEventVideo?.video_sub_heading || '',
      video_url: currentEventVideo?.video_url || '',
    }),
    [currentEventVideo]
  );

  const user = useAuthContext();
  const token = user.user.accessToken;

  const methods = useForm({
    resolver: yupResolver(NewClientSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [currentEventVideo, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await UpdateEventVideo(currentEventVideo.id, data, token);
      enqueueSnackbar('Event Video updated successfully!', { variant: 'success' });
      router.push(paths.dashboard.eventvideo.list);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="video_title" label="Title" />
            <RHFTextField name="top_sub_heading" label="Top Sub Heading" />
            <RHFTextField name="video_sub_heading" label="Video Sub Heading" />
            <RHFTextField name="video_url" label="Video Link" />
          </Box>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Update
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  currentEventVideo: PropTypes.object,
};
