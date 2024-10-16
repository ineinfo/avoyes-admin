'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { UsegetLead } from 'src/api/leads';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../aboutus-new-edit-form';
import { UsegetPage } from 'src/api/pages';
import { UsegetAbout } from 'src/api/aboutus';

// ----------------------------------------------------------------------

export default function UserEditView() {
  const settings = useSettingsContext();
  const { product: currentAbout } = UsegetAbout();
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
            name: 'About Us',
            href: paths.dashboard.aboutus.list,
          },
          { name: `Edit` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentAbout={currentAbout} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
