import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '~/lib/chakra-theme';

export default function MyDocument() {
  return (
    <Html lang="zh">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <noscript>
          <strong>
            We&apos;re sorry but bgmi-typrscript doesn&apos;t work properly without
            JavaScript enabled. Please enable it to continue.
          </strong>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
