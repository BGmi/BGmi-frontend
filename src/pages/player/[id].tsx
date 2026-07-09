import { Badge, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import useSWRImmutable from 'swr/immutable';
import { useParams } from 'react-router-dom';

import { useBangumi } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

import VideoPlayer from '~/components/video-player';
import { fetcher } from '~/lib/fetcher';
import { createBgmiAssetUrl } from '~/lib/utils';
import type { BangumiPlayerResponse } from '~/types/bangumi';

export default function Player() {
  const params = useParams();
  const [currentWatchHistory] = useWatchHistory();
  const { data } = useBangumi();
  const playerId = params.id ?? '';
  const { data: playerData } = useSWRImmutable<BangumiPlayerResponse>(
    playerId ? `/api/player/${encodeURIComponent(playerId)}` : null,
    (url: string) => fetcher<BangumiPlayerResponse>([url], {})
  );

  // 这里就懒得做骨架屏了
  if (!data || !playerData) return null;

  const bangumiData = data.data.find(bangumi => String(bangumi.id) === playerId);
  const playerBangumiData = playerData.data;

  if (!bangumiData) return <div>加载播放器出错，数据不存在</div>;

  const currentBangumiHistory = currentWatchHistory[playerBangumiData.bangumi_name];
  const episodes = Object.keys(playerBangumiData.player).sort((a, b) => Number(a) - Number(b));

  const historyEpisode = currentBangumiHistory?.['current-watch']?.episode;
  const episode = historyEpisode && playerBangumiData.player[historyEpisode] ? historyEpisode : episodes[0];

  return (
    <Box>
      <Helmet>
        <title>{`BGmi - ${playerBangumiData.bangumi_name}`}</title>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Flex mb="5" gap="4" align="center">
        <Image
          display={{ base: 'none', sm: 'block' }}
          src={createBgmiAssetUrl(playerBangumiData.cover)}
          alt={playerBangumiData.bangumi_name}
          boxSize="4.5rem"
          objectFit="cover"
          borderRadius="card"
          flexShrink={0}
        />
        <Box minW="0">
          <Flex align="center" gap="2" wrap="wrap">
            <Heading fontSize={{ base: 'xl', md: '2xl' }} noOfLines={2}>
              {playerBangumiData.bangumi_name}
            </Heading>
            {playerBangumiData.status === 2 && (
              <Badge colorScheme="green" borderRadius="sm">
                NEW
              </Badge>
            )}
          </Flex>
          <Text mt="1" color="gray.500" fontSize="sm">
            {episode ? `第 ${episode} 集` : '暂无可播放剧集'}
          </Text>
        </Box>
      </Flex>
      {episode && <VideoPlayer episode={episode} bangumiData={playerBangumiData} danmakuApi={data.danmaku_api} />}
    </Box>
  );
}
