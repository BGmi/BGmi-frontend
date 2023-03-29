import { Box, Button, Fade, Flex, Image, TabPanel, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import type { InitialData } from './subscribe-form';
import SubscribeForm from './subscribe-form';

import { useSubscribeAction } from '~/hooks/use-subscribe-action';
import { useColorMode } from '~/hooks/use-color-mode';

import type { WeekCalendar } from '~/types/calendar';

interface Props {
  bangumis: WeekCalendar[]
}

export default function SubscribePanel({ bangumis }: Props) {
  const { colorMode } = useColorMode();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<Record<string, boolean>>(
    Object.fromEntries(bangumis.map(bangumi => [bangumi.name, !!bangumi.status]))
  );
  const [episode, setEpisode] = useState<Record<string, number>>(
    Object.fromEntries(bangumis.map(bangumi => [bangumi.name, bangumi.episode ?? 0]))
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [initialData, setInitialData] = useState<InitialData>();

  const { handleFetchFilter, handleSubscribe } = useSubscribeAction();

  const buttonSubscribeBg = colorMode === 'dark' ? 'green.400' : 'green.100';
  const buttonUnSubscribeBg = colorMode === 'dark' ? 'blue.400' : 'blue.100';

  const handleOpen = async (status: boolean, name: string, ep: number) => {
    onOpen();

    /**
     * 先进行订阅操作才能请求 `filter` 获取字幕组数据, 已订阅不操作
     * */
    if (!status) {
      await handleSubscribe(name, 0);
      setIsSubscribed({ ...isSubscribed, [name]: true });
    }

    const data = await handleFetchFilter(name);

    setInitialData({
      bangumiName: name,
      completedEpisodes: episode[name] ?? ep,
      filterOptions: {
        include: data?.data.include ?? '',
        exclude: data?.data.exclude ?? '',
        regex: data?.data.regex ?? ''
      },
      subtitleGroups: data?.data.subtitle_group ?? [],
      follwedSubtitleGroups: data?.data.followed ?? []
    });
  };

  return (
    <>
      <TabPanel
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(14rem, 1fr))"
        gridTemplateRows="1fr"
        justifyContent="center"
        gap={8}
      >
        {bangumis.map(bangumi => (
          <Box key={bangumi.id}>
            <Flex alignItems="center" minH="12" bg={colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100'} p="4" px="2.5" roundedTop="md">
              <Text
                minW="60%"
                maxH="6"
                overflow="hidden"
                transition="max-height 0.3s ease"
                fontWeight="medium"
                _hover={{
                  maxH: '28'
                }}
              >
                {bangumi.name}
              </Text>
              <Button
                onClick={() => handleOpen(isSubscribed?.[bangumi.name], bangumi.name, bangumi.episode ?? 0)}
                ml="2"
                w="full"
                bg={isSubscribed?.[bangumi.name] ? buttonSubscribeBg : buttonUnSubscribeBg}
                _hover={{
                  opacity: 0.8
                }}
              >
                {isSubscribed?.[bangumi.name] ? '查看' : '订阅'}
              </Button>
            </Flex>
            <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'} minW="14rem" minH="sm">
              <Fade in={imageLoaded}>
                <Image
                  h="sm"
                  w="full"
                  src={`https://${bangumi.cover.slice(6)}`}
                  alt="anime cover"
                  objectFit="cover"
                  backgroundPosition="50% 50%"
                  onLoad={() => setImageLoaded(true)}
                />
              </Fade>
            </Box>
          </Box>
        ))}
      </TabPanel>
      <SubscribeForm
        initialData={initialData}
        isOpen={isOpen}
        onClose={onClose}
        setUnSubscribed={(bangumiName: string) => setIsSubscribed({ ...isSubscribed, [bangumiName]: false })}
        setEpisode={(bangumiName: string, newEpisode: number) => setEpisode({ ...episode, [bangumiName]: newEpisode })}
      />
    </>
  );
}
