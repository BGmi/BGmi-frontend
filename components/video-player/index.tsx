import { Box, Spinner } from '@chakra-ui/react';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { DPlayerOptions } from 'dplayer';
import DPlayer from 'dplayer';

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

  // 进入播放器页面时不自动播放，点击剧集时自动播放
  const [autoPlay, setAutoPlay] = useState(false);

  const { updateCurrentTime, getCurrentTime } = useVideoCurrentTime(bangumiData.bangumi_name);

  // 视频加载状态
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (!bangumiData || !containerRef.current)
      return;

    const playUrl = bangumiData.player?.[episode]?.path;

    const options: DPlayerOptions = {
      container: containerRef.current,
      video: {
        url: playUrl ? `${BASE_PATH}/bangumi${playUrl}` : ''
      },
      autoplay: autoPlay
    };

    const dp = new DPlayer(options);
    dpInstanceRef.current = dp;

    // event
    const handleTimeUpdate = () => updateCurrentTime(dp.video.currentTime);
    const handleCanPlay = () => {
      setLoading(false);
      // 恢复播放进度
      dp.seek(getCurrentTime());
    };

    dp.video.addEventListener('canplay', handleCanPlay);
    dp.video.addEventListener('timeupdate', handleTimeUpdate); // TODO 时刻更新 currentTime; 感觉会有性能影响 一直在更新 localstorage

    return () => {
      dp.video.removeEventListener('canplay', handleCanPlay);
      dp.video.removeEventListener('timeupdate', handleTimeUpdate);
      dp.destroy();
    };
  }, [autoPlay, bangumiData, episode, getCurrentTime, updateCurrentTime]);

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
        />
        <Box id="DPlayer" ref={containerRef} />
      </Box>
      <EpisodeCard boxShadow="base" setPlayState={setPlayState} bangumiData={episodeCardProps} />
    </>
  );
}
