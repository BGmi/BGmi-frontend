import { useState } from 'react';
import { useColorMode as useChakraColorMode } from '@chakra-ui/react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

import { isBrowser } from '~/lib/utils';

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark' | ''>('');
  // 监听 context 的变化，更新主题
  const { colorMode: color } = useChakraColorMode();

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) {
      const mode = localStorage.getItem('chakra-ui-color-mode') as typeof colorMode ?? 'light';
      setColorMode(mode);
    }
  }, [color]);

  return colorMode;
};
