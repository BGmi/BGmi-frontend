import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '~/components/layout';
import { useColorMode } from '~/hooks/use-color-mode';

import { theme } from '~/lib/chakra-theme';
import { LOGO_PATH } from '~/lib/contant';
import { handleSecondaryTitle } from '~/lib/utils';

import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { colorMode } = useColorMode();
  const headTitle = `BGmi - ${pathname === '/' ? 'Bangumi' : handleSecondaryTitle(pathname)}`;

  // 防止闪烁
  if (colorMode === '')
    return null;

  // 防止 error 页面被 Layout 包裹
  if (pathname === '/_error')
    return <Component {...pageProps} />;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{headTitle}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="BGmi" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="144x144" href={LOGO_PATH} />
        <link rel="apple-touch-icon" type="image/png" sizes="144x144" href={LOGO_PATH} />
        <link rel="apple-touch-icon-precomposed" type="image/png" sizes="144x144" href={LOGO_PATH} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
