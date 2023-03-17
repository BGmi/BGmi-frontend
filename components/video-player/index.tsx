import { Box, useColorMode } from '@chakra-ui/react';

import { useEffect, useMemo, useRef, useState } from 'react';

import type DPlayer from 'dplayer';
import EpisodeCard from './episone-card';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useWatchHistory } from '~/hooks/use-watch-history';
import { BASE_PATH } from '~/lib/contant';

interface Props {
  bangumiData: BangumiData
  episone: number
}
export default function VideoPlayer({ bangumiData, episone }: Props) {
  const { colorMode } = useColorMode();
  const [watchHistory, setWatchHistory] = useWatchHistory();

  const dPlayerRef = useRef<DPlayer>();
  const containerRef = useRef<HTMLDivElement>(null);

  // 触发 DPlayer 重新加载
  const [playUrl, setPlayUrl] = useState<string>();

  const onDPlay = (url: string, ep: number) => {
    setPlayUrl(url);

    setWatchHistory({
      ...watchHistory,
      [bangumiData.bangumi_name]: {
        ...watchHistory[bangumiData.bangumi_name],
        [ep]: 'mark',
        'cur-watch': ep
      }
    });
  };

  // 传给 Episode Card
  const playParams = useMemo(() => {
    if (bangumiData.player) {
      return {
        episode: Object.keys(bangumiData.player).map(ep => parseInt(ep, 10)),
        playUrl: bangumiData.player, // { episode: "path": "/bangumi_file.mp4" }
        totalMark: watchHistory[bangumiData.bangumi_name] as Record<string, 'mark' | undefined>
      };
    }
  }, [bangumiData.bangumi_name, bangumiData.player, watchHistory]);

  useEffect(() => {
    // ssr error self is not defined
    if (bangumiData.player) {
      setPlayUrl(bangumiData.player?.[episone]?.path);
      import('dplayer').then((pack) => {
        const DPlayer = pack.default;

        dPlayerRef.current = new DPlayer({
          container: containerRef.current,
          video: {
            url: playUrl ? `${BASE_PATH}/bangumi${playUrl}` : ''
            // TODO 裁剪封面图
            // pic: playUrl ? bangumiData.cover : ''
          }
        });
      });
    }

    return () => dPlayerRef.current?.destroy();
  }, [bangumiData.cover, bangumiData.player, episone, playUrl]);
  return (
    <>
      <Box
        p="4"
        rounded="4"
        bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200'}
        boxShadow="base"
        transition=".5s width"
        minH={{ base: '16rem', lg: 'md', xl: 'xl' }}
        w="full"
      >
        <Box
          h="full"
          id="DPlayer"
          ref={containerRef}
          />
      </Box>
      <EpisodeCard boxShadow="base" onDPlay={onDPlay} playParams={playParams} />
    </>
  );
}
