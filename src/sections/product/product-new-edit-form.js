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
  CircularProgress,
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
import { CreateProduct, UpdateProduct } from 'src/api/product';
import { UsegetCategories } from 'src/api/category';
import { UsegetColors } from 'src/api/color';
import { UsegetTags } from 'src/api/tag';
import { UsegetTypes } from 'src/api/type';
import { UsegetSizes } from 'src/api/size';
import { UsegetMaterials } from 'src/api/material';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentProduct }) {
  const Product = Array.isArray(currentProduct) ? currentProduct[0] : currentProduct;
  const user = useAuthContext();
  const token = user.user.accessToken;

  const { products: propertyTypes, productsLoading: propertyTypesLoading } = UsegetCategories();
  const { products: Colors, productsLoading: ColorTypesLoadings } = UsegetColors();
  const { products: Tags, productsLoading: TagTypesLoadings } = UsegetTags();
  const { products: Type, productsLoading: TypeTypesLoadings } = UsegetTypes();
  const { products: Size, productsLoading: SizeTypesLoadings } = UsegetSizes();
  const { products: Material, productsLoading: MaterialTypesLoadings } = UsegetMaterials();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const fetchimages1 = Product?.image_url1 ? `${Product.image_url1}` : '';
  const fetchimages2 = Product?.image_url2 ? `${Product.image_url2}` : '';
  const fetchimages3 = Product?.image_url3 ? `${Product.image_url3}` : '';
  const fetchimages4 = Product?.image_url4 ? `${Product.image_url4}` : '';
  const fetchimages5 = Product?.image_url5 ? `${Product.image_url5}` : '';

  const NewClientSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    short_description: Yup.string().required('Short description is required'),
    amount: Yup.string().required('Amount is required'),
    discount_amount: Yup.string().required('Discount Amount is required'),
    product_label: Yup.string().required('Product Label is required'),
    weight: Yup.string().required('Weight is required'),
    stock_status: Yup.string().required('Stock Status is required'),
    category_id: Yup.string().required('Category is required'),
    color_id: Yup.array().min(1, 'At least one color must be selected').required('Category name is required'),
    tag_id: Yup.string().required('Category name is required'),
    type_id: Yup.string().required('Category name is required'),
    size_id: Yup.string().required('Category name is required'),
    material_id: Yup.string().required('Category name is required'),
    description: Yup.string().required('Description is required'),
    image_url1: Yup.mixed().nullable().required('Image is required'),
    image_url2: Yup.mixed().nullable().required('Image is required'),
    image_url3: Yup.mixed().nullable().required('Image is required'),
    image_url4: Yup.mixed().nullable().required('Image is required'),
    image_url5: Yup.mixed().nullable().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: Product?.title || '',
      short_description: Product?.short_description || '',
      amount: Product?.amount || '',
      discount_amount: Product?.discount_amount || '',
      product_label: Product?.product_label || '',
      weight: Product?.weight || '',
      stock_status: Product?.stock_status || '',
      category_id: Product?.category_id || '',
      color_id: Product?.color_id ? Array.isArray(Product.color_id) ? Product.color_id : [Product.color_id] : [],

      tag_id: Product?.tag_id || '',
      type_id: Product?.type_id || '',
      size_id: Product?.size_id || '',
      material_id: Product?.material_id || '',
      description: Product?.description || '',
      image_url1: fetchimages1 || null,
      image_url2: fetchimages2 || null,
      image_url3: fetchimages3 || null,
      image_url4: fetchimages4 || null,
      image_url5: fetchimages5 || null,
    }),
    [Product]
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
  }, [Product, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image_url1' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url2' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url3' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url4' && value[0]) {
          formData.append(key, value[0]);
        } else if (key === 'image_url5' && value[0]) {
          formData.append(key, value[0]);
        } else if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}[]`, val));
        } else {
          formData.append(key, value);
        }
      });
      if (Product) {
        await UpdateProduct(Product.id, formData, token);
        enqueueSnackbar('Product updated successfully!', { variant: 'success' });
      } else {
        await CreateProduct(formData, token);
        enqueueSnackbar('Product created successfully!', { variant: 'success' });
      }
      router.push(paths.dashboard.product.list);
      reset();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

  const handleDropimage1 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url1', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage2 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url2', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage3 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url3', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage4 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url4', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropimage5 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image_url5', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile1 = useCallback(() => {
    setValue('image_url1', null);
  }, [setValue]);

  const handleRemoveFile2 = useCallback(() => {
    setValue('image_url2', null);
  }, [setValue]);

  const handleRemoveFile3 = useCallback(() => {
    setValue('image_url3', null);
  }, [setValue]);

  const handleRemoveFile4 = useCallback(() => {
    setValue('image_url4', null);
  }, [setValue]);

  const handleRemoveFile5 = useCallback(() => {
    setValue('image_url5', null);
  }, [setValue]);

  const StockType = [
    { label: 'Out of Stock', id: 0 },
    { label: 'In Stock', id: 1 },
  ];

  const ProductLabel = [
    { label: 'Sale', id: 0 },
    { label: 'New', id: 1 },
  ];

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
              <RHFTextField name="short_description" label="Short Description" />
              <RHFTextField name="amount" label="Amount" type="number" />
              <RHFTextField name="discount_amount" label="Discount Amount" type="number" />
              <RHFAutocomplete
                name="product_label"
                label="Product label"
                fullWidth
                options={ProductLabel.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="weight" label="Weight" type="number" />
              <RHFAutocomplete
                name="stock_status"
                label="Stock Status"
                fullWidth
                options={StockType.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
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

              {/* <FormControl fullWidth>
                <InputLabel>Color name</InputLabel>
                <Controller
                  name="color_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Color name"
                        multiple 
                        value={field.value || []}
                        error={!!fieldState.error}
                        disabled={ColorTypesLoadings}
                        renderValue={(selected) =>
                          Colors
                            .filter((type) => selected.includes(type.id))
                            .map((type) => type.title)
                            .join(', ')
                        }
                      >
                        {ColorTypesLoadings ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          Colors.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              <Checkbox checked={field?.value?.includes(type?.id)} />
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
              </FormControl> */}
              <FormControl fullWidth>
                <InputLabel>Color name</InputLabel>
                <Controller
                  name="color_id"
                  control={control}
                  render={({ field, fieldState }) => {
                    const selectedValues = Array.isArray(field.value) ? field.value : []; // Ensure value is always an array
                    return (
                      <>
                        <Select
                          {...field}
                          label="Color name"
                          multiple // Enable multiple selection
                          value={selectedValues} // Ensure value is an array
                          error={!!fieldState.error}
                          disabled={ColorTypesLoadings}
                          renderValue={(selected) =>
                            Colors.filter((type) => selected.includes(type.id))
                              .map((type) => type.title)
                              .join(', ')
                          }
                        >
                          {ColorTypesLoadings ? (
                            <MenuItem disabled>
                              <CircularProgress size={24} />
                            </MenuItem>
                          ) : (
                            Colors.map((type) => (
                              <MenuItem key={type.id} value={type.id}>
                                <Checkbox checked={selectedValues.includes(type.id)} />{' '}
                                {/* Ensure `selectedValues` is an array */}
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
                    );
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Tag name</InputLabel>
                <Controller
                  name="tag_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Tag name"
                        error={!!fieldState.error}
                        disabled={TagTypesLoadings}
                      >
                        {TagTypesLoadings ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          Tags.map((type) => (
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
              <FormControl fullWidth>
                <InputLabel>Type name</InputLabel>
                <Controller
                  name="type_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Tag name"
                        error={!!fieldState.error}
                        disabled={TypeTypesLoadings}
                      >
                        {TypeTypesLoadings ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          Type.map((type) => (
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
              <FormControl fullWidth>
                <InputLabel>Size name</InputLabel>
                <Controller
                  name="size_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Size name"
                        error={!!fieldState.error}
                        disabled={SizeTypesLoadings}
                      >
                        {SizeTypesLoadings ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          Size.map((type) => (
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
              <FormControl fullWidth>
                <InputLabel>Material name</InputLabel>
                <Controller
                  name="material_id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        label="Material name"
                        error={!!fieldState.error}
                        disabled={MaterialTypesLoadings}
                      >
                        {MaterialTypesLoadings ? (
                          <MenuItem disabled>
                            <CircularProgress size={24} />
                          </MenuItem>
                        ) : (
                          Material.map((type) => (
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
              <Box sx={{ gridColumn: 'span 2' }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle1">Description</Typography>
                  <RHFEditor name="description" />
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 2,
              }}
            >
              <Box>
                <RHFUpload
                  name="image_url1"
                  maxSize={3145728}
                  onDrop={handleDropimage1}
                  onDelete={handleRemoveFile1}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> Image must be in 1296 x 180 pixels
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box>
                <RHFUpload
                  name="image_url2"
                  maxSize={3145728}
                  onDrop={handleDropimage2}
                  onDelete={handleRemoveFile2}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> Image must be in 250 x 350 pixels
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box>
                <RHFUpload
                  name="image_url3"
                  maxSize={3145728}
                  onDrop={handleDropimage3}
                  onDelete={handleRemoveFile3}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> Image must be in 350 x 350 pixels
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box>
                <RHFUpload
                  name="image_url4"
                  maxSize={3145728}
                  onDrop={handleDropimage4}
                  onDelete={handleRemoveFile4}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> Image must be in 350 x 350 pixels
                  <br /> max size of 3MB
                </Typography>
              </Box>
              <Box>
                <RHFUpload
                  name="image_url5"
                  maxSize={3145728}
                  onDrop={handleDropimage5}
                  onDelete={handleRemoveFile5}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> Image must be in 350 x 350 pixels
                  <br /> max size of 3MB
                </Typography>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!Product ? 'Create' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  Product: PropTypes.object,
};
