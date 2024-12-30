import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useEffect } from 'react';
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
  Divider,
  Avatar,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import { formatDate } from '@fullcalendar/core';
import { UpdateOrderStatus, UsegetOrders } from 'src/api/orderhistory';
import FormProvider from 'src/components/hook-form';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentOrder }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { products: propertyTypes, productsLoading: propertyTypesLoading } = UsegetOrders();

  const NewClientSchema = Yup.object().shape({
    newStatus: Yup.string().required('Order status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      newStatus: currentOrder?.order_status || '',
    }),
    [currentOrder]
  );

  const user = useAuthContext();
  const token = user?.user?.accessToken;

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
  }, [currentOrder, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentOrder) {
        const updatedData = {
          ...data,
          newStatus: Number(data.newStatus),
        };
        await UpdateOrderStatus(currentOrder.id, updatedData, token);
        enqueueSnackbar('Order Status updated successfully!', { variant: 'success' });
        router.push(paths.dashboard.orderhistory.list);
        reset();
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Unknown error', { variant: 'error' });
    }
  });

  const ORDER_status_type = [
    { label: 'Pending', id: 1 },
    { label: 'In Progress', id: 2 },
    { label: 'Completed', id: 3 },
  ];

  const renderList = (
    <TableContainer sx={{ overflow: 'unset', mt: 3 }}>
      <Scrollbar>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ typography: 'subtitle2' }}>S.No</TableCell>
              <TableCell sx={{ typography: 'subtitle2' }}>Product Name</TableCell>
              <TableCell sx={{ typography: 'subtitle2' }}>Rate</TableCell>
              <TableCell sx={{ typography: 'subtitle2' }}>Quantity</TableCell>
              <TableCell sx={{ typography: 'subtitle2' }}>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentOrder?.order_items?.length > 0 ? (
              currentOrder.order_items.map((item, index) => (
                <TableRow key={item.order_item_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.item_name || '--'}</TableCell>
                  <TableCell>{item.rate || '--'}</TableCell>
                  <TableCell>{item.quantity || '--'}</TableCell>
                  <TableCell>{item.amount || '--'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body2" align="center">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );


  return (
    // <Box sx={{ p: 3 }}>
    //   <Grid container spacing={3}>
    //     <Grid xs={12} md={12}>
    //       <Card sx={{ p: 3 }}>
    //         <Stack spacing={3}>
    //           <Typography variant="h6">Order Details</Typography>

    //           <Divider sx={{ my: 2 }} />

    //           <Grid container spacing={2}>
    //             <Grid item xs={8}>
    //               <Typography variant="subtitle2">Tax Amout:</Typography>
    //             </Grid>
    //             <Grid item xs={4}>
    //               <Typography variant="body1">{currentOrder?.tax_amount || '--'}</Typography>
    //             </Grid>
    //           </Grid>
    //           <Grid container spacing={2}>
    //             <Grid item xs={8}>
    //               <Typography variant="subtitle2">Discount Amount:</Typography>
    //             </Grid>
    //             <Grid item xs={4}>
    //               <Typography variant="body1">{currentOrder?.discount_amount || '--'}</Typography>
    //             </Grid>
    //           </Grid>
    //         </Stack>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </Box>
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">User Info</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Full Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{currentOrder?.full_name || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Address:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{currentOrder?.address1 || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Pin Code:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{currentOrder?.pincode || '--'}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Order Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Order Number:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.order_number || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Order Status:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.status || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Order Amount:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.order_amount || '--'}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Payment Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Transaction Id:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.transaction_id || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Transaction Status:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.transaction_status || '--'}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Transaction Time:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">
                  {formatDate(currentOrder?.transaction_time || '--')}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="subtitle2">Final Amount:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{currentOrder?.final_amount || '--'}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>


        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">PRODUCT DETAILS:-</Typography>
            <Divider sx={{ my: 2 }} />
            {renderList}
            <Divider sx={{ my: 2 }} />
            <FormProvider methods={methods} onSubmit={onSubmit} >
              <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                {/* <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            > */}
                <Box sx={{ gridColumn: 'span 2', mt: 3 }}>
                  <Stack spacing={3}>
                    <Stack spacing={1.5}>
                      <FormControl fullWidth>
                        <InputLabel>Order status</InputLabel>
                        <Controller
                          name="newStatus"
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <Select
                                {...field}
                                error={!!fieldState.error}
                                disabled={propertyTypesLoading}
                                label="Order status"
                              >
                                {ORDER_status_type.map((type) => (
                                  <MenuItem key={type.id} value={type.id}>
                                    {type.label}
                                  </MenuItem>
                                ))}
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
                    </Stack>
                  </Stack>
                </Box>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Update
                  </LoadingButton>
                </Stack>
              </Grid>
            </FormProvider>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

ClientNewEditForm.propTypes = {
  currentOrder: PropTypes.object,
};
