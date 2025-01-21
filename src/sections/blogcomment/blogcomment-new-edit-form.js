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
import { CreateBlogComment, UpdateBlogComment } from 'src/api/blogcomment';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentComment }) {
  const Comment = Array.isArray(currentComment) ? currentComment[0] : currentComment;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewClientSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
  });

  const defaultValues = useMemo(
    () => ({
      comment: Comment?.comment || '',
      blog_id: Comment?.blog_id || '',
      user_id: Comment?.user_id || '',
    }),
    [Comment]
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
  }, [Comment, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (Comment) {
        await UpdateBlogComment(Comment.id, data, token);
        enqueueSnackbar('Comment updated successfully!', { variant: 'success' });
      } else {
        await CreateBlogComment(data, token);
        enqueueSnackbar('Comment created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.blog.blogcomment.list);
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
                  <RHFTextField name="comment" label="Comment" />
                </Stack>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Comment ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {};
