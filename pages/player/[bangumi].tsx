import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { useBangumi } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

// fix self is not defined
const VideoPlayer = dynamic(() => import('~/components/video-player'), {
  ssr: false
});

export default function Player() {
  const router = useRouter();
  const [currentWatchHistory] = useWatchHistory();
  const { data, isLoading } = useBangumi();

  const bangumiData = data?.data?.find(bangumi => bangumi.bangumi_name === router.query.bangumi);

  // 这里就懒得做骨架屏了
  if (isLoading)
    return null;

  if (!bangumiData)
    return <div>加载播放器出错，数据不存在</div>;

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
