import { Box, Spinner } from '@chakra-ui/react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DPlayer from 'dplayer';

import EpisodeCard from './episode-card';

import { useVideoCurrentTime } from '~/hooks/use-watch-history';
import { useColorMode } from '~/hooks/use-color-mode';

import type { BangumiData } from '~/types/bangumi';

interface Props {
  bangumiData: BangumiData
  episode: string
}

export default function VideoPlayer({ bangumiData, episode }: Props) {
  const { colorMode } = useColorMode();
  const dpInstanceRef = useRef<DPlayer>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 进入播放器页面时不自动播放，点击剧集时自动播放
  const [autoPlay, setAutoPlay] = useState(false);
  // 视频加载状态
  const [loading, setLoading] = useState(true);

  const { updateCurrentTime, getCurrentTime } = useVideoCurrentTime(bangumiData.bangumi_name);

  // 传给 Episode Card
  const setPlayState = (url: string) => {
    dpInstanceRef.current?.switchVideo({ url });
    setAutoPlay(true);
  };

  const episodeCardProps = useMemo(() => {
    if (bangumiData) {
      return {
        totalEpisode: Object.keys(bangumiData.player),
        playUrl: bangumiData.player, // { episode: "path": "/bangumi_file.mp4" }
        bangumiName: bangumiData.bangumi_name
      };
    }
  }, [bangumiData]);

  const playUrl = useMemo(() => {
    return bangumiData?.player?.[episode]?.path ? `/bangumi${bangumiData.player[episode].path}` : '';
  }, [bangumiData.player, episode]);

  // event
  const handleTimeUpdate = useCallback(() => {
    if (dpInstanceRef.current)
      updateCurrentTime(dpInstanceRef.current.video.currentTime);
  }, [updateCurrentTime]);

  const handleCanPlay = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (!bangumiData || !containerRef.current)
      return;

    const dp = new DPlayer({
      container: containerRef.current,
      video: {
        url: playUrl
      },
      autoplay: autoPlay
    });
    dpInstanceRef.current = dp;

    dp.video.addEventListener('canplay', handleCanPlay);
    dp.video.addEventListener('timeupdate', handleTimeUpdate); // TODO 时刻更新 currentTime; 感觉会有性能影响 一直在更新 localstorage

    if (!loading) {
      // 恢复播放进度
      dp.seek(getCurrentTime());
    }

    return () => {
      dp.video.removeEventListener('canplay', handleCanPlay);
      dp.video.removeEventListener('timeupdate', handleTimeUpdate);
      dp.destroy();
    };
  }, [autoPlay, bangumiData, getCurrentTime, handleCanPlay, handleTimeUpdate, loading, playUrl]);

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
        <Spinner
          display={loading ? 'block' : 'none'}
          zIndex="100"
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          m="auto"
          color="white"
        />
        <Box id="DPlayer" ref={containerRef} />
      </Box>
      <EpisodeCard boxShadow="base" setPlayState={setPlayState} bangumiData={episodeCardProps} />
    </>
  );
}
