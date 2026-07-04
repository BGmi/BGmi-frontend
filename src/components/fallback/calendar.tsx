import { Box, Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Skeleton from './skeleton';

export default function FallbackCalendar() {
  const skeletonTabPanels: JSX.Element[] = [];
  const skeletonTabPanelItems: JSX.Element[] = [];

  for (let i = 0; i < 15; ++i) {
    skeletonTabPanelItems.push(
      <Flex key={`tab-panel-item-${i}`} borderWidth="1px" borderRadius="card" overflow="hidden">
        <Skeleton h="8rem" minW="6rem" />
        <Box p="4" w="full">
          <Skeleton h="4" w="80%" />
          <Skeleton h="3" w="40%" mt="3" />
        </Box>
      </Flex>
    );
  }

  for (let i = 0; i < 6; ++i) {
    skeletonTabPanels.push(
      <TabPanel
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(18rem, 1fr))"
        justifyContent="center"
        gap={4}
        px="0"
        pt="5"
        key={`tab-panel-${i}`}
      >
        {...skeletonTabPanelItems}
      </TabPanel>
    );
  }

  return (
    <Tabs position="relative">
      <TabList top="4px" borderBottom="none" pb="2px">
        <Skeleton w="60%" h="8" mx="1" />
      </TabList>
      <TabPanels>{...skeletonTabPanels}</TabPanels>
    </Tabs>
  );
}
