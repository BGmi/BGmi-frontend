import type { BoxProps } from '@chakra-ui/react';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';

import { useColorMode } from '~/hooks/use-color-mode';

interface Props {
  onDPlay: (url: string, ep: number) => void
  playParams: {
    episode: number[]
    totalMark: Record<string, 'mark' | undefined>
    playUrl: Record<string, Record<string & {} | 'path', string>>
  } | undefined
}

export default function EpisodeCard({ onDPlay, playParams, ...props }: Props & BoxProps) {
  const { colorMode } = useColorMode();

  if (!playParams)
    return <div>isLoading...</div>;

  return (
    <Box
      bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
      p="4"
      ml={{ xl: '4', base: 'unset' }}
      mt={{ xl: 'unset', base: '4' }}
      w={{ xl: '30%', base: 'unset' }}
      h="50%"
      {...props}
    >
      <Text mb="4">选集</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(3.75rem, 1fr))" gap={6}>
        {playParams.episode.map(ep => (
          <GridItem key={ep}>
            <Button
              px="7"
              onClick={() => onDPlay(playParams.playUrl[ep].path, ep)}
              fontSize="sm"
              bg={playParams.totalMark?.[ep] === 'mark' ? 'blackAlpha.200' : 'Background'}
            >
              {ep}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
