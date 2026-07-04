import { AspectRatio, Badge, Box, Fade, TabPanel, Text, Image, Flex, Link } from '@chakra-ui/react';

import { useMemo, useState } from 'react';

import CalendarTab from '~/components/calendar-tab';
import { FallbackCalendar } from '~/components/fallback';

import { useCalendar } from '~/hooks/use-calendar';
import { useColorMode } from '~/hooks/use-color-mode';
import { createBgmiAssetUrl } from '~/lib/utils';

import type { CalendarDataEntries, CalendarDataKey, WeekCalendar } from '~/types/calendar';

function CalendarPanel({ bangumi }: { bangumi: WeekCalendar }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Flex
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'white'}
      borderRadius="card"
      overflow="hidden"
      minH="8rem"
    >
      <AspectRatio ratio={3 / 4} minW="6rem" maxW="6rem" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}>
        <Box>
          <Fade in={isLoaded}>
            <Image
              src={createBgmiAssetUrl(bangumi.cover)}
              width="full"
              height="full"
              objectFit="cover"
              alt={bangumi.name}
              placeholder="empty"
              onLoad={() => setIsLoaded(true)}
            />
          </Fade>
        </Box>
      </AspectRatio>

      <Flex p="4" minW="0" direction="column" justify="space-between">
        <Box>
          <Text fontWeight="semibold" noOfLines={2}>
            {bangumi.name}
          </Text>
          <Flex mt="2" gap="2" wrap="wrap">
            {bangumi.status ? (
              <Badge colorScheme="green" borderRadius="sm">
                已订阅
              </Badge>
            ) : null}
            {typeof bangumi.episode === 'number' ? (
              <Badge colorScheme="gray" borderRadius="sm">
                EP {bangumi.episode}
              </Badge>
            ) : null}
          </Flex>
        </Box>
        <Link mt="3" color="red.300" href={`https://bgm.tv/subject_search/${bangumi.name}`} target="_blank">
          番组计划
        </Link>
      </Flex>
    </Flex>
  );
}

export default function Calendar() {
  const { data } = useCalendar();

  const tabListItems = useMemo(() => Object.keys(data?.data ?? []) as CalendarDataKey[], [data]);
  const tabPanelsItems = useMemo(() => Object.entries(data?.data ?? []) as CalendarDataEntries, [data]);

  if (tabListItems.length === 0 || tabPanelsItems.length === 0) return <FallbackCalendar />;

  return (
    <CalendarTab tabListItems={tabListItems}>
      {tabPanelsItems.map(([week, bangumis]) => (
        <TabPanel
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(18rem, 1fr))"
          justifyContent="center"
          gap={4}
          px="0"
          pt="5"
          key={week}
        >
          {bangumis?.map(bangumi => <CalendarPanel key={bangumi.id} bangumi={bangumi} />)}
        </TabPanel>
      ))}
    </CalendarTab>
  );
}
