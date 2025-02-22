import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/system/Unstable_Grid';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { ChangePassword } from 'src/utils/apiendpoints';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { usePopover } from 'src/components/custom-popover';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserNewEditForm() {
  const router = useRouter();
  const { logout } = useAuthContext();
  const popover = usePopover();
  const currentpassword = useBoolean();
  const newpassword = useBoolean();
  const confirmpassword = useBoolean();
  const user = useAuthContext();
  const token = user?.user?.accessToken;

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/auth/jwt/login');
    } catch (error2) {
      console.error(error2);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };



  const NewUserSchema = Yup.object().shape({
    current_password: Yup.string().required('Current Password is required'),
    new_password: Yup.string().required('New Password is required'),
    confirm_password: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      current_password: '',
      new_password: '',
      confirm_password: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     const response = await ChangePassword(data,token);
  //     if (response.status) {
  //       enqueueSnackbar(response.message);
  //       handleLogout();
  //     } 
  //   } catch (error) {
  //     enqueueSnackbar(error.response?.data?.error || 'Unknown error', { variant: 'error' });
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await ChangePassword(data, token);
      if (response?.status === true) {
        enqueueSnackbar(response.message, { variant: 'success' });
        reset();
        handleLogout();
      } else {
        enqueueSnackbar(response.error || 'An error occurred', { variant: 'error' });
      }
    } catch (error1) {
      const errorMessage = error1?.response?.data?.error || 'Unknown error';
      enqueueSnackbar(errorMessage, { variant: 'error' });
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
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField
                name="current_password"
                label="Current Password"
                type={currentpassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={currentpassword.onToggle} edge="end">
                        <Iconify
                          icon={currentpassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="new_password"
                label="New Password"
                type={newpassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={newpassword.onToggle} edge="end">
                        <Iconify
                          icon={newpassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="confirm_password"
                label="Confirm Password"
                type={confirmpassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={confirmpassword.onToggle} edge="end">
                        <Iconify
                          icon={confirmpassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }} spacing={3}>
              <LoadingButton type="submit" size="medium" variant="contained" loading={isSubmitting}>
                Change
              </LoadingButton>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {};
