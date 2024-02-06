import { Box, Flex, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';

import { useBangumi } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

import { normalizePath } from '~/lib/utils';

import VideoPlayer from '~/components/video-player';

export default function Player() {
  const params = useParams();
  const [currentWatchHistory] = useWatchHistory();
  const { data } = useBangumi();

  // 这里就懒得做骨架屏了
  if (!data) return null;

  const bangumiData = data.data.find(bangumi => normalizePath(bangumi.bangumi_name) === params.bangumi);

  if (!bangumiData) return <div>加载播放器出错，数据不存在</div>;

  const currentBangumiHistory = currentWatchHistory[bangumiData.bangumi_name];

  // 如果没有观看历史默认选择第一集
  const episode = currentBangumiHistory?.['current-watch']?.episode ?? '1';

  return (
    <Box>
      <Helmet>
        <title>{`BGmi - ${bangumiData.bangumi_name}`}</title>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Heading
        ml={{ lg: '10', base: '5' }}
        mb="6"
        fontSize="2xl"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {bangumiData.bangumi_name} {`- 第 ${episode} 集`}
      </Heading>
      <Flex position="relative" mx={{ lg: '30', base: 'unset' }} flexDirection={{ xl: 'row', base: 'column' }}>
        <VideoPlayer episode={episode} bangumiData={bangumiData} danmakuApi={data.danmaku_api} />
      </Flex>
    </Box>
  );
}
