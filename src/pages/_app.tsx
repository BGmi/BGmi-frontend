import { Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '~/lib/chakra-theme';
import Layout from '~/components/layout';
import { handleSecondaryTitle } from '~/lib/utils';

export default function App() {
  const { pathname } = useLocation();
  const headTitle = `BGmi - ${pathname === '/' ? 'Bangumi' : handleSecondaryTitle(pathname) ?? ''}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      <ChakraProvider theme={theme}>
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </HelmetProvider>
  );
}
