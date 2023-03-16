import { Card, CardBody, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Skeleton from './skeleton';

export default function FallbackCalendar() {
  const skeletonTabLists: JSX.Element[] = [];
  const skeletonTabPanels: JSX.Element[] = [];
  const skeletonTabPanelItems: JSX.Element[] = [];

  for (let i = 0; i < 15; ++i) {
    skeletonTabPanelItems.push(
      <Card key={`tab-panel-item-${i}`} maxW="xl">
        <CardBody display="flex">
          <Skeleton h="44" minW="32" w="32" />
          <Skeleton h="10" w="full" ml="4" />
        </CardBody>
      </Card>
    );
  }

  for (let i = 0; i < 6; ++i) {
    skeletonTabLists.push(
      <Skeleton w="24" h="10" mx="1" key={`tab=list-${i}`} />
    );

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
        {...skeletonTabLists}
      </TabList>
      <TabPanels>
        {...skeletonTabPanels}
      </TabPanels>
    </Tabs>
  );
}
