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
import { CreateActivity, UpdateActivity } from 'src/api/activity';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentActivity }) {
  const Activity = Array.isArray(currentActivity) ? currentActivity[0] : currentActivity;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = Activity?.image_url ? `${Activity.image_url}` : '';
  console.log(fetchimages,"IMAGEs")

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    hosted_by: Yup.string().required('Description is required'),
    start_datetime: Yup.string()
    .required('Start date is required')
    .test('is-valid-date', 'Start date is not valid', (value) => !isNaN(Date.parse(value))),
    end_datetime: Yup.string()
    .required('End date is required')
    .test('is-valid-date', 'End date is not valid', (value) => !isNaN(Date.parse(value)))
    .test('is-after-start', 'End date must be after start date', function (value) {
      const { start_datetime } = this.parent;
      return !value || !start_datetime || new Date(value) > new Date(start_datetime);
    }),
    location: Yup.string().required('Title is required'),
    files: Yup.mixed().nullable().required('Image is required'),
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
              <Box sx={{ gridColumn: 'span 2' }}>
                <Stack spacing={3}>
                <RHFTextField name="location" label="Location" />
                </Stack>
              </Box>
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
