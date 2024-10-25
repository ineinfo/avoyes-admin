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
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { CreateEventCategory, UpdateEventCategory } from 'src/api/eventcategory';
import { CreateEventSpeaker, UpdateEventSpeaker } from 'src/api/eventspeaker';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentEventSpeaker }) {
  const EventSpeaker = Array.isArray(currentEventSpeaker)
    ? currentEventSpeaker[0]
    : currentEventSpeaker;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: EventSpeaker?.title || '',
    }),
    [EventSpeaker]
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
  }, [EventSpeaker, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (EventSpeaker) {
        await UpdateEventSpeaker(EventSpeaker.id, data, token);
        enqueueSnackbar('EventSpeaker updated successfully!', { variant: 'success' });
      } else {
        await CreateEventSpeaker(data, token);
        enqueueSnackbar('EventSpeaker created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.eventspeaker.list);
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
            <Box sx={{ gridColumn: 'span 2' }}>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <RHFTextField name="title" label="Title" />
                </Stack>
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!EventSpeaker ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  EventSpeaker: PropTypes.object,
};
