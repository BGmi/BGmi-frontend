import { Box, Divider, Flex, IconButton, Text } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import {
  BsCalendar2CheckFill,
  BsFillCollectionPlayFill,
  BsFolderFill,
  BsInfoSquareFill,
  BsLayoutSidebarInset,
  BsMoonFill,
  BsPlayBtnFill,
  BsRssFill,
  BsSunFill,
} from 'react-icons/bs';

import { useLocation } from 'react-router-dom';

import Link from '../router-link';
import SidebarNavItem from './sidebar-nav-item';

import { useColorMode } from '~/hooks/use-color-mode';

export const SidebarContent = ({
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  ...props
}: BoxProps & { isCollapsed?: boolean; onClose?: () => void; onToggleCollapse?: () => void }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { pathname } = useLocation();
  const currentPath = pathname.slice(1).toLowerCase();

  const sidebarBg = colorMode === 'dark' ? 'gray.900' : 'white';
  const borderColor = colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100';

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      borderRightWidth="1px"
      borderRightColor={borderColor}
      bg={sidebarBg}
      w={isCollapsed ? '20' : '64'}
      transition="width 0.18s ease"
      {...props}
    >
      {onToggleCollapse && (
        <>
          <Flex px="3" py="4" alignItems="center" justify={isCollapsed ? 'center' : 'space-between'}>
            {!isCollapsed ? (
              <Box px="2">
                <Text fontSize="xl" fontWeight="semibold" lineHeight="1">
                  BGmi
                </Text>
              </Box>
            ) : null}
            <IconButton
              aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
              icon={<BsLayoutSidebarInset />}
              onClick={onToggleCollapse}
              size="sm"
              fontSize="18px"
              variant="ghost"
            />
          </Flex>
          <Divider borderColor={borderColor} />
        </>
      )}
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="main-navigation" px="3" py="4">
        {/*
         * 兼容 safari，不知道为什么会导致第一个元素被聚焦
         * Drawer 组件已经设置了 autoFocus={false}
         */}
        <Link href="/" _focusVisible={{ outline: 'none' }}>
          <SidebarNavItem active={pathname === '/'} icon={BsPlayBtnFill} isCollapsed={isCollapsed} onClick={onClose}>
            Bangumi
          </SidebarNavItem>
        </Link>

        <a href="./bangumi" target="_blank">
          <SidebarNavItem icon={BsFolderFill} isCollapsed={isCollapsed}>
            Bangumi Files
          </SidebarNavItem>
        </a>

        <Link href="/calendar">
          <SidebarNavItem
            active={currentPath === 'calendar'}
            icon={BsCalendar2CheckFill}
            isCollapsed={isCollapsed}
            onClick={onClose}
          >
            Calendar
          </SidebarNavItem>
        </Link>
        <Link href="/resource">
          <SidebarNavItem
            active={currentPath === 'resource'}
            icon={BsRssFill}
            isCollapsed={isCollapsed}
            onClick={onClose}
          >
            Resource
          </SidebarNavItem>
        </Link>

        <Divider my="3" borderColor={borderColor} />

        <Link href="/subscribe">
          <SidebarNavItem
            active={currentPath === 'subscribe' || currentPath === 'auth'}
            icon={BsFillCollectionPlayFill}
            isCollapsed={isCollapsed}
            onClick={onClose}
          >
            Subscribe
          </SidebarNavItem>
        </Link>

        <Divider my="3" borderColor={borderColor} />

        <Link href="/about">
          <SidebarNavItem
            active={currentPath === 'about'}
            icon={BsInfoSquareFill}
            isCollapsed={isCollapsed}
            onClick={onClose}
          >
            About
          </SidebarNavItem>
        </Link>

        <SidebarNavItem
          icon={colorMode === 'dark' ? BsSunFill : BsMoonFill}
          isCollapsed={isCollapsed}
          onClick={toggleColorMode}
        >
          Theme Toggle
        </SidebarNavItem>
      </Flex>
    </Box>
  );
};
