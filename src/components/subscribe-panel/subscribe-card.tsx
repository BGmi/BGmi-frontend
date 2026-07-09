import { AspectRatio, Badge, Box, Button, Fade, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useSubscribeAction } from '~/hooks/use-subscribe-action';
import { useColorMode } from '~/hooks/use-color-mode';
import { createBgmiAssetUrl } from '~/lib/utils';

import SubscribeForm from './subscribe-form';

import type { WeekCalendar } from '~/types/calendar';
import type { SeenStatusResp } from '~/types/subscribe';
import type { InitialData } from './subscribe-form';

interface Props {
  bangumi: WeekCalendar;
}

const uniqueSortedEpisodes = (episodes: number[]) =>
  [...new Set(episodes.filter(Number.isInteger).filter(episode => episode > 0))].sort((a, b) => a - b);

const getTotalEpisodes = (data: SeenStatusResp | undefined, fallbackEpisode: number, watchedEpisodes: number[]) =>
  Math.max(fallbackEpisode, ...watchedEpisodes, data?.total_episode ?? 0);

export interface SyncData {
  status: boolean;
  episode: number | undefined;
}

export default function SubscribeCard({ bangumi }: Props) {
  const { colorMode } = useColorMode();
  const surfaceBg = colorMode === 'dark' ? 'whiteAlpha.100' : 'white';
  const borderColor = colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100';

  const [imageLoaded, setImageLoaded] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [initialData, setInitialData] = useState<InitialData>();

  const { handleFetchFilter, handleFetchSeen, handleSubscribe } = useSubscribeAction();

  const [syncData, setSyncData] = useState<SyncData>({
    status: !!bangumi.status,
    episode: bangumi.episode,
  });

  useEffect(() => {
    setSyncData({
      status: !!bangumi.status,
      episode: bangumi.episode,
    });
  }, [bangumi.episode, bangumi.status]);

  const handleOpen = async (status: boolean, name: string, ep: number) => {
    onOpen();

    /**
     * 先进行订阅操作才能请求 `filter` 获取字幕组数据, 已订阅不操作
     * */
    if (!status) {
      await handleSubscribe({ name });
      setSyncData({
        ...syncData,
        status: true,
      });
    }

    const [data, seenData] = await Promise.all([handleFetchFilter(name), handleFetchSeen(name)]);
    const fallbackEpisode = syncData.episode ?? ep;
    const watchedEpisodes = uniqueSortedEpisodes(seenData?.seen ?? []);
    const totalEpisodes = getTotalEpisodes(seenData, fallbackEpisode, watchedEpisodes);

    setInitialData({
      bangumiName: name,
      totalEpisodes,
      watchedEpisodes,
      season: data?.season ?? 1,
      episodeOffset: data?.episode_offset ?? 0,
      subscribed: true,
      filterOptions: {
        include: data?.include.join(', ') ?? '',
        exclude: data?.exclude.join(', ') ?? '',
        regex: data?.regex ?? '',
      },
      subtitleGroups: data?.available_subtitle ?? [],
      follwedSubtitleGroups: data?.selected_subtitle ?? [],
    });
  };

  const handleOpenUnsubscribed = (name: string, ep: number) => {
    onOpen();
    setInitialData({
      bangumiName: name,
      totalEpisodes: ep,
      watchedEpisodes: [],
      season: 1,
      episodeOffset: 0,
      subscribed: false,
      filterOptions: {
        include: '',
        exclude: '',
        regex: '',
      },
      subtitleGroups: bangumi.subtitle_group?.map(item => item.name) ?? [],
      follwedSubtitleGroups: [],
    });
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="5.5rem 1fr"
        gap="3"
        p="3"
        bg={surfaceBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="card"
        transition="background 0.16s ease"
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.50',
        }}
      >
        <AspectRatio
          ratio={3 / 4}
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
          borderRadius="md"
          overflow="hidden"
        >
          <Fade in={imageLoaded}>
            <Image
              w="full"
              h="full"
              src={createBgmiAssetUrl(bangumi.cover)}
              alt={bangumi.name}
              objectFit="cover"
              backgroundPosition="50% 50%"
              onLoad={() => setImageLoaded(true)}
            />
          </Fade>
        </AspectRatio>
        <Flex minW="0" direction="column" justify="space-between" align="start">
          <Box minW="0" w="full">
            <Flex align="center" gap="2" mb="2">
              <Badge colorScheme={syncData.status ? 'green' : 'gray'} borderRadius="sm">
                {syncData.status ? '已订阅' : '未订阅'}
              </Badge>
              {typeof syncData.episode === 'number' && syncData.episode > 0 ? (
                <Text color="gray.500" fontSize="xs">
                  EP {syncData.episode}
                </Text>
              ) : null}
            </Flex>
            <Text fontWeight="semibold" noOfLines={2}>
              {bangumi.name}
            </Text>
            <Link href={`https://bgm.tv/subject_search/${bangumi.name}`} target="_blank" color="red.300" fontSize="sm">
              番组计划
            </Link>
          </Box>
          <Button
            size="sm"
            colorScheme={syncData.status ? 'gray' : 'red'}
            variant={syncData.status ? 'outline' : 'solid'}
            onClick={() =>
              syncData.status
                ? handleOpen(syncData.status, bangumi.name, bangumi.episode ?? 0)
                : handleOpenUnsubscribed(bangumi.name, bangumi.episode ?? 0)
            }
          >
            {syncData.status ? '查看设置' : '订阅'}
          </Button>
        </Flex>
      </Box>
      <SubscribeForm
        initialData={initialData}
        isOpen={isOpen}
        onClose={onClose}
        setSyncData={(data: SyncData) => setSyncData(data)}
        syncData={syncData}
      />
    </>
  );
}
