import {
  Box,
  Link as ChakraLink,
  Divider,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import Image from 'next/image';

import { BsCalendar2CheckFill, BsFillCollectionPlayFill, BsFolderFill, BsInfoSquareFill, BsMoonFill, BsPlayBtnFill, BsRssFill, BsSunFill } from 'react-icons/bs';
import type { IconType } from 'react-icons';

import { useRouter } from 'next/router';
import Link from '../router-link';

import { LOGO_PATH } from '~/lib/contant';
import { useColorMode } from '~/hooks/use-color-mode';

interface NavItemProps {
  icon: IconType
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

const NavItem = (props: NavItemProps) => {
  const { colorMode } = useColorMode();

  const hoverColor = colorMode === 'light' ? 'gray.900' : 'gray.300';
  const hoverBg = colorMode === 'light' ? 'gray.50' : 'gray.900';
  const activeBg = colorMode === 'light' ? 'gray.200' : 'gray.700';
  const textColor = colorMode === 'light' ? 'inherit' : 'gray.400';

  const { icon, children, active, onClick } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="5"
      cursor="pointer"
      role="group"
      color={textColor}
      _hover={{
        bg: active ? '' : hoverBg,
        color: active ? '' : hoverColor
      }}
      bg={active ? activeBg : ''}
      fontWeight="semibold"
      transition=".15s ease"
      onClick={onClick}
    >
      <Icon ml="3" mr="7" boxSize="6" as={icon} />
      {children}
    </Flex>
  );
};

export const SidebarContent = ({ onClose, ...props }: BoxProps & { onClose?: () => void }) => {
  const { pathname } = useRouter();
  const currentPath = pathname.slice(1).toLowerCase();

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="6" py="6" alignItems="center">
        <Image src={LOGO_PATH} width="42" height="42" style={{ borderRadius: '50%' }} alt="logo" placeholder="empty" />
        <Text fontSize="2xl" ml="4" fontWeight="semibold">BGmi</Text>
      </Flex>
      <Divider />
      <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="main-navigation">
        {/*
          * 兼容 safari，不知道为什么会导致第一个元素被聚焦
          * Drawer 组件已经设置了 autoFocus={false}
        */}
        <Link href="/" _focusVisible={{ outline: 'none' }}>
          <NavItem active={pathname === '/'} icon={BsPlayBtnFill} onClick={onClose}>Bangumi</NavItem>
        </Link>

        <ChakraLink href="/bangumi" _hover={{ textDecoration: 'none' }}>
          <NavItem icon={BsFolderFill}>Bangumi Files</NavItem>
        </ChakraLink>

        <Link href="/calendar">
          <NavItem active={currentPath === 'calendar'} icon={BsCalendar2CheckFill} onClick={onClose}>Calendar</NavItem>
        </Link>
        <Link href="/resource">
          <NavItem active={currentPath === 'resource'} icon={BsRssFill} onClick={onClose}>Resource</NavItem>
        </Link>

        <Divider />

        <Link href="/subscribe">
          <NavItem active={currentPath === 'subscribe'} icon={BsFillCollectionPlayFill} onClick={onClose}>Subscribe</NavItem>
        </Link>

        <Divider />

        <Link href="/about">
          <NavItem active={currentPath === 'about'} icon={BsInfoSquareFill} onClick={onClose}>About</NavItem>
        </Link>

        <NavItem icon={colorMode === 'dark' ? BsSunFill : BsMoonFill} onClick={toggleColorMode}>Theme Toggle</NavItem>
      </Flex>
    </Box>
  );
};
