'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { UsegetLead } from 'src/api/leads';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../bottombanner-new-edit-form';
import { UsegetPage } from 'src/api/pages';
import { UsegetBottomBanner } from 'src/api/bottombanner';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const { product: currentBottomBanner } = UsegetBottomBanner(id);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.list,
          },
          {
            name: 'Bottom Banner',
            href: paths.dashboard.bottombanner.list,
          },
          { name: `Edit` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentBottomBanner={currentBottomBanner} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
