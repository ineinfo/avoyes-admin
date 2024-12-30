import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';
import { assetsPath } from 'src/utils/apiendpoints';
import { useAuthContext } from 'src/auth/hooks';
import { COUNTRIES, CreateActivity, DeleteImageRemoval, UpdateActivity } from 'src/api/activity';
import { DatePicker } from '@mui/x-date-pickers';
import { countries } from 'src/assets/data';
import { UsegetActivityCategories } from 'src/api/activitycategory';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentActivity }) {
  const Activity = Array.isArray(currentActivity) ? currentActivity[0] : currentActivity;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);

  const fetchimages = Activity?.files
    ? Activity.files.map((img) => ({
      iid: img.iid,
      preview: img.file,
    }))
    : [];

  const { products: propertyTypes, productsLoading: propertyTypesLoading } =
    UsegetActivityCategories();

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    hosted_by: Yup.string().required('Hosted by name is required'),
    start_datetime: Yup.string()
      .required('Start date is required')
      .test('is-valid-date', 'Start date is not valid', (value) =>
        value && !Number.isNaN(Date.parse(value))
      ),
    end_datetime: Yup.string()
      .required('End date is required')
      .test('is-valid-date', 'End date is not valid', (value) =>
        value && !Number.isNaN(Date.parse(value))
      )
      .test('is-after-start', 'End date must be after start date', (value) => {
        // Using Yup.ref to reference the start_datetime field
        const start_datetime = Yup.ref('start_datetime'); // Reference to 'start_datetime'
        return !value || !start_datetime || new Date(value) > new Date(start_datetime);
      }),
    country_id: Yup.string().required('Country name is required'),
    activity_id: Yup.string().required('Activity Category name is required'),
    pincode: Yup.string().required('PinCode is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    files: Yup.array().min(1, 'Images are required'),
  });



  const defaultValues = useMemo(
    () => ({
      title: Activity?.title || '',
      hosted_by: Activity?.hosted_by || '',
      start_datetime: Activity?.start_datetime
        ? format(new Date(Activity.start_datetime), "yyyy-MM-dd'T'HH:mm")
        : '',
      end_datetime: Activity?.end_datetime
        ? format(new Date(Activity.end_datetime), "yyyy-MM-dd'T'HH:mm")
        : '',
      location: Activity?.location || '',
      country_id: Activity?.country_id || '',
      activity_id: Activity?.activity_id || '',
      pincode: Activity?.pincode || '',
      description: Activity?.description || '',
      files: fetchimages || null,
    }),
    [Activity]
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
  }, [Activity, reset, defaultValues]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await COUNTRIES(token);
        setTableData(response.data);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Failed to load data', { variant: 'error' });
      }
    };
    fetchData();
  }, [enqueueSnackbar]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'files' && value.length > 0) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append('files', file);
            }
          });
        } else {
          formData.append(key, value);
        }
      });

      if (Activity) {
        await UpdateActivity(Activity.id, formData, token);
        enqueueSnackbar('Activity updated successfully!', { variant: 'success' });
      } else {
        await CreateActivity(formData, token);
        enqueueSnackbar('Activity created successfully!', { variant: 'success' });
      }

      router.push(paths.dashboard.activity.list);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.files || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('files', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.files]
  );


  const handleRemoveFile = useCallback(
    async (inputFile) => {
      let updatedFiles = values.files;

      if (inputFile.iid) {
        try {
          await DeleteImageRemoval(inputFile.iid, token);
          enqueueSnackbar('Image removed successfully!', { variant: 'success' });
        } catch (error) {
          enqueueSnackbar('Error removing image', { variant: 'error' });
          return;
        }
      }
      updatedFiles = updatedFiles.filter((file) => file.preview !== inputFile.preview);

      setValue('files', updatedFiles);
    },
    [setValue, values.files, token]
  );

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
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="hosted_by" label="Hosted By" />
              <RHFTextField
                type="datetime-local"
                name="start_datetime"
                label="Start date"
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                type="datetime-local"
                name="end_datetime"
                label="End date"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Country Name</InputLabel>
                <Controller
                  name="country_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Country Name"
                        error={!!fieldState.error}
                        disabled={propertyTypesLoading}
                      >
                        {propertyTypesLoading ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          tableData.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
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
              <FormControl fullWidth>
                <InputLabel>Activity Category name</InputLabel>
                <Controller
                  name="activity_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Activity Category name"
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
              <RHFTextField name="location" label="Location" />
              <RHFTextField name="pincode" label="Pin Code" type="number" />
              <Box sx={{ gridColumn: 'span 2' }}>
                <Stack spacing={3}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle1">Description</Typography>
                    <RHFEditor name="description" />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ gridColumn: 'span 2' }}>
                <RHFUpload
                  multiple
                  thumbnail
                  name="files"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
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
                {!Activity ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  Activity: PropTypes.object,
};
