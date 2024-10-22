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
import { CreateChallenge, UpdateChallenge } from 'src/api/challenges';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentChallenges }) {
  const Challenges = Array.isArray(currentChallenges) ? currentChallenges[0] : currentChallenges;
  const user = useAuthContext();
  const token = user?.user?.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages = Challenges?.image_url ? `${Challenges.image_url}` : '';
  console.log(fetchimages,"Images")

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Description is required'),
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
    files: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Challenges?.title || '',
      subtitle: Challenges?.sub_title || '',
      start_date: Challenges?.start_date ? format(new Date(Challenges.start_date), 'yyyy-MM-dd') : '',
      end_date: Challenges?.end_date ? format(new Date(Challenges.end_date), 'yyyy-MM-dd') : '',
      files: fetchimages || null,
    }),
    [Challenges]
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
  }, [Challenges, reset, defaultValues]);

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
      if (Challenges) {
        await UpdateChallenge(Challenges.id, formData, token);
        enqueueSnackbar('Challenges updated successfully!', { variant: 'success' });
      } else {
        await CreateChallenge(formData, token);
        enqueueSnackbar('Challenges created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.challenges.list);
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
                  <RHFTextField name="subtitle" label="Subtitle" />
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
                {!Challenges ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  Challenges: PropTypes.object,
};
