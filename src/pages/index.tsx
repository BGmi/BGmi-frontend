import { Badge, Box, Fade, Grid, GridItem, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { FallbackBangumi } from '~/components/fallback';
import Link from '~/components/router-link';

import { useBangumi } from '~/hooks/use-bangumi';
import { useColorMode } from '~/hooks/use-color-mode';
import { normalizePath } from '~/lib/utils';

import type { BangumiData } from '~/types/bangumi';

interface PlayerCardProps {
  bangumiData: BangumiData;
}

function PlayerCard({ bangumiData }: PlayerCardProps) {
  const { colorMode } = useColorMode();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { bangumi_name: title, cover: coverUrl, episode, status } = bangumiData;

  const statusText = episode > 0 ? `最新：第 ${episode} 集` : '暂无更新';

  return (
    <Box mx="2" boxShadow="base" overflow="hidden" roundedBottom="md">
      <Link href={`/player/${normalizePath(title)}`} overflow="hidden">
        <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'} minH="48">
          <Fade in={imageLoaded}>
            <Box position="relative" overflow="hidden">
              {status === 2 ? (
                <Badge pos="absolute" top="2" right="3" bg="yellow.500" color="white">
                  NEW
                </Badge>
              ) : (
                ''
              )}
              <Image
                h="48"
                w="full"
                src={`.${coverUrl}`}
                alt="anime cover"
                objectFit="cover"
                backgroundPosition="50% 50%"
                onLoad={() => setImageLoaded(true)}
              />
              <Box
                opacity="0"
                position="absolute"
                top="0"
                zIndex="1"
                w="full"
                h="full"
                transform="scale(1.5)"
                transition="all 0.3s ease"
                background={
                  "rgba(0,0,0,0.4) url(\"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='图层_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M35.4,28L18.4,38.6c-2.4,1.5-5.4-0.2-5.4-3V14.3c0-2.8,3.1-4.5,5.4-3L35.3,22C37.6,23.3,37.6,26.6,35.4,28z'/%3E%3C/svg%3E%0A\") center no-repeat"
                }
                backgroundSize="25% 25%"
                _hover={{
                  opacity: '1',
                  transform: 'scale(1)',
                }}
              />
            </Box>
          </Fade>
        </Box>
      </Link>
      <Stack minH="5.5rem" p="4" bg={colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100'} position="relative">
        <Heading
          maxH="6"
          overflow="hidden"
          fontSize="xl"
          fontFamily="body"
          transition="max-height 0.3s ease"
          _hover={{
            maxH: '20',
          }}
        >
          {title}
        </Heading>
        <Text mt="0.25rem!" fontSize="sm" color="gray.500" alignContent="center">
          {statusText}
        </Text>
      </Stack>
    </Box>
  );
}

export default function Bangumi() {
  const { data } = useBangumi();

  if (!data) return <FallbackBangumi />;

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(20rem, 1fr))" gap={6}>
      {data.data.map(bangumi => (
        <GridItem key={bangumi.id}>
          <PlayerCard bangumiData={bangumi} />
        </GridItem>
      ))}
    </Grid>
  );
}
