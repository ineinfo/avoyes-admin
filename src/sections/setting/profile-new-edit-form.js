import * as Yup from 'yup';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { assetsPath, FetchProfile, UpdateProfile } from 'src/utils/apiendpoints';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ProfileNewEditForm() {
  const [tableData, setTableData] = useState();

  const fetchimages = tableData?.profile_url ? `${assetsPath}/${tableData?.profile_url}` : '';

  const router = useRouter();

  const user = useAuthContext();
  const token = user.user.accessToken;

  const GENDER = [
    { value: '1', label: 'Male' },
    { value: '2', label: 'Female' },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    // dob: Yup.string().required('DOB is required'),
    // profile_url: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: tableData?.first_name || '',
      last_name: tableData?.last_name || '',
      email: tableData?.email || '',
      phone: tableData?.phone || '',
      gender: tableData?.gender || '',
      // dob: tableData?.dob ? format(new Date(tableData.dob), 'yyyy-MM-dd') : null,

      // profile_url: fetchimages || null,
    }),
    [tableData]
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

  useEffect(() => {
    reset(defaultValues);
  }, [tableData, reset, defaultValues]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchProfile(token);
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
        if (key === 'profile_url' && value[0]) {
          formData.append(key, value);
        } else if (key === 'dob' && value) {
          formData.append(key, format(new Date(value), 'yyyy-MM-dd'));
        } else {
          formData.append(key, value);
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      const response = await UpdateProfile(formData, token);
      if (response.status) {
        enqueueSnackbar(response.message);
        const updatedProfile = await FetchProfile(token);
        setTableData(updatedProfile.data);
      } else {
        enqueueSnackbar(response.message, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.error || 'Unknown error', { variant: 'error' });
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profile_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profile_url"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid> */}

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
              <RHFTextField name="first_name" label="First name" />
              <RHFTextField name="last_name" label="Last name" />
              <RHFTextField name="email" label="Email address" />
              <RHFTextField name="phone" label="Phone number" />
              <RHFRadioGroup row spacing={8} name="gender" options={GENDER} label="Gender" />

              {/* <Controller
                name="dob"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(newValue ? format(new Date(newValue), 'yyyy-MM-dd') : null);
                    }}
                    format="yyyy-MM-dd"
                    label="DOB"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                Update
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ProfileNewEditForm.propTypes = {};

