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
import { CreateColor, UpdateColor } from 'src/api/color';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentColor }) {
  const Color = Array.isArray(currentColor) ? currentColor[0] : currentColor;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Color is required'),
    color_code: Yup.string().required('Color code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Color?.title || '',
      color_code: Color?.color_code || '',
    }),
    [Color]
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
  }, [Color, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (Color) {
        await UpdateColor(Color.id, data, token);
        enqueueSnackbar('Color updated successfully!', { variant: 'success' });
      } else {
        await CreateColor(data, token);
        enqueueSnackbar('Color created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.color.list);
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
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* <Box sx={{ gridColumn: 'span 2' }}> */}
              <RHFTextField name="title" label="Color" />
              <RHFTextField name="color_code" label="Color Code" />
              {/* </Box> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Color ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
