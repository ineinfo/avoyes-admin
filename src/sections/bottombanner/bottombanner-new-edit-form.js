import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
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
import { CreateBottomBanner, UpdateBottomBanner } from 'src/api/bottombanner';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentBottomBanner }) {
  const BottomBanner = Array.isArray(currentBottomBanner)
    ? currentBottomBanner[0]
    : currentBottomBanner;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = BottomBanner?.banner_left_image ? `${BottomBanner.banner_left_image}` : '';
  const fetchimages2 = BottomBanner?.banner_center_image ? `${BottomBanner.banner_center_image}` : '';
  const fetchimages3 = BottomBanner?.banner_right_image ? `${BottomBanner.banner_right_image}` : '';

  const NewClientSchema = Yup.object().shape({
    banner_left_text: Yup.string().required('Banner Left Text is required'),
    banner_center_text: Yup.string().required('Banner Center Text is required'),
    banner_right_text: Yup.string().required('Banner Right Text is required'),
    banner_left_url: Yup.string().url('Invalid URL format').required('Banner left URL is required'),
    banner_center_url: Yup.string().url('Invalid URL format').required('Banner center URL is required'),
    banner_right_url: Yup.string().url('Invalid URL format').required('Banner right URL is required'),
    banner_left_image: Yup.mixed().nullable().required('Banner Left Image is required'),
    banner_center_image: Yup.mixed().nullable().required('Banner Center Image is required'),
    banner_right_image: Yup.mixed().nullable().required('Banner Right Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      banner_left_text: BottomBanner?.banner_left_text || '',
      banner_center_text: BottomBanner?.banner_center_text || '',
      banner_right_text: BottomBanner?.banner_right_text || '',
      banner_left_url: BottomBanner?.banner_left_url || '',
      banner_center_url: BottomBanner?.banner_center_url || '',
      banner_right_url: BottomBanner?.banner_right_url || '',
      banner_left_image: fetchimages || null,
      banner_center_image: fetchimages2 || null,
      banner_right_image: fetchimages3 || null,
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
        if (key === 'banner_left_image' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'banner_center_image' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'banner_right_image' && value[0]) {
          formData.append(key, value[0]);
        }
        else {
          formData.append(key, value);
        }
      });
      if (BottomBanner) {
        await UpdateBottomBanner(BottomBanner.id, formData, token);
        enqueueSnackbar('Bottom Banner updated successfully!', { variant: 'success' });
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
        setValue('banner_left_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage2 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('banner_center_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage3 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('banner_right_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('banner_left_image', null);
  }, [setValue]);

  const handleRemoveFile2 = useCallback(() => {
    setValue('banner_center_image', null);
  }, [setValue]);

  const handleRemoveFile3 = useCallback(() => {
    setValue('banner_right_image', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Banner Left Section</Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_left_text" label="Banner Left Text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_left_url" label="Banner Left URL" />
                </Grid>
                <Grid item xs={12}>
                  <RHFUpload
                    name="banner_left_image"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onDelete={handleRemoveFile}
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> Banner Left Image
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Update Left Banner
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Banner Center Section</Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_center_text" label="Banner Center Text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_center_url" label="Banner Center URL" />
                </Grid>
                <Grid item xs={12}>
                  <RHFUpload
                    name="banner_center_image"
                    maxSize={3145728}
                    onDrop={handleDropimage2}
                    onDelete={handleRemoveFile2}
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> Banner Center Image
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Update Center Banner
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6">Banner Right Section</Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_right_text" label="Banner Right Text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="banner_right_url" label="Banner Right URL" />
                </Grid>
                <Grid item xs={12}>
                  <RHFUpload
                    name="banner_right_image"
                    maxSize={3145728}
                    onDrop={handleDropimage3}
                    onDelete={handleRemoveFile3}
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> Banner Right Image
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Update Right Banner
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>

          </Card>
        </Grid>
      </Grid>
    </FormProvider>


  );
}

ClientNewEditForm.propTypes = {};
