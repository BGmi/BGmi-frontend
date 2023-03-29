import { Box, Card, CardBody, Fade, TabPanel, Text, Image } from '@chakra-ui/react';

import { useMemo, useState } from 'react';
import CalendarTab from '~/components/calendar-tab';

import { FallbackCalendar } from '~/components/fallback';
import Layout from '~/components/layout';

import { useCalendar } from '~/hooks/use-calendar';
import { useColorMode } from '~/hooks/use-color-mode';

import type { WeekCalendar } from '~/types/calendar';

function CalendarPanel({ bangumi }: { bangumi: WeekCalendar }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Card maxW="xl">
      <CardBody display="flex">
        <Box
          position="relative"
          minW="180px"
          maxW="180px"
          minH="250px"
          maxH="250px"
          bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'}
        >
          <Fade in={isLoaded}>
            <Image
              src={`https://${bangumi.cover.slice(6)}`}
              width="180"
              height="250"
              // TODO https://github.com/vercel/next.js/issues/40762
              style={{
                width: '180px',
                height: '250px',
                objectFit: 'cover'
              }}
              alt="cover"
              placeholder="empty"
              onLoad={() => setIsLoaded(true)}
            />
          </Fade>
        </Box>

        <Text ml="4" mr="-2">
          {bangumi.name}
        </Text>

        {/** TODO 太空了，加点什么 */}

      </CardBody>
    </Card>
  );
}

export default function Calendar() {
  const { data } = useCalendar();

  const tabListItems = useMemo(() => Object.keys(data?.data ?? []), [data]);
  const tabPanelsItems = useMemo(() => Object.entries(data?.data ?? []), [data]);

  if (tabListItems.length === 0 || tabPanelsItems.length === 0)
    return <FallbackCalendar />;

  return (
    <CalendarTab tabListItems={tabListItems}>
      {tabPanelsItems.map(([week, bangumis]) => (
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
    </CalendarTab>
  );
}

Calendar.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
