import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '~/lib/chakra-theme';
import Layout from '~/components/layout';

export default function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </HelmetProvider>
  );
}
