import type { BoxProps } from '@chakra-ui/react';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';

import { FallbackEpisodeCard } from '../fallback';

import { useColorMode } from '~/hooks/use-color-mode';
import { useWatchHistory } from '~/hooks/use-watch-history';

interface Props {
  setPlayState: (url: string) => void
  bangumiData: {
    totalEpisode: string[]
    playUrl: Record<string, Record<string & {} | 'path', string>>
    bangumiName: string
  } | undefined
}

export default function EpisodeCard({ setPlayState, bangumiData, ...props }: Props & BoxProps) {
  const { colorMode } = useColorMode();
  const [watchHistory, setWatchHistory] = useWatchHistory();

  if (!bangumiData)
    return <FallbackEpisodeCard />;

  const bangumiName = bangumiData.bangumiName;
  const totalMark = watchHistory[bangumiName];
  const markBgColor = colorMode === 'dark' ? 'blackAlpha.400' : 'whiteAlpha.600';

  const handlePlay = (url: string, episode: string) => {
    setPlayState(url);

    setWatchHistory({
      ...watchHistory,
      [bangumiName]: {
        ...(watchHistory[bangumiName] ?? {}),
        [episode]: 'mark',
        'current-watch': {
          ...(watchHistory[bangumiName]?.['current-watch'] ?? {}),
          episode,
          currentTime: '0'
        }
      }
    });
  };

  const checkMark = (episode: string) => {
    // 第一集必定 mark
    return (totalMark?.[episode] === 'mark' || episode === '1');
  };

  return (
    <Box
      bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
      p="4"
      ml={{ xl: '4', base: 'unset' }}
      mt={{ xl: 'unset', base: '4' }}
      w={{ xl: '30%', base: 'unset' }}
      minW="20%"
      h="50%"
      {...props}
    >
      <Text mb="4">选集</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(3.75rem, 1fr))" gap={4}>
        {bangumiData.totalEpisode.length !== 0 ? bangumiData.totalEpisode.map(episode => (
          <GridItem key={episode}>
            <Button
              px="7"
              maxW="16"
              onClick={() => handlePlay(bangumiData.playUrl[episode].path, episode)}
              fontSize="sm"
              bg={checkMark(episode) ? markBgColor : 'Background'}
            >
              {episode}
            </Button>
          </GridItem>
        )) : '正在下载'}
      </Grid>
    </Box>
  );
}
