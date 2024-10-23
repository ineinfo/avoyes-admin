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
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { CreateEvent, UpdateEvent } from 'src/api/event';
import { DatePicker } from '@mui/x-date-pickers';
import { UsegetEventCategories } from 'src/api/eventcategory';
import { UsegetEventSpeakers } from 'src/api/eventspeaker';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentEvent }) {
  const Event = Array.isArray(currentEvent) ? currentEvent[0] : currentEvent;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const { products: EventCategory, productsLoading: EventCategoryLoading } = UsegetEventCategories();
  const { products: EventSpeaker, productsLoading: EventSpeakerLoading } = UsegetEventSpeakers();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = Event?.image_url ? `${Event.image_url}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    short_description: Yup.string().required('Title is required'),
    event_category_id: Yup.string().required('Event Category is required'),
    event_speaker_id: Yup.string().required('Event Speaker is required'),
    start_date: Yup.string()
      .required('Start date is required')
      .test('is-valid-date', 'Start date is not valid', (value) => !isNaN(Date.parse(value))),
    end_date: Yup.string()
      .required('End date is required')
      .test('is-valid-date', 'End date is not valid', (value) => !isNaN(Date.parse(value)))
      .test('is-after-start', 'End date must be after start date', function (value) {
        const { start_date } = this.parent;
        return !value || !start_date || new Date(value) > new Date(start_date);
      }),
    description: Yup.string().required('Description is required'),
    image_url: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Event?.title || '',
      short_description: Event?.short_description || '',
      event_category_id: Event?.event_category_id || '',
      event_speaker_id: Event?.event_speaker_id || '',
      description: Event?.description || '',
      start_date: Event?.start_date ? format(new Date(Event.start_date), 'yyyy-MM-dd') : '',
      end_date: Event?.end_date ? format(new Date(Event.end_date), 'yyyy-MM-dd') : '',
      isFeatured: Event?.is_featured !== undefined ? String(Event.is_featured) : '', 
      image_url: fetchimages || null,
    }),
    [Event]
  );

  const methods = useForm({
    resolver: yupResolver(NewClientSchema),
    defaultValues,
  });

  const GENDER = [
    { value: '1', label: 'True' },
    { value: '0', label: 'False' },
  ];

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
  }, [Event, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image_url' && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      if (Event) {
        await UpdateEvent(Event.id, formData, token);
        enqueueSnackbar('Event updated successfully!', { variant: 'success' });
      } else {
        await CreateEvent(formData, token);
        enqueueSnackbar('Event created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.event.list);
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

  const handleRemoveFile = useCallback(() => {
    setValue('image_url', null);
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
              <RHFTextField name="short_description" label="Short Description" />
              <FormControl fullWidth>
                <InputLabel>Event Category</InputLabel>
                <Controller
                  name="event_category_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Event Category"
                        error={!!fieldState.error}
                        disabled={EventCategoryLoading}
                      >
                        {EventCategoryLoading ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          EventCategory.map((type) => (
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
              <FormControl fullWidth>
                <InputLabel>Event Speaker</InputLabel>
                <Controller
                  name="event_speaker_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Event Speaker"
                        error={!!fieldState.error}
                        disabled={EventSpeakerLoading}
                      >
                        {EventSpeakerLoading ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          EventSpeaker.map((type) => (
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
              <Controller
                name="start_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Start date"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue ? format(new Date(newValue), 'yyyy-MM-dd') : null);
                    }}
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="end_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="End date"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue ? format(new Date(newValue), 'yyyy-MM-dd') : null);
                    }}
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
              <Box sx={{ gridColumn: 'span 2' }}>
                <Stack spacing={3}>
                <RHFRadioGroup row spacing={8} name="isFeatured" options={GENDER} label="Is Featured" />
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle1">Description</Typography>
                    <RHFEditor name="description" />
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ gridColumn: 'span 2' }}>
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
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Event ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  Event: PropTypes.object,
};
