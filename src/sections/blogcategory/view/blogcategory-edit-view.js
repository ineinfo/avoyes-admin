'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { UsegetBlogCategory } from 'src/api/blogcategory';
import UserNewEditForm from '../blogcategory-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const { product: currentBlogCategory } = UsegetBlogCategory(id);
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
            name: 'Blog Category',
            href: paths.dashboard.blog.blogcategory.list,
          },
          { name: `Edit` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentBlogCategory={currentBlogCategory} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
