import { AspectRatio, Box, Flex, Grid, GridItem, Spinner, Text, useToast } from '@chakra-ui/react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import md5 from 'md5';
import Hls from 'hls.js';
import DPlayer from 'dplayer';
import type { DPlayerOptions } from 'dplayer';

import EpisodeCard from './episode-card';
import ExternalPlayer from './external-player';

import { useVideoCurrentTime } from '~/hooks/use-watch-history';

import { createAbsoluteUrl } from '~/lib/utils';

import type { BangumiPlayerData } from '~/types/bangumi';

interface Props {
  bangumiData: BangumiPlayerData;
  danmakuApi: string;
  episode: string;
}

export default function VideoPlayer({ bangumiData, danmakuApi, episode }: Props) {
  const toast = useToast();

  const dpInstanceRef = useRef<DPlayer>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 进入播放器页面时不自动播放，点击剧集时自动播放
  const [autoPlay, setAutoPlay] = useState(false);
  // 视频加载状态
  const [loading, setLoading] = useState(true);

  const { updateCurrentTime, getCurrentTime } = useVideoCurrentTime(bangumiData.bangumi_name);

  const path = bangumiData.player[episode]?.path;
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
      totalEpisode: Object.keys(bangumiData.player).sort((a, b) => Number(a) - Number(b)),
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
    if (!path && !toast.isActive(episode)) {
      toast({
        title: '视频文件不存在',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        id: episode,
      });
    }
  }, [episode, path, toast]);

  useEffect(() => {
    setLoading(Boolean(path));
  }, [path]);

  useEffect(() => {
    if (!containerRef.current || !path) return;

    const hls = new Hls();
    const dp = new DPlayer(dplayerOptions(fileUrl, hls));

    dpInstanceRef.current = dp;

    dp.video.addEventListener('canplay', handleCanPlay);
    dp.video.addEventListener('timeupdate', handleTimeUpdate); // TODO 时刻更新 currentTime; 感觉会有性能影响 一直在更新 localstorage

    dp.seek(getCurrentTime());

    return () => {
      dp.video.removeEventListener('canplay', handleCanPlay);
      dp.video.removeEventListener('timeupdate', handleTimeUpdate);
      dp.destroy();
      hls.destroy();
    };
  }, [dplayerOptions, getCurrentTime, handleCanPlay, handleTimeUpdate, fileUrl, path]);

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) 20rem' }} gap={{ base: 4, xl: 5 }} alignItems="start">
      <GridItem minW="0">
        <Box bg="black" borderRadius="card" overflow="hidden" boxShadow="0 18px 50px rgba(0,0,0,0.28)">
          <AspectRatio ratio={16 / 9}>
            <Box position="relative">
              {path ? (
                <>
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
                  <Box id="DPlayer" ref={containerRef} w="full" h="full" />
                </>
              ) : (
                <Flex align="center" justify="center" color="whiteAlpha.800" textAlign="center" px="4">
                  <Text>视频文件不存在</Text>
                </Flex>
              )}
            </Box>
          </AspectRatio>
        </Box>
        {path && <ExternalPlayer url={createAbsoluteUrl(fileUrl)} />}
      </GridItem>
      <GridItem>
        <EpisodeCard setPlayState={setPlayState} bangumiData={episodeCardProps} />
      </GridItem>
    </Grid>
  );
}
