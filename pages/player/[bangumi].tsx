import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';

import { useRouter } from 'next/router';

import VideoPlayer from '~/components/video-player';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

export default function Player() {
  const router = useRouter();
  const bangumiData = JSON.parse(router.query.bangumiData as string ?? '{}') as BangumiData;

  const [currentWatchHistory] = useWatchHistory();
  const currentBangumiHistory = currentWatchHistory[bangumiData.bangumi_name];

  // 如果没有观看历史默认选择第一集
  const episode = currentBangumiHistory?.['current-watch']?.episode ?? '1';

  return (
    <Box>
      <Head>
        <title>{`BGmi - ${bangumiData.bangumi_name}`}</title>
      </Head>
      <Heading ml={{ lg: '10', base: '5' }} mb="6" fontSize="2xl" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {bangumiData.bangumi_name} {`- 第 ${episode} 集`}
      </Heading>
      <Flex position="relative" mx={{ lg: '30', base: 'unset' }} flexDirection={{ xl: 'row', base: 'column' }}>
        <VideoPlayer episode={episode} bangumiData={bangumiData} />
      </Flex>
    </Box>
  );
}
