import {
  AspectRatio,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Fade,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';

import { FallbackBangumi } from '~/components/fallback';
import RouterLink from '~/components/router-link';

import { bangumiFilterAtom, type DataKind, useBangumi } from '~/hooks/use-bangumi';
import { useColorMode } from '~/hooks/use-color-mode';
import { createBgmiAssetUrl } from '~/lib/utils';

import type { BangumiData } from '~/types/bangumi';

interface PlayerCardProps {
  bangumiData: BangumiData;
}

const sortUpdatedFirst = (bangumiList: BangumiData[]) =>
  bangumiList
    .map((bangumi, index) => ({ bangumi, index }))
    .sort((a, b) => {
      const statusDiff = Number(b.bangumi.status === 2) - Number(a.bangumi.status === 2);
      if (statusDiff !== 0) return statusDiff;

      return a.index - b.index;
    })
    .map(({ bangumi }) => bangumi);

function PlayerCard({ bangumiData }: PlayerCardProps) {
  const { colorMode } = useColorMode();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { bangumi_name: title, cover: coverUrl, episode, status } = bangumiData;

  const statusText = episode > 0 ? `最新：第 ${episode} 集` : '暂无更新';

  return (
    <Box role="group">
      <RouterLink
        href={`/player/${encodeURIComponent(String(bangumiData.id))}`}
        display="block"
        _hover={{ textDecoration: 'none' }}
      >
        <AspectRatio
          ratio={3 / 4}
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
          overflow="hidden"
          borderRadius="card"
          boxShadow={colorMode === 'dark' ? '0 16px 40px rgba(0,0,0,0.35)' : '0 16px 34px rgba(15,23,42,0.12)'}
        >
          <Box>
            <Fade in={imageLoaded}>
              <Image
                w="full"
                h="full"
                src={createBgmiAssetUrl(coverUrl)}
                alt={title}
                objectFit="cover"
                onLoad={() => setImageLoaded(true)}
                transition="transform 0.3s ease"
                _groupHover={{ transform: 'scale(1.04)' }}
              />
            </Fade>
            <Box
              position="absolute"
              inset="0"
              bgGradient="linear(to-t, blackAlpha.800, blackAlpha.300 34%, transparent 62%)"
              opacity="0.95"
            />
            {status === 2 && (
              <Badge pos="absolute" top="3" right="3" bg="red.500" color="white" borderRadius="sm">
                NEW
              </Badge>
            )}
            <Box position="absolute" left="0" right="0" bottom="0" p="3" color="white">
              <Heading fontSize="md" fontFamily="body" noOfLines={2}>
                {title}
              </Heading>
              <Text mt="1" fontSize="xs" opacity="0.84">
                {statusText}
              </Text>
            </Box>
          </Box>
        </AspectRatio>
      </RouterLink>
      <Box mt="3" px="1">
        <Text fontWeight="semibold" noOfLines={1}>
          {title}
        </Text>
        <ChakraLink
          href={`https://bgm.tv/subject_search/${title}`}
          target="_blank"
          color="red.300"
          fontSize="sm"
          onClick={e => e.stopPropagation()}
        >
          番组计划
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default function Bangumi() {
  const { data, kind } = useBangumi();
  const { colorMode } = useColorMode();
  const [bangumiShow, setBangumiShow] = useAtom(bangumiFilterAtom);
  const [searchKey, setSearchKey] = useState('');

  let bangumiData = data;
  if (bangumiShow === 'new') bangumiData = kind?.new;
  if (bangumiShow === 'old') bangumiData = kind?.old;

  const filterItems: { label: string; value: DataKind }[] = [
    { label: '全部', value: 'both' },
    { label: '新番', value: 'new' },
    { label: '旧番', value: 'old' },
  ];

  const filteredBangumi = useMemo(() => {
    const keyword = searchKey.trim().toLowerCase();
    const sourceData = bangumiData?.data ?? [];
    const filteredData = keyword
      ? sourceData.filter(bangumi => bangumi.bangumi_name.toLowerCase().includes(keyword))
      : sourceData;

    return sortUpdatedFirst(filteredData);
  }, [bangumiData?.data, searchKey]);

  if (!bangumiData) return <FallbackBangumi />;

  const isSearching = searchKey.trim() !== '';
  const countText = isSearching
    ? `${filteredBangumi.length} / ${bangumiData.data.length} 部番剧`
    : `${bangumiData.data.length} 部番剧`;

  return (
    <Box>
      <Flex
        mb="6"
        gap="4"
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex align="baseline" gap="3" wrap="wrap">
          <Heading size="lg">Bangumi</Heading>
          <Text color="gray.500">{countText}</Text>
        </Flex>
        <Flex gap="3" direction={{ base: 'column', sm: 'row' }}>
          <InputGroup size="sm" maxW={{ base: 'full', sm: '15rem' }}>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch size="14" />
            </InputLeftElement>
            <Input
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              placeholder="搜索番剧"
              border="none"
              borderRadius="full"
              bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50'}
              _hover={{
                bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
              }}
              _focusVisible={{
                bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'white',
                boxShadow: colorMode === 'dark' ? '0 0 0 2px rgba(255,255,255,0.16)' : '0 0 0 2px rgba(0,0,0,0.08)',
              }}
            />
          </InputGroup>
          <ButtonGroup size="sm" variant="outline" isAttached>
            {filterItems.map(item => (
              <Button
                key={item.value}
                onClick={() => setBangumiShow(item.value)}
                colorScheme={bangumiShow === item.value ? 'red' : 'gray'}
                variant={bangumiShow === item.value ? 'solid' : 'outline'}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(11rem, 1fr))" gap={{ base: 4, md: 6 }}>
        {filteredBangumi.map(bangumi => (
          <GridItem key={bangumi.id ?? bangumi.bangumi_name}>
            <PlayerCard bangumiData={bangumi} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
