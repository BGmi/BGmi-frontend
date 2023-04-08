import { Box, Button, Fade, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

import { useState } from 'react';
import { useSubscribeAction } from '~/hooks/use-subscribe-action';
import { useColorMode } from '~/hooks/use-color-mode';

import SubscribeForm from './subscribe-form';

import type { WeekCalendar } from '~/types/calendar';
import type { InitialData } from './subscribe-form';

interface Props {
  bangumi: WeekCalendar;
}

export interface SyncData {
  status: boolean;
  episode: number | undefined;
}

export default function SubscribeCard({ bangumi }: Props) {
  const { colorMode } = useColorMode();
  const buttonSubscribeBg = colorMode === 'dark' ? 'green.400' : 'green.100';
  const buttonUnSubscribeBg = colorMode === 'dark' ? 'blue.400' : 'blue.100';

  const [imageLoaded, setImageLoaded] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [initialData, setInitialData] = useState<InitialData>();

  const { handleFetchFilter, handleSubscribe } = useSubscribeAction();

  const [syncData, setSyncData] = useState<SyncData>({
    status: !!bangumi.status,
    episode: bangumi.episode,
  });

  const handleOpen = async (status: boolean, name: string, ep: number) => {
    onOpen();

    /**
     * 先进行订阅操作才能请求 `filter` 获取字幕组数据, 已订阅不操作
     * */
    if (!status) {
      await handleSubscribe(name, 0);
      setSyncData({
        ...syncData,
        status: true,
      });
    }

    const data = await handleFetchFilter(name);

    setInitialData({
      bangumiName: name,
      completedEpisodes: syncData.episode ?? ep,
      filterOptions: {
        include: data?.data.include ?? '',
        exclude: data?.data.exclude ?? '',
        regex: data?.data.regex ?? '',
      },
      subtitleGroups: data?.data.subtitle_group ?? [],
      follwedSubtitleGroups: data?.data.followed ?? [],
    });
  };

  return (
    <>
      <Box>
        <Flex
          alignItems="center"
          minH="12"
          bg={colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100'}
          p="4"
          px="2.5"
          roundedTop="md"
        >
          <Text
            minW="60%"
            maxH="6"
            overflow="hidden"
            transition="max-height 0.3s ease"
            fontWeight="medium"
            _hover={{
              maxH: '28',
            }}
          >
            {bangumi.name}
          </Text>
          <Button
            onClick={() => handleOpen(syncData.status, bangumi.name, bangumi.episode ?? 0)}
            ml="2"
            w="full"
            bg={syncData.status ? buttonSubscribeBg : buttonUnSubscribeBg}
            _hover={{
              opacity: 0.8,
            }}
          >
            {syncData.status ? '查看' : '订阅'}
          </Button>
        </Flex>
        <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'} minW="14rem" minH="sm">
          <Fade in={imageLoaded}>
            <Image
              h="sm"
              w="full"
              src={`./bangumi/cover/${bangumi.cover}`}
              alt="anime cover"
              objectFit="cover"
              backgroundPosition="50% 50%"
              onLoad={() => setImageLoaded(true)}
            />
          </Fade>
        </Box>
      </Box>
      <SubscribeForm
        initialData={initialData}
        isOpen={isOpen}
        onClose={onClose}
        setSyncData={(data: SyncData) => setSyncData(data)}
        syncData={syncData}
      />
    </>
  );
}
