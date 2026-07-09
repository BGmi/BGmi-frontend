import { Box, Button, Flex, IconButton, Text, Tooltip, useClipboard, useColorMode } from '@chakra-ui/react';
import { BsBoxArrowUpRight, BsClipboard } from 'react-icons/bs';

export const players: { name: string; scheme: (url: string) => string }[] = [
  { name: 'IINA', scheme: url => `iina://weblink?url=${url}` },
  { name: 'PotPlayer', scheme: url => `potplayer://${url}` },
  { name: 'VLC', scheme: url => `vlc://${url}` },
  { name: 'nPlayer', scheme: url => `nplayer-${url}` },
  { name: 'OmniPlayer', scheme: url => `omniplayer://weblink?url=${url}` },
  { name: 'Fig Player', scheme: url => `figplayer://weblink?url=${url}` },
  { name: 'Infuse', scheme: url => `infuse://x-callback-url/play?url=${url}` },
  { name: 'MX Player', scheme: url => `intent:${url}#Intent;package=com.mxtech.videoplayer.ad;end` },
  { name: 'MX Player Pro', scheme: url => `intent:${url}#Intent;package=com.mxtech.videoplayer.pro;end` },
];

export default function ExternalPlayer({ url }: { url: string }) {
  const { colorMode } = useColorMode();
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Box
      bg={colorMode === 'light' ? 'white' : 'whiteAlpha.100'}
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      borderRadius="card"
      p="4"
      mt="4"
    >
      <Flex gap="3" align="center" justify="space-between" mb="3">
        <Text fontWeight="semibold">本地播放器</Text>
        <Tooltip label={hasCopied ? '已复制' : '复制播放链接'}>
          <IconButton aria-label="复制播放链接" icon={<BsClipboard />} size="sm" onClick={onCopy} />
        </Tooltip>
      </Flex>
      <Flex gap="2" flexWrap="wrap">
        {players.map(player => (
          <Button
            key={player.name}
            as="a"
            href={player.scheme(url)}
            rel="noreferrer"
            size="sm"
            rightIcon={<BsBoxArrowUpRight />}
            variant="outline"
          >
            {player.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
