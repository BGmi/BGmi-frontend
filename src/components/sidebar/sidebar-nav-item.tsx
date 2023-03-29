import { Flex, Icon } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

import { useColorMode } from '~/hooks/use-color-mode';

interface NavItemProps {
  icon: IconType
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function SidebarNavItem(props: NavItemProps) {
  const { colorMode } = useColorMode();

  // 防止闪烁
  if (colorMode === '')
    return null;

  const hoverBg = colorMode === 'light' ? 'gray.200' : 'gray.700';
  const activeBg = colorMode === 'light' ? 'gray.200' : 'gray.700';
  const textColor = colorMode === 'light' ? 'gray.900' : 'gray.300';

  const { icon, children, active, onClick } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="5"
      cursor="pointer"
      color={textColor}
      _hover={{
        bg: active ? '' : hoverBg
      }}
      bg={active ? activeBg : ''}
      fontWeight="semibold"
      onClick={onClick}
      transition="0.1s"
    >
      <Icon ml="3" mr="7" boxSize="6" as={icon} />
      {children}
    </Flex>
  );
}
