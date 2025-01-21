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
import { CreateEventCategory, UpdateEventCategory } from 'src/api/eventcategory';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentEventCategory }) {
  const EventCategory = Array.isArray(currentEventCategory)
    ? currentEventCategory[0]
    : currentEventCategory;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: EventCategory?.title || '',
    }),
    [EventCategory]
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
  }, [EventCategory, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (EventCategory) {
        await UpdateEventCategory(EventCategory.id, data, token);
        enqueueSnackbar('EventCategory updated successfully!', { variant: 'success' });
      } else {
        await CreateEventCategory(data, token);
        enqueueSnackbar('EventCategory created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.eventcategory.list);
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
                {!EventCategory ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
