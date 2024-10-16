'use client';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AppWidgetSummary from '../app-widget-summary';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { DASHBOARD_COUNT } from 'src/api/dashboard';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const [tableData, setTableData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalBlogs: 0,
    totalEvents: 0,
    totalOrders: 0,
    totalPendingOrders: 0,
    totalProgressOrders: 0,
    totalCompletedOrders: 0,
    
  });
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const users = useAuthContext();
  const token = users.user.accessToken;

  const settings = useSettingsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DASHBOARD_COUNT(token);
        setTableData({
          totalUsers: response.totalUsers || 0,
          totalProducts: response.totalProducts || 0,
          totalBlogs: response.totalBlogs || 0,
          totalEvents: response.totalEvents || 0,
          totalOrders: response.totalOrders || 0,
          totalPendingOrders: response.totalPendingOrders || 0,
          totalProgressOrders: response.totalProgressOrders || 0,
          totalCompletedOrders: response.totalCompletedOrders || 0,
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Error fetching data', { variant: 'error' });
      }
    };
    fetchData();
  }, [enqueueSnackbar,token]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={tableData?.totalUsers}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Product"
            total={tableData?.totalProducts}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Blogs"
            total={tableData?.totalBlogs}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Events"
            total={tableData?.totalEvents}
            chart={{
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Orders"
            total={tableData?.totalOrders}
            chart={{
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Pending Orders"
            total={tableData?.totalPendingOrders}
            chart={{
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Progress Orders"
            total={tableData?.totalProgressOrders}
            chart={{
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="Total Completed Orders"
            total={tableData?.totalCompletedOrders}
            chart={{
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
