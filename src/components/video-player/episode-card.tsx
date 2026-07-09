import type { BoxProps } from '@chakra-ui/react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';

import { useColorMode } from '~/hooks/use-color-mode';
import { useWatchHistory } from '~/hooks/use-watch-history';

interface Props {
  setPlayState: () => void;
  bangumiData: {
    totalEpisode: string[];
    bangumiName: string;
    currentEpisode: string;
  };
}

export default function EpisodeCard({ setPlayState, bangumiData, ...props }: Props & BoxProps) {
  const { colorMode } = useColorMode();
  const [watchHistory, setWatchHistory] = useWatchHistory();

  const bangumiName = bangumiData.bangumiName;
  const totalMark = watchHistory[bangumiName];
  const panelBg = colorMode === 'dark' ? 'whiteAlpha.100' : 'white';
  const watchedBg = colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100';
  const idleBg = colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50';
  const hoverBg = colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.200';

  const handlePlay = (episode: string) => {
    setPlayState();
    // 这里更新 current-watch 的 episode 时，会更新 /pages/player/[bangumi].tsx 的状态来切换播放的视频
    setWatchHistory({
      ...watchHistory,
      [bangumiName]: {
        ...(watchHistory[bangumiName] ?? {}),
        [episode]: 'mark',
        'current-watch': {
          ...(watchHistory[bangumiName]?.['current-watch'] ?? {}),
          episode,
          currentTime: '0',
        },
      },
    });
  };

  const checkMark = (episode: string) => {
    return totalMark?.[episode] === 'mark';
  };

  const episodeBg = (isCurrent: boolean, isWatched: boolean) => {
    if (isCurrent) return 'red.500';
    if (isWatched) return watchedBg;
    return idleBg;
  };

  return (
    <Box
      bg={panelBg}
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      borderRadius="card"
      p="4"
      w={{ xl: '22rem', base: 'full' }}
      alignSelf="start"
      {...props}
    >
      <Text mb="4" fontWeight="semibold">
        剧集
      </Text>
      {bangumiData.totalEpisode.length === 0 && (
        <Text fontSize="sm" opacity="75%">
          暂无剧集
        </Text>
      )}
      <SimpleGrid
        columns={{ base: 4, sm: 6, xl: 4 }}
        gap={2}
        maxH={{ xl: 'calc(100vh - 13rem)' }}
        overflowY="auto"
        p="1"
        mx="-1"
      >
        {bangumiData.totalEpisode.map(episode => {
          const isCurrent = bangumiData.currentEpisode === episode;
          const isWatched = checkMark(episode);

          return (
            <Button
              key={episode}
              h="10"
              minW="0"
              px="2"
              onClick={() => handlePlay(episode)}
              fontSize="sm"
              fontWeight={isCurrent ? 'semibold' : 'medium'}
              borderRadius="md"
              variant="unstyled"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              bg={episodeBg(isCurrent, isWatched)}
              color={isCurrent ? 'white' : undefined}
              boxShadow={isCurrent ? '0 0 0 2px rgba(229,62,62,0.28)' : undefined}
              _hover={{ bg: isCurrent ? 'red.500' : hoverBg }}
              _active={{ transform: 'translateY(1px)' }}
            >
              <Text as="span" noOfLines={1}>
                {episode}
              </Text>
            </Button>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
