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
import { UpdateAboutUs } from 'src/api/aboutus';
import { useAuthContext } from 'src/auth/hooks';
import { UpdateContact } from 'src/api/contact';
import { UpdateDeliveryDetails } from 'src/api/deliverydetails';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentDetails }) {
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
      email: currentDetails?.email || '',
      phone: currentDetails?.phone || '',
      address: currentDetails?.address || '',
      google_map: currentDetails?.google_map || '',
    }),
    [currentDetails]
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
  }, [currentDetails, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentDetails) {
        await UpdateDeliveryDetails(data, token);
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
  currentDetails: PropTypes.object,
};
