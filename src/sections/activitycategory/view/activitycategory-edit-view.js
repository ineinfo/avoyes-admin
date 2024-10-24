'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../activitycategory-new-edit-form';
import { UsegetActivity } from 'src/api/activity';
import { UsegetActivityCategory } from 'src/api/activitycategory';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const { product: currentActivityCategory } = UsegetActivityCategory(id);
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
            name: 'Activity Category',
            href: paths.dashboard.activitycategory.list,
          },
          { name: `Edit` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentActivityCategory={currentActivityCategory} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
