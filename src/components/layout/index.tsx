import { Box } from '@chakra-ui/react';
import { memo, useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(o => !o);
  return (
    <Box minH="calc(100vh-60)" ml={{ md: '60' }}>
      <Header sidebarToggle={handleToggle} />
      <Sidebar isOpen={open} onClose={handleToggle} />
      <Box as="main" p="4">
        {children}
      </Box>
    </Box>
  );
}

export default memo(Layout);
