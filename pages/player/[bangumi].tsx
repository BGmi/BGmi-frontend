import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import VideoPlayer from '~/components/video-player';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

export default function Player() {
  const router = useRouter();
  const bangumiData = JSON.parse(router.query.bangumiData as string || '{}') as BangumiData;

  const [watchHistory] = useWatchHistory();
  // 如果没有观看历史默认选择第一集
  const episode = watchHistory[bangumiData?.bangumi_name]?.['cur-watch'] as number || 1;

  return (
    <Box>
      <Head>
        <title>{`BGmi - ${bangumiData.bangumi_name}`}</title>
      </Head>
      <Heading ml={{ lg: '10', base: '5' }} mb="6" fontSize="2xl" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {bangumiData.bangumi_name} {episode ? `- 第 ${episode} 集` : ''}
      </Heading>
      <Flex position="relative" mx={{ lg: '30', base: 'unset' }} flexDirection={{ xl: 'row', base: 'column' }}>
        <VideoPlayer bangumiData={bangumiData} episode={episode} />
      </Flex>
    </Box>
  );
}
