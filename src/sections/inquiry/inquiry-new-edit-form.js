import * as Yup from 'yup';
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
import { CreateInquiry, UpdateInquiry } from 'src/api/inquiry';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentInquiry }) {
  const Inquiry = Array.isArray(currentInquiry) ? currentInquiry[0] : currentInquiry;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = Inquiry?.image_url ? `${Inquiry.image_url}` : '';

  const NewClientSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: Inquiry?.name || '',
      email: Inquiry?.email || '',
      phone: Inquiry?.phone || '',
      message: Inquiry?.message || '',
    }),
    [Inquiry]
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
  }, [Inquiry, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (Inquiry) {
        await UpdateInquiry(Inquiry.id, data, token);
        enqueueSnackbar('Inquiry updated successfully!', { variant: 'success' });
      } else {
        await CreateInquiry(data, token);
        enqueueSnackbar('Inquiry created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.inquiry.list);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

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
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phone" label="Phone no." type="number" />
              <RHFTextField name="message" label="Message" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Inquiry ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
