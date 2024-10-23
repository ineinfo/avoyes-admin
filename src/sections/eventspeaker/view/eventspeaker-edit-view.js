'use client';

import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from '../eventspeaker-new-edit-form';
import { UsegetEventCategory } from 'src/api/eventcategory';
import { UsegetEventSpeaker } from 'src/api/eventspeaker';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const { product: currentEventSpeaker } = UsegetEventSpeaker(id);
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
            name: 'Event Speaker',
            href: paths.dashboard.eventspeaker.list,
          },
          { name: `Edit` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentEventSpeaker={currentEventSpeaker} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
