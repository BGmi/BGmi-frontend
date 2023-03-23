import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAuth } from '~/hooks/use-auth';
import { useColorMode } from '~/hooks/use-color-mode';

import { theme } from '~/lib/chakra-theme';
import { LOGO_PATH } from '~/lib/contant';
import { handleSecondaryTitle } from '~/lib/utils';

import Auth from '~/components/auth';

import '~/styles/globals.css';

type MyAppProps = AppProps & { Component: { getLayout?: (page: React.ReactElement) => React.ReactElement } };

export default function App({ Component, pageProps }: MyAppProps) {
  const { pathname } = useRouter();
  const { colorMode } = useColorMode();
  const { hasAuth } = useAuth();

  // 防止闪烁
  if (colorMode === '')
    return null;

  const headTitle = `BGmi - ${pathname === '/' ? 'Bangumi' : handleSecondaryTitle(pathname)}`;

  const renderWithLayoutAndAuth = (page: React.ReactElement) => {
    const getLayout = Component.getLayout ?? (page => page);

    if (pageProps?.auth && !hasAuth)
      return getLayout(<Auth />);

    return getLayout(page);
  };

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{headTitle}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="BGmi" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/jpeg" sizes="144x144" href={LOGO_PATH} />
        <link rel="shortcut icon" type="image/jpeg" href={LOGO_PATH} />
        <link rel="apple-touch-icon" sizes="144x144" href={LOGO_PATH} />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href={LOGO_PATH} />
      </Head>
      {renderWithLayoutAndAuth(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
