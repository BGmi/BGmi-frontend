import { Card, CardBody, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Skeleton from './skeleton';

export default function FallbackCalendar() {
  const skeletonTabPanels: JSX.Element[] = [];
  const skeletonTabPanelItems: JSX.Element[] = [];

  for (let i = 0; i < 15; ++i) {
    skeletonTabPanelItems.push(
      <Card key={`tab-panel-item-${i}`} maxW="xl">
        <CardBody display="flex">
          <Skeleton h="250px" minW="180px" />
          <Skeleton h="10" w="full" ml="4" />
        </CardBody>
      </Card>
    );
  }

  for (let i = 0; i < 6; ++i) {
    skeletonTabPanels.push(
      <TabPanel
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(22rem, 1fr))"
        justifyContent="center"
        gap={4}
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
