import { Box, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(o => !o);
  return (
    <Box minH="100vh" ml={{ md: '60' }}>
      <Header sidebarToggle={handleToggle} />
      <Divider />
      <Sidebar isOpen={open} onClose={handleToggle} />
      <Box as="main" p="4">
        {children}
      </Box>
    </Box>
  );
}
