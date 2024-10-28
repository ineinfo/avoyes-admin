import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';
import { assetsPath } from 'src/utils/apiendpoints';
import { useAuthContext } from 'src/auth/hooks';
import { CreateTopBanner, UpdateTopBanner } from 'src/api/topbanner';
import { CreateBottomBanner, UpdateBottomBanner } from 'src/api/bottombanner';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentBottomBanner }) {
  const BottomBanner = Array.isArray(currentBottomBanner) ? currentBottomBanner[0] : currentBottomBanner;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = BottomBanner?.image_url ? `${BottomBanner.image_url}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    sub_title: Yup.string().required('Sub Title is required'),
    files: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: BottomBanner?.title || '',
      sub_title: BottomBanner?.sub_title || '',
      files: fetchimages || null,
    }),
    [BottomBanner]
  );

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
  }, [BottomBanner, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'files' && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      if (BottomBanner) {
        await UpdateBottomBanner(BottomBanner.id, formData, token);
        enqueueSnackbar('Bottom Banner updated successfully!', { variant: 'success' });
      } else {
        await CreateBottomBanner(formData, token);
        enqueueSnackbar('Bottom Banner created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.bottombanner.list);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('files', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('files', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
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
              <RHFTextField name="banner_left_text" label="Banner Left Text" />
              <RHFTextField name="banner_left_text" label="Banner Left Text" />
              <RHFTextField name="banner_left_text" label="Banner Left Text" />
              <RHFTextField name="banner_left_url" label="Banner Left Url" />
              <RHFTextField name="banner_left_url" label="Banner Left Url" />
              <RHFTextField name="banner_left_url" label="Banner Left Url" />
              <Box sx={{ gridColumn: 'span 2' }}>
                <RHFUpload
                  name="files"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!BottomBanner ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  BottomBanner: PropTypes.object,
};
