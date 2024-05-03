import { Box, Flex, Spinner, useToast } from '@chakra-ui/react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import md5 from 'md5';
import Hls from 'hls.js';
import DPlayer from 'dplayer';
import type { DPlayerOptions } from 'dplayer';

import EpisodeCard from './episode-card';
import ExternalPlayer from './external-player';

import { useColorMode } from '~/hooks/use-color-mode';
import { useVideoCurrentTime } from '~/hooks/use-watch-history';

import { createAbsoluteUrl } from '~/lib/utils';

import type { BangumiData } from '~/types/bangumi';

interface Props {
  bangumiData: BangumiData;
  danmakuApi: string;
  episode: string;
}

export default function VideoPlayer({ bangumiData, danmakuApi, episode }: Props) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const dpInstanceRef = useRef<DPlayer>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 进入播放器页面时不自动播放，点击剧集时自动播放
  const [autoPlay, setAutoPlay] = useState(false);
  // 视频加载状态
  const [loading, setLoading] = useState(true);

  const { updateCurrentTime, getCurrentTime } = useVideoCurrentTime(bangumiData.bangumi_name);

  const path = bangumiData.player[episode]?.path;
  if (!path && !toast.isActive(episode))
    toast({
      title: '视频文件不存在',
      status: 'error',
      duration: 3000,
      position: 'top-right',
      id: episode,
    });

  const fileUrl = `./bangumi${path ?? ''}`;
  const fileType = fileUrl.split('.').pop();

  const dplayerOptions = useCallback(
    (id: string, hls: Hls) => {
      const options: DPlayerOptions = {
        container: containerRef.current,
        video: {
          url: fileUrl,
          type: fileType === 'm3u8' ? 'customHls' : 'auto',
          customType: {
            customHls(video: HTMLVideoElement) {
              if (Hls.isSupported()) {
                // Assume it's an m3u8 file
                hls.loadSource(fileUrl);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                  video.play();
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                  if (data.fatal) {
                    console.error('HLS fatal error:', data.type, data.details);
                    // HLS playback failed, try using HTML5 video player
                    video.src = fileUrl;
                  }
                });
              } else {
                if (!toast.isActive(`HlsError-${id}`))
                  toast({
                    title: '浏览器不支持 Hls，建议使用最新版本的 Chrome 浏览器',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    id: `HlsError-${id}`,
                  });
                console.error('Hls is not supported');
              }
            },
          },
        },
        screenshot: true,
        autoplay: autoPlay,
      };

      if (danmakuApi) {
        options.danmaku = {
          id: md5(id),
          api: danmakuApi,
        };
      }

      return options;
    },
    [autoPlay, danmakuApi, fileType, fileUrl, toast]
  );

  // 传给 Episode Card
  const setPlayState = () => {
    setAutoPlay(true);
  };

  const episodeCardProps = useMemo(
    () => ({
      totalEpisode: Object.keys(bangumiData.player),
      bangumiName: bangumiData.bangumi_name,
      currentEpisode: episode,
    }),
    [bangumiData.bangumi_name, bangumiData.player, episode]
  );

  // event
  const handleTimeUpdate = useCallback(() => {
    if (dpInstanceRef.current) updateCurrentTime(dpInstanceRef.current.video.currentTime);
  }, [updateCurrentTime]);

  const handleCanPlay = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (!containerRef.current) return;

    const hls = new Hls();
    const dp = new DPlayer(dplayerOptions(fileUrl, hls));

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
      hls.destroy();
    };
  }, [dplayerOptions, getCurrentTime, handleCanPlay, handleTimeUpdate, loading, fileUrl]);

  return (
    <>
      <Flex flexDirection="column">
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
        <ExternalPlayer url={createAbsoluteUrl(fileUrl)} />
      </Flex>
      <EpisodeCard boxShadow="base" setPlayState={setPlayState} bangumiData={episodeCardProps} />
    </>
  );
}
