import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { UsegetFoodTypes } from 'src/api/foodtype';
import { CreateFoodPlace, UpdateFoodPlace } from 'src/api/foodplace';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentFoodPlace }) {
  const FoodPlace = Array.isArray(currentFoodPlace) ? currentFoodPlace[0] : currentFoodPlace;
  const { products: propertyTypes, productsLoading: propertyTypesLoading } = UsegetFoodTypes();
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = FoodPlace?.image_url ? `${FoodPlace.image_url}` : '';
  const fetchimages2 = FoodPlace?.image_url2 ? `${FoodPlace.image_url}` : '';
  const fetchimages3 = FoodPlace?.image_url3 ? `${FoodPlace.image_url3}` : '';
  const fetchimages4 = FoodPlace?.image_url4 ? `${FoodPlace.image_url4}` : '';
  const fetchimages5 = FoodPlace?.image_url5 ? `${FoodPlace.image_url5}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    location: Yup.string().required('Location is required'),
    food_type_id: Yup.string().required('Food Type is required'),
    map_url: Yup.string().required('Map URL is required'),
    image_url: Yup.mixed().nullable().required('Image is required'),
    image_url2: Yup.mixed().nullable().required('Image is required'),
    image_url3: Yup.mixed().nullable().required('Image is required'),
    image_url4: Yup.mixed().nullable().required('Image is required'),
    image_url5: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: FoodPlace?.title || '',
      location: FoodPlace?.location || '',
      map_url: FoodPlace?.map_url || '',
      food_type_id: FoodPlace?.food_type_id || '',
      image_url: fetchimages || null,
      image_url2: fetchimages2 || null,
      image_url3: fetchimages3 || null,
      image_url4: fetchimages4 || null,
      image_url5: fetchimages5 || null,
    }),
    [FoodPlace]
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

  useEffect(() => {
    reset(defaultValues);
  }, [FoodPlace, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image_url' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url2' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url3' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url4' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url5' && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      if (FoodPlace) {
        await UpdateFoodPlace(FoodPlace.id, formData, token);
        enqueueSnackbar('FoodPlace updated successfully!', { variant: 'success' });
      } else {
        await CreateFoodPlace(formData, token);
        enqueueSnackbar('FoodPlace created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.foodplace.list);
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
        setValue('image_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop2 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url2', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop3 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url3', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop4 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url4', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop5 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url5', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image_url', null);
  }, [setValue]);

  const handleRemoveFile2 = useCallback(() => {
    setValue('image_url2', null);
  }, [setValue]);

  const handleRemoveFile3 = useCallback(() => {
    setValue('image_url3', null);
  }, [setValue]);

  const handleRemoveFile4 = useCallback(() => {
    setValue('image_url4', null);
  }, [setValue]);

  const handleRemoveFile5 = useCallback(() => {
    setValue('image_url5', null);
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
              <FormControl fullWidth>
                <InputLabel>Food Type</InputLabel>
                <Controller
                  name="food_type_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Food Type"
                        error={!!fieldState.error}
                        disabled={propertyTypesLoading}
                      >
                        {propertyTypesLoading ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          propertyTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.title}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText style={{ color: '#FF5630' }}>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <RHFTextField name="title" label="Title" />
              <Stack spacing={3}>
                <RHFTextField name="location" label="Location" />
              </Stack>
              <Stack spacing={3}>
                <RHFTextField name="map_url" label="Map URL" />
              </Stack>
              <Box sx={{ gridColumn: 'span 1' }}>
                <RHFUpload
                  name="image_url"
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
              <Box sx={{ gridColumn: 'span 1' }}>
                <RHFUpload
                  name="image_url2"
                  maxSize={3145728}
                  onDrop={handleDrop2}
                  onDelete={handleRemoveFile2}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box sx={{ gridColumn: 'span 1' }}>
                <RHFUpload
                  name="image_url3"
                  maxSize={3145728}
                  onDrop={handleDrop3}
                  onDelete={handleRemoveFile3}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box sx={{ gridColumn: 'span 1' }}>
                <RHFUpload
                  name="image_url4"
                  maxSize={3145728}
                  onDrop={handleDrop4}
                  onDelete={handleRemoveFile4}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box sx={{ gridColumn: 'span 1' }}>
                <RHFUpload
                  name="image_url5"
                  maxSize={3145728}
                  onDrop={handleDrop5}
                  onDelete={handleRemoveFile5}
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
                {!FoodPlace ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  FoodPlace: PropTypes.object,
};
