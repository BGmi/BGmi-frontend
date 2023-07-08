import { Box, Card, CardBody, Fade, TabPanel, Text, Image, Flex, Tag, Link } from '@chakra-ui/react';

import { useMemo, useState } from 'react';

import CalendarTab from '~/components/calendar-tab';
import { FallbackCalendar } from '~/components/fallback';

import { useCalendar } from '~/hooks/use-calendar';
import { useColorMode } from '~/hooks/use-color-mode';

import type { CalendarDataEntries, CalendarDataKey, WeekCalendar } from '~/types/calendar';

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
              src={`./bangumi/cover/${bangumi.cover}`}
              width="180px"
              height="250px"
              objectFit="cover"
              alt="cover"
              placeholder="empty"
              onLoad={() => setIsLoaded(true)}
            />
          </Fade>
        </Box>

        <Flex ml="4" direction="column">
          <Text mr="-2">{bangumi.name}</Text>
          <Tag mt="2">
            <Link color="pink.300" href={`https://bgm.tv/subject_search/${bangumi.name}`} target="_blank">
              番组计划
            </Link>
          </Tag>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default function Calendar() {
  const { data } = useCalendar();

  const tabListItems = useMemo(() => Object.keys(data.data ?? []) as CalendarDataKey[], [data]);
  const tabPanelsItems = useMemo(() => Object.entries(data.data ?? []) as CalendarDataEntries, [data]);

  if (tabListItems.length === 0 || tabPanelsItems.length === 0) return <FallbackCalendar />;

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
