import type { ThemeConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  radii: {
    card: '8px',
  },
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
        letterSpacing: '0',
      },
      '::selection': {
        bg: props.colorMode === 'dark' ? 'red.300' : 'red.200',
        color: 'gray.900',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        borderRadius: 'md',
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          borderRadius: '0',
        },
      },
    },
  },
}) as { config: ThemeConfig };
