import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import { useColorMode } from '~/hooks/use-color-mode';
import { handleSecondaryTitle } from '~/lib/utils';

export default function Header({ sidebarToggle }: { sidebarToggle: () => void }) {
  const { pathname } = useLocation();
  const secondaryTitle = handleSecondaryTitle(pathname);

  const { colorMode } = useColorMode();
  return (
    <Box>
      <Flex
        alignItems="center"
        bg={colorMode === 'dark' ? 'blackAlpha.700' : 'whiteAlpha.800'}
        borderBottomWidth="1px"
        borderBottomColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        py="2"
        px="3"
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
          <IconButton aria-label="Menu" onClick={sidebarToggle} icon={<FiMenu />} variant="ghost" />
        </Box>
        <Text ml="3" fontSize="lg" fontWeight="semibold">
          BGmi - {pathname === '/' ? 'Bangumi' : secondaryTitle}
        </Text>
      </Flex>
    </Box>
  );
}
