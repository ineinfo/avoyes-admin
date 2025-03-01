import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const homePage = pathname === '/dashboard';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {/* <Header /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!homePage && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
