import { useEffect } from 'react';
import { useColorMode as useChakraColorMode } from '@chakra-ui/react';

import { isBrowser } from '~/lib/utils';
import { atom, useAtom } from 'jotai';

type Theme = 'light' | 'dark' | '';

const themeAtom = atom<Theme>('');

export const useColorMode = () => {
  const [colorMode, setColorMode] = useAtom(themeAtom);
  // 监听 context 的变化，更新主题
  const { colorMode: color, toggleColorMode } = useChakraColorMode();

  useEffect(() => {
    if (isBrowser) {
      const mode = (localStorage.getItem('chakra-ui-color-mode') as typeof colorMode) ?? 'light';
      setColorMode(mode);
    }
  }, [color, setColorMode]);

  return { colorMode, toggleColorMode };
};
