import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { memo } from 'react';

import { SidebarContent } from './sidebar-content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: Props) {
  return (
    <Box>
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Box display={{ md: 'none' }}>
        <Drawer autoFocus={false} isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent bg="chakra-body-bg" maxW="60">
            <SidebarContent onClose={onClose} w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}

export default memo(Sidebar);
