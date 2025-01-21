import * as Yup from 'yup';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/system/Unstable_Grid';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { UsegetBlogTags } from 'src/api/blogtags';
import { CreateBlog, UpdateBlog } from 'src/api/blog';
import { UsegetBlogCategories } from 'src/api/blogcategory';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentBlog }) {
  const Blog = Array.isArray(currentBlog) ? currentBlog[0] : currentBlog;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { products: propertyTypes, productsLoading: propertyTypesLoading } = UsegetBlogCategories();

  const { products: propertyTypess, productsLoading: propertyTypesLoadings } = UsegetBlogTags();

  const fetchimages = Blog?.image_url ? `${Blog.image_url}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author name is required'),
    description: Yup.string().required('Description is required'),
    short_description: Yup.string().required('Short description is required'),
    // tags: Yup.array().min(1, 'Must have at least 1 tags'),
    category_id: Yup.string().required('Category name is required'),
    blog_date: Yup.string()
      .required('Start date is required')
      .test('is-valid-date', 'Start date is not valid', (value) => !Number.isNaN(Date.parse(value))),
    image_url: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(() => {
    const tagsArray =
      Blog?.tags.map((tagTitle, index) => ({
        id: index + 1,
        title: tagTitle,
      })) || [];

    return {
      title: Blog?.title || '',
      description: Blog?.description || '',
      category_id: Blog?.category_id || '',
      short_description: Blog?.short_description || '',
      author: Blog?.author || '',
      tags: tagsArray,
      blog_date: Blog?.blog_date ? format(new Date(Blog.blog_date), 'yyyy-MM-dd') : '',
      image_url: fetchimages || null,
    };
  }, [Blog]);

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
  }, [Blog, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image_url' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'tags') {
          const tagIds = value.map((tag) => tag.id).join(',');
          formData.append('tags', tagIds);
        } else {
          formData.append(key, value);
        }
      });
      if (Blog) {
        await UpdateBlog(Blog.id, formData, token);
        enqueueSnackbar('Blog updated successfully!', { variant: 'success' });
      } else {
        await CreateBlog(formData, token);
        enqueueSnackbar('Blog created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.blog.list);
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
        setValue('image_url', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image_url', null);
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
              <FormControl fullWidth>
                <InputLabel>Category name</InputLabel>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Category name"
                        error={!!fieldState.error}
                        disabled={propertyTypesLoading}
                      >
                        {propertyTypesLoading ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          propertyTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.title}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText style={{ color: '#FF5630' }}>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <RHFTextField name="title" label="Title" />
              <Controller
                name="blog_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Blog date"
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
              <RHFTextField name="short_description" label="Short description" />
              <RHFAutocomplete
                name="tags"
                label="Tags"
                multiple
                freeSolo
                options={propertyTypess.map((option) => option)}
                getOptionLabel={(option) => option?.title || ''}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id}>
                    {option.title}
                  </li>
                )}
                onChange={(event, value) => {
                  const uniqueValues = value.filter(
                    (v, index, self) => index === self.findIndex((t) => t?.id === v?.id)
                  );
                  setValue('tags', uniqueValues);
                }}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option?.id}
                      label={option?.title}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
              <RHFTextField name="author" label="Author" />
              <Box sx={{ gridColumn: 'span 2' }}>
                {/* <RHFAutocomplete
                  name="tags"
                  label="Tags"
                  multiple
                  freeSolo
                  options={propertyTypess.map((option) => option)}
                  getOptionLabel={(option) => option?.title || ''}
                  renderOption={(props, option) => (
                    <li {...props} key={option?.id}>
                      {option.title}
                    </li>
                  )}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option?.id}
                        label={option?.title}
                        size="small"
                        color="info"
                        variant="soft"
                      />
                    ))
                  }
                /> */}

                <Stack spacing={1.5} sx={{ mt: 3 }}>
                  <Typography variant="subtitle1">Description</Typography>
                  <RHFEditor name="description" />
                </Stack>
              </Box>
            </Box>
            <Box sx={{ gridColumn: 'span 2', mt: 3 }}>
              <RHFUpload
                name="image_url"
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
                {!Blog ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  Blog: PropTypes.object,
};
