import { Flex, Icon, Tooltip } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

import { useColorMode } from '~/hooks/use-color-mode';

interface NavItemProps {
  icon: IconType;
  children: React.ReactNode;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem(props: NavItemProps) {
  const { colorMode } = useColorMode();

  // 防止闪烁
  if (colorMode === '') return null;

  const { icon, children, active, isCollapsed, onClick } = props;
  const hoverBg = colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100';
  const activeBg = colorMode === 'light' ? 'red.50' : 'whiteAlpha.100';
  const activeColor = colorMode === 'light' ? 'red.700' : 'red.100';
  const inactiveColor = colorMode === 'light' ? 'gray.700' : 'gray.300';
  const textColor = active ? activeColor : inactiveColor;

  const item = (
    <Flex
      align="center"
      justify={isCollapsed ? 'center' : 'flex-start'}
      px="3"
      py="3"
      my="0.5"
      cursor="pointer"
      color={textColor}
      borderRadius="md"
      _hover={{
        bg: active ? '' : hoverBg,
      }}
      bg={active ? activeBg : ''}
      fontWeight={active ? 'semibold' : 'medium'}
      onClick={onClick}
      transition="background 0.15s ease, color 0.15s ease"
    >
      <Icon mr={isCollapsed ? '0' : '3'} boxSize={isCollapsed ? '22px' : '20px'} flexShrink={0} as={icon} />
      {isCollapsed ? null : children}
    </Flex>
  );

  if (!isCollapsed) return item;

  return (
    <Tooltip label={children} placement="right" openDelay={250}>
      {item}
    </Tooltip>
  );
}
