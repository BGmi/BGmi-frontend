import { Box, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import type DPlayer from 'dplayer';

import EpisodeCard from '~/components/episone-card';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';

export default function Player() {
  const router = useRouter();
  const bangumiData = JSON.parse(router.query.bangumiData as string || '{}') as BangumiData;

  const [watchHistory, setWatchHistory] = useWatchHistory();
  // 如果没有观看历史默认选择第一集
  const curWatch = watchHistory[bangumiData?.bangumi_name]?.['cur-watch'] as number || 1;

  // 触发 DPlayer 重新加载
  const [playUrl, setPlayUrl] = useState('');
  const [episone, setEpisone] = useState(curWatch);

  const containerRef = useRef<HTMLDivElement>(null);
  const dPlayerRef = useRef<DPlayer>();

  const onDPlay = (url: string, ep: number) => {
    setPlayUrl(url);
    dPlayerRef.current?.play();

    setEpisone(ep);
    setWatchHistory({
      ...watchHistory,
      [bangumiData.bangumi_name]: {
        ...watchHistory[bangumiData.bangumi_name],
        [ep]: true,
        'cur-watch': ep
      }
    });
  };

  // 传给 Episode Card
  const playInfo = useMemo(() => {
    if (bangumiData.player) {
      return {
        episode: Object.keys(bangumiData.player).map(ep => parseInt(ep, 10)),
        playUrl: bangumiData.player,
        totalMark: watchHistory[bangumiData.bangumi_name] as Record<string, boolean>
      };
    }
  }, [bangumiData.bangumi_name, bangumiData.player, watchHistory]);

  useEffect(() => {
    // ssr error self is not defined
    if (bangumiData.player) {
      setPlayUrl(bangumiData.player[curWatch]?.path);
      import('dplayer').then((pack) => {
        const DPlayer = pack.default;

        dPlayerRef.current = new DPlayer({
          container: containerRef.current,
          video: { url: `/bangumi/${playUrl}` }
        });
      });
    }

    return () => dPlayerRef.current?.destroy();
  }, [bangumiData.player, curWatch, playUrl]);

  return (
    <Box>
      <Head>
        <title>{`BGmi - ${bangumiData.bangumi_name}`}</title>
      </Head>
      <Heading ml={{ lg: '10', base: '5' }} mb="6" fontSize="2xl" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {bangumiData.bangumi_name} {episone ? `- 第 ${episone} 集` : ''}
      </Heading>
      <Flex mx={{ lg: '30', base: 'unset' }} flexDirection={{ xl: 'row', base: 'column' }}>
        <Box boxShadow="base" transition=".5s width" w={{ xl: '70%', base: 'full' }} id="DPlayer" ref={containerRef} />
        <EpisodeCard boxShadow="base" onDPlay={onDPlay} playInfo={playInfo} />
      </Flex>
    </Box>
  );
}
