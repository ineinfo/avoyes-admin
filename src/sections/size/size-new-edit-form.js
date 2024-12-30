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
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  InputAdornment,
  IconButton,
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
import { fData } from 'src/utils/format-number';
import { assetsPath } from 'src/utils/apiendpoints';
import { DatePicker } from '@mui/x-date-pickers';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { JOB_EXPERIENCE_OPTIONS } from 'src/_mock';
import { CreateSize, UpdateSize } from 'src/api/size';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentSize }) {
  const Size = Array.isArray(currentSize) ? currentSize[0] : currentSize;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const user = useAuthContext();
  const token = user.user.accessToken;

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Size is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Size?.title,
    }),
    [Size]
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
  }, [Size, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (Size) {
        await UpdateSize(Size.id, data, token);
        enqueueSnackbar('Size updated successfully!', { variant: 'success' });
      } else {
        await CreateSize(data, token);
        enqueueSnackbar('Size created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.size.list);
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
              <Box sx={{ gridColumn: 'span 2' }}>
                <RHFTextField name="title" label="Size" />
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Size ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  currentSize: PropTypes.object,
};

