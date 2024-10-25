import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Avoyes: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
