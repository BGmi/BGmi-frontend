import { Box, Spinner } from '@chakra-ui/react';

import { useEffect, useMemo, useRef, useState } from 'react';

import type DPlayer from 'dplayer';

import EpisodeCard from './episode-card';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useVideoCurrentTime } from '~/hooks/use-watch-history';

import { useColorMode } from '~/hooks/use-color-mode';

import { BASE_PATH } from '~/lib/contant';

interface Props {
  bangumiData: BangumiData
  episode: string
}
export default function VideoPlayer({ bangumiData, episode }: Props) {
  const { colorMode } = useColorMode();

  const dpInstanceRef = useRef<DPlayer>();
  const containerRef = useRef<HTMLDivElement>(null);

  // 触发 DPlayer 重新加载
  const [playUrl, setPlayUrl] = useState<string>();
  const [autoPlay, setAutoPlay] = useState(false);

  const { updateCurrentTimeToLocal, getCurrentTimeWithLocal } = useVideoCurrentTime(bangumiData.bangumi_name);

  // 视频加载状态
  const [loading, setLoading] = useState(true);

  // 传给 Episode Card
  const setPlayState = (url: string) => {
    setLoading(true);
    setPlayUrl(url);
    setAutoPlay(true);
  };

  const episodeCardProps = useMemo(() => {
    if (bangumiData.player) {
      return {
        totalEpisode: Object.keys(bangumiData.player),
        playUrl: bangumiData.player, // { episode: "path": "/bangumi_file.mp4" }
        bangumiName: bangumiData.bangumi_name
      };
    }
  }, [bangumiData.bangumi_name, bangumiData.player]);

  useEffect(() => {
    if (bangumiData.player)
      setPlayUrl(bangumiData.player?.[episode]?.path);

    const canPlayListener = () => {
      setLoading(false);
      if (autoPlay && dpInstanceRef.current)
        dpInstanceRef.current.play();
    };

    const timeUpdateListener = () => {
      if (dpInstanceRef.current) {
        // 时刻更新 seek，感觉会有性能影响 一直在更新 localstorage
        updateCurrentTimeToLocal(dpInstanceRef.current.video.currentTime);
      }
    };

    // ssr error self is not defined
    import('dplayer').then((pack) => {
      const DPlayer = pack.default;
      dpInstanceRef.current = new DPlayer({
        container: containerRef.current,
        video: {
          url: playUrl ? `${BASE_PATH}/bangumi${playUrl}` : ''
          // TODO 裁剪封面图
          // pic: playUrl ? bangumiData.cover : ''
        }
      });

      // 异步加载的库，监听器只能放在里面嘛？为什么在 useEffect 里不起作用呢
      dpInstanceRef.current.video.addEventListener('canplay', canPlayListener);
      dpInstanceRef.current.video.addEventListener('timeupdate', timeUpdateListener);

      if (getCurrentTimeWithLocal())
        dpInstanceRef.current.video.currentTime = getCurrentTimeWithLocal();
    });

    return () => {
      dpInstanceRef.current?.video.removeEventListener('canplay', () => canPlayListener);
      dpInstanceRef.current?.video.removeEventListener('timeupdate', timeUpdateListener);
      dpInstanceRef.current?.destroy();
    };
  }, [autoPlay, bangumiData.player, episode, getCurrentTimeWithLocal, playUrl, updateCurrentTimeToLocal]);

  return (
    <>
      <Box
        p="4"
        rounded="4"
        bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200'}
        boxShadow="base"
        transition=".5s width"
        w="full"
        position="relative"
      >
        <Spinner display={loading ? 'block' : 'none'} zIndex="100" position="absolute" left="0" right="0" top="0" bottom="0" m="auto" />
        <Box id="DPlayer" ref={containerRef} />
      </Box>
      <EpisodeCard boxShadow="base" setPlayState={setPlayState} bangumiData={episodeCardProps} />
    </>
  );
}
