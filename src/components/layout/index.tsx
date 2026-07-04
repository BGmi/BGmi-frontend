import { Box } from '@chakra-ui/react';
import { memo, useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggle = () => setOpen(o => !o);
  const handleSidebarCollapse = () => setSidebarCollapsed(o => !o);
  return (
    <Box minH="100vh" ml={{ md: sidebarCollapsed ? '20' : '64' }} transition="margin-left 0.18s ease">
      <Header sidebarToggle={handleToggle} />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        isOpen={open}
        onClose={handleToggle}
        onToggleCollapse={handleSidebarCollapse}
      />
      <Box as="main" px={{ base: '4', md: '8' }} py={{ base: '4', md: '8' }} pt={{ base: '20', md: '8' }}>
        {children}
      </Box>
    </Box>
  );
}

export default memo(Layout);
