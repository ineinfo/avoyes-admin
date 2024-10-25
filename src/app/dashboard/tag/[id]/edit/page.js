import PropTypes from 'prop-types';

import { _userList } from 'src/_mock/_user';

import { UserEditView } from 'src/sections/tag/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Avoyes: Product Tag Edit',
};

export default function UserEditPage({ params }) {
  const { id } = params;

  return <UserEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
    id: user.id,
  }));
}

UserEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
