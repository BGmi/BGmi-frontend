import type { BoxProps, TabListProps, TabsProps } from '@chakra-ui/react';
import { Box, Tab, TabList, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react';
import type { CalendarDataKey } from '~/types/calendar';

interface Props {
  children: React.ReactNode;
  customElement?: React.ReactNode;
  tabListItems: CalendarDataKey[];
  tabListProps?: TabListProps;
  boxProps?: BoxProps;
  type?: 'subscribe';
}

export default function CalendarTab({
  children,
  customElement,
  tabListItems,
  tabListProps,
  boxProps,
  type,
  ...props
}: Props & TabsProps) {
  const engToZh: Record<CalendarDataKey, string> = {
    mon: '周一',
    tue: '周二',
    wed: '周三',
    thu: '周四',
    fri: '周五',
    sat: '周六',
    sun: '周日',
    unknown: '未知',
  };

  // eslint-disable-next-line @fluffyfox/no-unsafe-date -- ignore
  const toDay = new Date().getDay();
  const tabBg = useColorModeValue('white', 'whiteAlpha.100');
  const selectedBg = useColorModeValue('gray.900', 'white');
  const selectedColor = useColorModeValue('white', 'gray.900');

  return (
    <Tabs position="relative" isLazy lazyBehavior="keepMounted" {...props} defaultIndex={toDay}>
      <TabList
        top="4px"
        borderBottom="none"
        minH="40px"
        gap="2"
        overflowX="auto"
        bg={tabBg}
        p="1"
        borderRadius="md"
        {...tabListProps}
      >
        {tabListItems.map(week => (
          <Tab
            whiteSpace="nowrap"
            key={week}
            borderRadius="sm"
            fontWeight="medium"
            _selected={{ bg: selectedBg, color: selectedColor }}
          >
            {engToZh[week]}
          </Tab>
        ))}
        {type === 'subscribe' ? (
          <Tab
            whiteSpace="nowrap"
            key="search"
            borderRadius="sm"
            fontWeight="medium"
            _selected={{ bg: selectedBg, color: selectedColor }}
          >
            搜索
          </Tab>
        ) : null}
      </TabList>
      <Box mt="4" {...boxProps} />

      {customElement}

      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
}
