import { Box, Button, Fade, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

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
  const buttonSubscribeBg = colorMode === 'dark' ? 'green.400' : 'green.100';
  const buttonUnSubscribeBg = colorMode === 'dark' ? 'blue.400' : 'blue.100';

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
      await handleSubscribe(name);
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
      filterOptions: {
        include: data?.include.join(', ') ?? '',
        exclude: data?.exclude.join(', ') ?? '',
        regex: data?.regex ?? '',
      },
      subtitleGroups: data?.available_subtitle ?? [],
      follwedSubtitleGroups: data?.selected_subtitle ?? [],
    });
  };

  return (
    <>
      <Box>
        <Flex
          alignItems="center"
          minH="12"
          bg={colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100'}
          p="4"
          px="2.5"
          roundedTop="md"
        >
          <Text
            minW="60%"
            maxH="6"
            overflow="hidden"
            transition="max-height 0.3s ease"
            fontWeight="medium"
            _hover={{
              maxH: '28',
            }}
          >
            {bangumi.name}
          </Text>
          <Button
            onClick={() => handleOpen(syncData.status, bangumi.name, bangumi.episode ?? 0)}
            ml="2"
            w="full"
            bg={syncData.status ? buttonSubscribeBg : buttonUnSubscribeBg}
            _hover={{
              opacity: 0.8,
            }}
          >
            {syncData.status ? '查看' : '订阅'}
          </Button>
        </Flex>
        <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'} minW="14rem" minH="sm">
          <Fade in={imageLoaded}>
            <Image
              h="sm"
              w="full"
              src={createBgmiAssetUrl(bangumi.cover)}
              alt="anime cover"
              objectFit="cover"
              backgroundPosition="50% 50%"
              onLoad={() => setImageLoaded(true)}
            />
          </Fade>
        </Box>
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
