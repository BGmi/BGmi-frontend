import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';

import { useColorMode } from '~/hooks/use-color-mode';
import { handleSecondaryTitle } from '~/lib/utils';

export default function Header({ sidebarToggle }: { sidebarToggle: () => void }) {
  const { pathname } = useRouter();
  const secondaryTitle = handleSecondaryTitle(pathname);

  const { colorMode } = useColorMode();
  return (
    <Box
      pb={{ md: 'unset', base: '16' }}
    >
      <Flex
        alignItems="center"
        bg={colorMode === 'dark' ? 'blackAlpha.400' : 'blackAlpha.200'}
        py="2.5"
        pl="2"
        as="header"
        w="full"
        pos="fixed"
        top="0"
        zIndex="200"
        backdropFilter="auto"
        saturate="120%"
        backdropBlur="8px"
        display={{ md: 'none', base: 'flex' }}
      >
        <Box display={{ md: 'none' }}>
          <IconButton
            aria-label="Menu"
            onClick={sidebarToggle}
            icon={<FiMenu />}
            variant="ghost"
          />
        </Box>
        <Text ml="4" fontSize="x-large">BGmi - {pathname === '/' ? 'Bangumi' : secondaryTitle}</Text>
      </Flex>
    </Box>
  );
}
