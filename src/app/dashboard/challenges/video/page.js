import PropTypes from 'prop-types';

import { _userList } from 'src/_mock/_user';
import UserEditView from 'src/sections/challenges/video/challengesvideo-edit-view';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Avoyes: Event Video Edit',
};

export default function UserEditPage() {

    return <UserEditView />;
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
