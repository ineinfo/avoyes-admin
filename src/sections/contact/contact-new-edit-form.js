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
import { UpdateContact } from 'src/api/contact';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentContact }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const user = useAuthContext();
  const token = user.user.accessToken;

  const NewClientSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone no. is required'),
    address: Yup.string().required('Address is required'),
    google_map: Yup.string().required('Google Map is required'),
  });

  const defaultValues = useMemo(
    () => ({
      email: currentContact?.email || '',
      phone: currentContact?.phone || '',
      address: currentContact?.address || '',
      google_map: currentContact?.google_map || '',
    }),
    [currentContact]
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
  }, [currentContact, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentContact) {
        await UpdateContact(data, token);
        enqueueSnackbar('Contact Us updated successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.contact.list);
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
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="phone" label="Phone no." />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="google_map" label="Google Map" />
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
  currentContact: PropTypes.object,
};
