import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
import {
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { CreateMaterial, UpdateMaterial } from 'src/api/material';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentMaterial }) {
  const Material = Array.isArray(currentMaterial) ? currentMaterial[0] : currentMaterial;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Material is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Material?.title || '',
      description: Material?.description || '',
    }),
    [Material]
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
  }, [Material, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (Material) {
        await UpdateMaterial(Material.id, data, token);
        enqueueSnackbar('Material updated successfully!', { variant: 'success' });
      } else {
        await CreateMaterial(data, token);
        enqueueSnackbar('Material created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.material.list);
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
                <Stack spacing={3}>
                  <RHFTextField name="title" label="Material" />
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle1">Description</Typography>
                    <RHFEditor name="description" />
                  </Stack>
                </Stack>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Material ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
