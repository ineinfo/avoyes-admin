// import { UserCreateView } from 'src/sections/setting/view';
// import { UserCreateProfile } from 'src/sections/setting/view';

import UserCreateProfile from 'src/sections/setting/view/profile-create-view';

export const metadata = {
  title: 'Dashboard: Profile',
};

export default function UserCreatePage() {
  return <UserCreateProfile />;
}
