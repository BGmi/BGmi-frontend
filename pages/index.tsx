import { Badge, Box, Flex, Grid, GridItem, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { BsPlayBtnFill } from 'react-icons/bs';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { FallbackBangumi } from '~/components/fallback';

import type { BangumiData } from '~/hooks/use-bangumi';
import { useBangumi } from '~/hooks/use-bangumi';
import { useColorMode } from '~/hooks/use-color-mode';
import { BASE_PATH } from '~/lib/contant';

interface PlayerCardProps {
  bangumiData: BangumiData
}

function PlayerCard({ bangumiData }: PlayerCardProps) {
  const { colorMode } = useColorMode();
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const { bangumi_name: title, cover: coverUrl, episode } = bangumiData;

  const handleToPlayer = () => {
    router.push({
      pathname: `/player/${title}`,
      query: {
        bangumiData: JSON.stringify(bangumiData)
      }
    });
  };

  return (
    <Box
      roundedTop="md"
      mx="2"
      boxShadow="base"
      >
      <Box cursor="pointer" onClick={handleToPlayer} bg="blackAlpha.300" roundedTop="md">
        <Image
          roundedTop="md"
          h="48"
          w="full"
          backgroundRepeat="no-repeat"
          fit="cover"
          src={BASE_PATH + coverUrl}
          alt="bangumi cover"
          />
      </Box>
      <Stack minH="5.5rem" p="4" bg={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.100'}>
        <Flex
          justifyContent="space-between"
        >
          <Heading
            maxW="70%"
            whiteSpace={isHover ? 'unset' : 'nowrap'}
            overflow={isHover ? 'unset' : 'hidden'}
            textOverflow={isHover ? 'unset' : 'ellipsis'}
            fontSize="xl"
            fontFamily="body"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {title}
          </Heading>
          <IconButton
            aria-label="play"
            onClick={handleToPlayer}
            icon={<BsPlayBtnFill size="40" />}
            variant="ghost"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
        </Flex>
        <Text mt="0.25rem!" fontSize="sm" color="gray.500" alignContent="center">
          <Badge
            colorScheme="gray"
            variant="solid"
          >
            最新{episode > 0 ? `：第 ${episode} 集` : ''}
          </Badge>
        </Text>
      </Stack>
    </Box>
  );
}

export default function Bangumi() {
  const { data } = useBangumi();

  if (!data)
    return <FallbackBangumi />;

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(20rem, 1fr))" gap={6}>
      {data.data.map(bangumi => (
        <GridItem key={bangumi.id}>
          <PlayerCard
            bangumiData={bangumi}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
