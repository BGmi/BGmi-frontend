import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '~/components/layout';

import { theme } from '~/lib/chakra-theme';
import { LogoPath } from '~/lib/contant';
import { handleSecondaryTitle } from '~/lib/utils';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const headTitle = `BGmi - ${pathname === '/' ? 'Bangumi' : handleSecondaryTitle(pathname)}`;

  if (pathname === '/_error')
    return <Component {...pageProps} />;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{headTitle}</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="BGmi" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="144x144" href={LogoPath} />
        <link rel="apple-touch-icon" type="image/png" sizes="144x144" href={LogoPath} />
        <link rel="apple-touch-icon-precomposed" type="image/png" sizes="144x144" href={LogoPath} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
