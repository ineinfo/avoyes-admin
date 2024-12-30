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
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
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

  const { products: EventCategory, productsLoading: EventCategoryLoading } =
    UsegetEventCategories();
  const { products: EventSpeaker, productsLoading: EventSpeakerLoading } = UsegetEventSpeakers();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = Event?.image_url ? `${Event.image_url}` : '';

  const Options = [
    { value: 1, label: 'true' },
    { value: 0, label: 'false' },
  ];

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    short_description: Yup.string().required('Title is required'),
    event_category_id: Yup.string().required('Event Category is required'),
    event_speaker_id: Yup.string().required('Event Speaker is required'),
    start_date: Yup.string()
      .required('Start date is required')
      .test('is-valid-date', 'Start date is not valid', (value) => !Number.isNaN(Date.parse(value))),
    end_date: Yup.string()
      .required('End date is required')
      .test('is-valid-date', 'End date is not valid', (value) =>
        value && !Number.isNaN(Date.parse(value))
      )
      .test('is-after-start', 'End date must be after start date', (value) => {
        const start_date = Yup.ref('start_date'); // Reference to 'start_date'
        return value && start_date && new Date(value) > new Date(start_date);
      }),
    cost: Yup.string().required('Cost is required'),
    organizer: Yup.string().required('Organizer is required'),
    organizer_contact: Yup.string().required('Organizer Contact is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    image_url: Yup.mixed().nullable().required('Image is required'),
    map_url: Yup.string().url('Invalid URL format').required('Map URL is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Event?.title || '',
      short_description: Event?.short_description || '',
      event_category_id: Event?.event_category_id || '',
      event_speaker_id: Event?.event_speaker_id || '',
      map_url: Event?.map_url || '',
      start_date: Event?.start_date ? format(new Date(Event.start_date), 'yyyy-MM-dd HH:mm') : '',
      end_date: Event?.end_date ? format(new Date(Event.end_date), 'yyyy-MM-dd HH:mm') : '',
      cost: Event?.cost || '',
      organizer: Event?.organizer || '',
      organizer_contact: Event?.organizer_contact || '',
      location: Event?.location || '',
      isFeatured: Event?.is_featured === 1 ? 1 : 0,
      description: Event?.description || '',
      image_url: fetchimages || null,
    }),
    [Event]
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
  }, [Event, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedData = {
        ...data,
        start_date: data.start_date ? format(new Date(data.start_date), 'yyyy-MM-dd HH:mm') : '',
        end_date: data.end_date ? format(new Date(data.end_date), 'yyyy-MM-dd HH:mm') : '',
      };

      const formData = new FormData();
      Object.entries(formattedData).forEach(([key, value]) => {
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
              {/* Event Category */}
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
              {/* Event Speaker */}
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
              <RHFTextField
                type="datetime-local"
                name="start_date"
                label="Start date"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                type="datetime-local"
                name="end_date"
                label="End date"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField name="cost" label="Cost" />
              <RHFTextField name="organizer" label="Organizer" />
              <RHFTextField name="organizer_contact" label="Organizer Contact" />
              <RHFTextField name="location" label="Location" />
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <RHFRadioGroup {...field} row spacing={8} options={Options} label="Is Featured" />
                )}
              />
              <RHFTextField name="map_url" label="Map Url" />
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
