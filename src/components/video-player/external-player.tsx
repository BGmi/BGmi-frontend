import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useState } from 'react';

// source https://github.com/alist-org/alist-web/blob/d06a792fc183dff6aa784ec45c78bdaae3dea881/src/pages/home/previews/video_box.tsx#L20-L52
export const players: { icon: string; name: string; scheme: (url: string) => string }[] = [
  // https://github.com/iina/iina/issues/4861
  { icon: 'iina', name: 'IINA', scheme: url => `iina://weblink?url=${url}` },
  { icon: 'potplayer', name: 'PotPlayer', scheme: url => `potplayer://${url}` },
  { icon: 'vlc', name: 'VLC', scheme: url => `vlc://${url}` },
  { icon: 'nplayer', name: 'nPlayer', scheme: url => `nplayer-${url}` },
  {
    icon: 'omniplayer',
    name: 'OmniPlayer',
    scheme: url => `omniplayer://weblink?url=${url}`,
  },
  {
    icon: 'figplayer',
    name: 'Fig Player',
    scheme: url => `figplayer://weblink?url=${url}`,
  },
  {
    icon: 'infuse',
    name: 'Infuse',
    scheme: url => `infuse://x-callback-url/play?url=${url}`,
  },
  {
    icon: 'mxplayer',
    name: 'MX Player',
    scheme: url => `intent:${url}#Intent;package=com.mxtech.videoplayer.ad;end`,
  },
  {
    icon: 'mxplayer-pro',
    name: 'MX Player Pro',
    scheme: url => `intent:${url}#Intent;package=com.mxtech.videoplayer.pro;end`,
  },
];

export default function ExternalPlayer({ url }: { url: string }) {
  const { colorMode } = useColorMode();
  const [isOpen, setOpen] = useState(false);
  return (
    <Box bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'} p="4" mt="4" h="50%">
      <Text mb="4">使用本地播放器</Text>
      <Flex gap={2} flexWrap="wrap">
        <Button onClick={() => setOpen(true)} size="sm">
          复制播放链接
        </Button>
        {players.map(player => (
          <Button key={player.name} as="a" href={player.scheme(url)} rel="noreferrer" size="sm" fontSize="xs">
            {player.name}
          </Button>
        ))}
      </Flex>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>复制链接</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>{url}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
