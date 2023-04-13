import type { BoxProps, TabListProps, TabsProps } from '@chakra-ui/react';
import { Box, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  customElement?: React.ReactNode;
  tabListItems: string[];
  tabListProps?: TabListProps;
  boxProps?: BoxProps;
}

export default function CalendarTab({
  children,
  customElement,
  tabListItems,
  tabListProps,
  boxProps,
  ...props
}: Props & TabsProps) {
  const engToZh: Record<string, string> = {
    mon: '周一',
    tue: '周二',
    wed: '周三',
    thu: '周四',
    fri: '周五',
    sat: '周六',
    sun: '周日',
  };

  const keys = Object.keys(engToZh);

  // eslint-disable-next-line @fluffyfox/no-unsafe-date -- ignore
  const toDay = new Date().getDay() - 1;

  return (
    <Tabs position="relative" isLazy lazyBehavior="keepMounted" {...props} defaultIndex={toDay}>
      <TabList top="4px" borderBottom="none" pb="2px" minH="42px" {...tabListProps}>
        {tabListItems
          .sort((a, b) => (keys.indexOf(a) > keys.indexOf(b) ? 1 : -1))
          .map(week => (
            <Tab whiteSpace="nowrap" mb="-2px" key={week}>
              {engToZh[week]}
            </Tab>
          ))}
      </TabList>
      <Box top="46.5px" borderBottom="2px solid" mt="-2.5px" borderBottomColor="inherit" {...boxProps} />

      {customElement}

      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
}
