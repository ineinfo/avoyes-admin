import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback, useState } from 'react';
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
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';
import { assetsPath } from 'src/utils/apiendpoints';
import { useAuthContext } from 'src/auth/hooks';
import { COUNTRIES, CreateActivity, UpdateActivity } from 'src/api/activity';
import { DatePicker } from '@mui/x-date-pickers';
import { countries } from 'src/assets/data';
import { CreateActivityCategory, UpdateActivityCategory } from 'src/api/activitycategory';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentActivityCategory }) {
  const ActivityCategory = Array.isArray(currentActivityCategory) ? currentActivityCategory[0] : currentActivityCategory;
  const user = useAuthContext();
  const token = user?.user?.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);

  const fetchimages = ActivityCategory?.image_url ? `${ActivityCategory.image_url}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    files: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: ActivityCategory?.title || '',
      files: fetchimages || null,
    }),
    [ActivityCategory]
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
  }, [ActivityCategory, reset, defaultValues]);

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
        if (key === 'files' && value[0]) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });
      if (ActivityCategory) {
        await UpdateActivityCategory(ActivityCategory.id, formData, token);
        enqueueSnackbar('ActivityCategory updated successfully!', { variant: 'success' });
      } else {
        await CreateActivityCategory(formData, token);
        enqueueSnackbar('ActivityCategory created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.activitycategory.list);
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
            <Box sx={{ gridColumn: 'span 2' }}>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <RHFTextField name="title" label="Title" />
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ gridColumn: 'span 2', mt: 3 }}>
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

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!ActivityCategory ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
