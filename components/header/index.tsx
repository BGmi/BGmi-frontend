import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';

import { useColorMode } from '~/hooks/use-color-mode';
import { handleSecondaryTitle } from '~/lib/utils';

export default function Header({ sidebarToggle }: { sidebarToggle: () => void }) {
  const { pathname } = useRouter();

  const secondaryTitle = handleSecondaryTitle(pathname);

  const colorMode = useColorMode();
  return (
    <Flex
      bg={colorMode === 'dark' ? 'blackAlpha.400' : 'blackAlpha.100'}
      py="2.5"
      pl="2"
      alignItems="center"
      as="header"
      pos="sticky"
      top="0"
      backdropFilter="auto"
      backdropBlur="12px"
      >
      <Box px="2" display={{ md: 'none' }}>
        <IconButton
          aria-label="Menu"
          onClick={sidebarToggle}
          icon={<FiMenu />}
          variant="outline"
          />
      </Box>
      <Text ml="4" fontSize="x-large">BGmi - {pathname === '/' ? 'Bangumi' : secondaryTitle}</Text>
    </Flex>
  );
}
