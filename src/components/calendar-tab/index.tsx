import type { BoxProps, TabListProps, TabsProps } from '@chakra-ui/react';
import { Box, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode
  customElement?: React.ReactNode
  tabListItems: string[]
  tabListProps?: TabListProps
  boxProps?: BoxProps
}

export default function CalendarTab({ children, customElement, tabListItems, tabListProps, boxProps, ...props }: Props & TabsProps) {
  return (
    <Tabs position="relative" isLazy lazyBehavior="keepMounted" {...props}>
      <TabList top="4px" borderBottom="none" pb="2px" minH="42px" {...tabListProps}>
        {tabListItems.map(week => (
          <Tab mb="-2px" key={week}>{week[0].toUpperCase() + week.slice(1)}</Tab>
        ))}
      </TabList>
      <Box top="46.5px" borderBottom="2px solid" mt="-2.5px" borderBottomColor="inherit" {...boxProps} />

      {customElement}

      <TabPanels>
        {children}
      </TabPanels>
    </Tabs>
  );
}
