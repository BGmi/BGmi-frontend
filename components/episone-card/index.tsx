import type { BoxProps } from '@chakra-ui/react';
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import { useColorMode } from '~/hooks/use-color-mode';

interface Props {
  onDPlay: (url: string, ep: number) => void
  playInfo: {
    episode: number[]
    totalMark: Record<string, boolean>
    playUrl: Record<string, Record<string & {} | 'path', string>>
  } | undefined
}

export default function EpisodeCard({ onDPlay, playInfo, ...props }: Props & BoxProps) {
  const { colorMode } = useColorMode();

  if (!playInfo)
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
      <Grid templateColumns="repeat(auto-fill, minmax(3.5rem, 1fr))" gap={6}>
        {playInfo.episode.map(ep => (
          <GridItem key={ep}>
            <Button
              onClick={() => onDPlay(playInfo.playUrl[ep].path, ep)}
              fontSize="sm"
              px="7"
              py="2"
              bg={playInfo.totalMark?.[ep] === true ? 'blackAlpha.200' : 'Background'}
            >
              {ep}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
