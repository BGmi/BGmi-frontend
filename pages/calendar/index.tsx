import { Box, Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useState } from 'react';

import useSWR from 'swr';
import { fetcher } from '~/lib/fetcher';

import { FallbackCalendar, Skeleton } from '~/components/fallback';

import type { Calendar as CalendarType, WeekCalendar } from '~/types/calendar';

function CalendarPanel({ bangumi }: { bangumi: WeekCalendar }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Card maxW="xl">
      <CardBody display="flex">
        <Box minW="32" w="32" display={hasLoaded ? 'block' : 'none'}>
          <Image
            src={`https://${bangumi.cover.slice(6)}`}
            priority
            width="128"
            height="128"
            // TODO https://github.com/vercel/next.js/issues/40762
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            alt="cover"
            placeholder="empty"
            onLoad={() => setHasLoaded(true)}
            />
        </Box>
        <Skeleton display={hasLoaded ? 'none' : 'block'} h="44" minW="32" w="32" />

        <Text ml="4">
          {bangumi.name}
        </Text>

        {/** TODO 太空了，加点什么 */}

      </CardBody>
    </Card>
  );
}

export default function Calendar() {
  const { data } = useSWR<CalendarType>(['/api/cal'], fetcher);

  if (!data)
    return <FallbackCalendar />;

  return (
    <Tabs position="relative">
      <TabList top="4px" borderBottom="none" pb="2px">
        {Object.keys(data.data).map(week => (
          <Tab mb="-2px" key={week}>{week[0].toUpperCase() + week.slice(1)}</Tab>
        ))}
      </TabList>
      <Box top="46.5px" borderBottom="2px solid" mt="-2.5px" borderBottomColor="inherit" />
      <TabPanels>
        {Object.entries(data.data).map(([week, bangumis]) => (
          <TabPanel
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(22rem, 1fr))"
            justifyContent="center"
            gap={4}
            key={week}
          >
            {bangumis.map(bangumi => (
              <CalendarPanel key={bangumi.id} bangumi={bangumi} />
            ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
