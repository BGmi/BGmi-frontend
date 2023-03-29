import { Box, Divider, Flex, Text, Image } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import {
  BsCalendar2CheckFill,
  BsFillCollectionPlayFill,
  BsFolderFill,
  BsInfoSquareFill,
  BsMoonFill,
  BsPlayBtnFill,
  BsRssFill,
  BsSunFill
} from 'react-icons/bs';

import { useLocation } from 'react-router-dom';

import Link from '../router-link';
import SidebarNavItem from './sidebar-nav-item';

import { useColorMode } from '~/hooks/use-color-mode';

import LOGO from '../../assets/logo.jpg';

export const SidebarContent = ({ onClose, ...props }: BoxProps & { onClose?: () => void }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pathname } = useLocation();
  const currentPath = pathname.slice(1).toLowerCase();

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
        <Image src={LOGO} width="42px" height="42px" borderRadius="50%" alt="logo" placeholder="empty" />
        <Text fontSize="2xl" ml="4" fontWeight="semibold">BGmi</Text>
      </Flex>
      <Divider />
      <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="main-navigation">
        {/*
          * 兼容 safari，不知道为什么会导致第一个元素被聚焦
          * Drawer 组件已经设置了 autoFocus={false}
        */}
        <Link href="/" _focusVisible={{ outline: 'none' }}>
          <SidebarNavItem active={pathname === '/'} icon={BsPlayBtnFill} onClick={onClose}>Bangumi</SidebarNavItem>
        </Link>

        <a href="./bangumi" target="_blank">
          <SidebarNavItem icon={BsFolderFill}>Bangumi Files</SidebarNavItem>
        </a>

        <Link href="/calendar">
          <SidebarNavItem active={currentPath === 'calendar'} icon={BsCalendar2CheckFill} onClick={onClose}>Calendar</SidebarNavItem>
        </Link>
        <Link href="/resource">
          <SidebarNavItem active={currentPath === 'resource'} icon={BsRssFill} onClick={onClose}>Resource</SidebarNavItem>
        </Link>

        <Divider />

        <Link href="/subscribe">
          <SidebarNavItem active={(currentPath === 'subscribe' || currentPath === 'auth')} icon={BsFillCollectionPlayFill} onClick={onClose}>Subscribe</SidebarNavItem>
        </Link>

        <Divider />

        <Link href="/about">
          <SidebarNavItem active={currentPath === 'about'} icon={BsInfoSquareFill} onClick={onClose}>About</SidebarNavItem>
        </Link>

        <SidebarNavItem icon={colorMode === 'dark' ? BsSunFill : BsMoonFill} onClick={toggleColorMode}>Theme Toggle</SidebarNavItem>
      </Flex>
    </Box>
  );
};
