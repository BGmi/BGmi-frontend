import { Box, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { memo } from 'react';

import { SidebarContent } from './sidebar-content';

interface Props {
  isCollapsed: boolean;
  isOpen: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

function Sidebar({ isCollapsed, isOpen, onClose, onToggleCollapse }: Props) {
  return (
    <Box>
      <SidebarContent
        display={{ base: 'none', md: 'unset' }}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
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
