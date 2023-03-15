import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay
} from '@chakra-ui/react';

import { SidebarContent } from './sidebar-content';

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Index({ isOpen, onClose }: Props) {
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
