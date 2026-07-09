import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect, useMemo, useState } from 'react';

import { useSubscribeAction } from '~/hooks/use-subscribe-action';
import type { SyncData } from './subscribe-card';

export interface InitialData {
  bangumiName: string;
  totalEpisodes: number;
  watchedEpisodes: number[];
  season: number;
  episodeOffset: number;
  subscribed: boolean;
  filterOptions: {
    include: string;
    exclude: string;
    regex: string;
  };
  subtitleGroups: string[];
  follwedSubtitleGroups: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: InitialData | undefined;
  setSyncData: (data: SyncData) => void;
  syncData: SyncData;
}

export default function SubscribeForm({ isOpen, onClose, initialData, setSyncData, syncData }: Props) {
  const [formData, setFormData] = useState<InitialData>();
  const [offsetInput, setOffsetInput] = useState('0');
  const { handleSaveFilter, handleMarkUnwatched, handleMarkWatched, handleSubscribe, handleUnSubscribe } =
    useSubscribeAction();
  const drawerPlacement = useBreakpointValue({ base: 'bottom', md: 'right' } as const) ?? 'right';
  const drawerSize = useBreakpointValue({ base: 'full', md: 'md' } as const) ?? 'md';

  useEffect(() => {
    if (!isOpen) return;

    setFormData(initialData);
    setOffsetInput(String(initialData?.episodeOffset ?? 0));
  }, [initialData, isOpen]);

  const selectOptions = useMemo(() => {
    return formData?.subtitleGroups.map(subtitleGroup => {
      return {
        label: subtitleGroup,
        value: subtitleGroup,
      };
    });
  }, [formData]);

  const selectDefaultValue = useMemo(() => {
    return formData?.follwedSubtitleGroups.map(follwedSubtileGroup => {
      return {
        label: follwedSubtileGroup,
        value: follwedSubtileGroup,
      };
    });
  }, [formData]);

  const handleClose = () => {
    onClose();
  };

  const episodeItems = useMemo(() => {
    const total = Number.isFinite(formData?.totalEpisodes) ? formData?.totalEpisodes ?? 0 : 0;
    return Array.from({ length: total }, (_, index) => index + 1);
  }, [formData?.totalEpisodes]);

  const watchedEpisodeSet = useMemo(() => new Set(formData?.watchedEpisodes ?? []), [formData?.watchedEpisodes]);
  const previewEpisode = formData?.totalEpisodes && formData.totalEpisodes > 0 ? formData.totalEpisodes : 1;

  const setSeason = (season: number) => {
    if (!formData) return;
    setFormData({ ...formData, season: Math.max(1, season || 1) });
  };

  const setEpisodeOffset = (episodeOffset: number) => {
    if (!formData) return;
    setFormData({ ...formData, episodeOffset: episodeOffset || 0 });
    setOffsetInput(String(episodeOffset || 0));
  };

  const handleEpisodeOffsetInput = (value: string) => {
    if (!/^-?\d*$/.test(value) || !formData) return;

    setOffsetInput(value);
    if (value === '' || value === '-') return;

    setFormData({ ...formData, episodeOffset: Number(value) });
  };

  const handleToggleEpisode = async (episode: number) => {
    if (!formData) {
      console.error('formData is undefined');
      return;
    }

    const isWatched = watchedEpisodeSet.has(episode);
    const previousWatchedEpisodes = formData.watchedEpisodes;
    const nextWatchedEpisodes = isWatched
      ? previousWatchedEpisodes.filter(item => item !== episode)
      : [...previousWatchedEpisodes, episode].sort((a, b) => a - b);

    setFormData({
      ...formData,
      watchedEpisodes: nextWatchedEpisodes,
    });
    setSyncData({ ...syncData, episode: Math.max(...nextWatchedEpisodes, 0) || undefined });

    try {
      const response = isWatched
        ? await handleMarkUnwatched.trigger({ name: formData.bangumiName, episode })
        : await handleMarkWatched.trigger({ name: formData.bangumiName, episode });

      if (response?.seen) {
        const responseWatchedEpisodes = [...new Set(response.seen)].sort((a, b) => a - b);
        const responseTotalEpisodes = Number.isFinite(response.total_episode) ? response.total_episode : 0;

        setFormData({
          ...formData,
          totalEpisodes: Math.max(formData.totalEpisodes, responseTotalEpisodes, ...responseWatchedEpisodes),
          watchedEpisodes: responseWatchedEpisodes,
        });
        setSyncData({ ...syncData, episode: Math.max(...responseWatchedEpisodes, 0) || undefined });
      }
    } catch {
      setFormData({
        ...formData,
        watchedEpisodes: previousWatchedEpisodes,
      });
      setSyncData({ ...syncData, episode: Math.max(...previousWatchedEpisodes, 0) || undefined });
    }
  };

  const handleSave = async () => {
    if (!formData) {
      console.error('formData is undefined');
      return;
    }

    await handleSubscribe({
      name: formData.bangumiName,
      season: formData.season,
      episodeOffset: formData.episodeOffset,
    });
    setSyncData({ ...syncData, status: true });

    await handleSaveFilter.trigger({
      name: formData.bangumiName,
      include: formData.filterOptions.include,
      exclude: formData.filterOptions.exclude,
      regex: formData.filterOptions.regex,
      selectedSubtitle: formData.follwedSubtitleGroups,
    });

    onClose();
  };

  const handleUnSub = async () => {
    if (!formData) {
      console.error('formData is undefined');
      return;
    }

    const data = await handleUnSubscribe(formData.bangumiName);
    if (data) setSyncData({ ...syncData, status: false });

    onClose();
  };

  return (
    <Drawer onClose={handleClose} isOpen={isOpen} placement={drawerPlacement} size={drawerSize}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Text fontSize="lg" noOfLines={1}>
            {formData?.bangumiName ?? '订阅设置'}
          </Text>
          <Text mt="1" fontSize="sm" color="gray.500" fontWeight="normal">
            订阅、过滤和观看状态
          </Text>
        </DrawerHeader>
        <DrawerCloseButton />

        <DrawerBody py="5">
          {!formData ? (
            <Box textAlign="center" my="4">
              <Spinner />
            </Box>
          ) : (
            <Stack spacing="6" w="full">
              <Box>
                <Text mb="3" fontWeight="semibold">
                  订阅设置
                </Text>
                <Flex mb="3" gap="2" align="center" wrap="nowrap">
                  <FormControl id="season" display="flex" alignItems="center" gap="1.5" w="auto">
                    <FormLabel m="0" whiteSpace="nowrap">
                      Season
                    </FormLabel>
                    <Input
                      type="number"
                      min={1}
                      value={formData.season}
                      w="3.75rem"
                      h="8"
                      px="1"
                      textAlign="center"
                      onChange={e => setSeason(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl id="episodeOffset" display="flex" alignItems="center" gap="1.5" w="auto">
                    <FormLabel m="0" whiteSpace="nowrap">
                      Offset
                    </FormLabel>
                    <Flex w="7.25rem">
                      <Button
                        borderRightRadius="0"
                        minW="1.9rem"
                        h="8"
                        px="0"
                        variant="outline"
                        onClick={() => setEpisodeOffset(formData.episodeOffset - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={offsetInput}
                        borderRadius="0"
                        h="8"
                        px="1"
                        textAlign="center"
                        onChange={e => handleEpisodeOffsetInput(e.target.value)}
                      />
                      <Button
                        borderLeftRadius="0"
                        minW="1.9rem"
                        h="8"
                        px="0"
                        variant="outline"
                        onClick={() => setEpisodeOffset(formData.episodeOffset + 1)}
                      >
                        +
                      </Button>
                    </Flex>
                  </FormControl>
                  <Text
                    h="8"
                    px="2"
                    display="flex"
                    alignItems="center"
                    bg="blackAlpha.50"
                    borderRadius="sm"
                    fontSize="sm"
                    whiteSpace="nowrap"
                  >
                    EP {previewEpisode} {'->'} S{String(formData.season).padStart(2, '0')}E
                    {String(previewEpisode + formData.episodeOffset).padStart(2, '0')}
                  </Text>
                </Flex>
                <Flex>
                  <FormControl id="include" mr="1">
                    <FormLabel>包含字段</FormLabel>
                    <Input
                      onChange={e =>
                        setFormData({
                          ...formData,
                          filterOptions: { ...formData.filterOptions, include: e.target.value },
                        })
                      }
                      defaultValue={formData.filterOptions.include}
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="exclude" ml="1">
                    <FormLabel>排除字段</FormLabel>
                    <Input
                      onChange={e =>
                        setFormData({
                          ...formData,
                          filterOptions: { ...formData.filterOptions, exclude: e.target.value },
                        })
                      }
                      defaultValue={formData.filterOptions.exclude}
                      type="text"
                    />
                  </FormControl>
                </Flex>
                <FormControl id="regex" mt="3">
                  <FormLabel>正则表达式</FormLabel>
                  <Input
                    onChange={e =>
                      setFormData({ ...formData, filterOptions: { ...formData.filterOptions, regex: e.target.value } })
                    }
                    defaultValue={formData.filterOptions.regex}
                    type="text"
                  />
                </FormControl>
              </Box>

              <Divider />

              <Box>
                <FormControl id="watchStatus">
                  <FormLabel>标记观看状态</FormLabel>
                  {episodeItems.length === 0 ? (
                    <Text color="gray.500" fontSize="sm">
                      暂无剧集
                    </Text>
                  ) : (
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(2.75rem, 1fr))" gap="1">
                      {episodeItems.map(episode => {
                        const isWatched = watchedEpisodeSet.has(episode);

                        return (
                          <Button
                            key={episode}
                            aria-label={`标记第 ${episode} 集${isWatched ? '未观看' : '已观看'}`}
                            variant="ghost"
                            minW="0"
                            h="8"
                            px="0"
                            bg="transparent"
                            borderRadius="sm"
                            color={isWatched ? 'gray.400' : undefined}
                            fontWeight={isWatched ? 'normal' : 'semibold'}
                            textDecoration={isWatched ? 'line-through' : 'none'}
                            _hover={{
                              bg: isWatched ? 'blackAlpha.50' : 'blackAlpha.100',
                              color: isWatched ? 'gray.500' : undefined,
                            }}
                            _active={{ bg: 'blackAlpha.200' }}
                            isLoading={handleMarkWatched.isMutating || handleMarkUnwatched.isMutating}
                            onClick={() => handleToggleEpisode(episode)}
                          >
                            {episode}
                          </Button>
                        );
                      })}
                    </Box>
                  )}
                </FormControl>
              </Box>

              <Divider />

              <Box>
                <FormControl id="subtitleGroups">
                  <FormLabel>选择字幕组</FormLabel>
                  <Select
                    isMulti
                    placeholder=""
                    options={selectOptions}
                    defaultValue={selectDefaultValue}
                    onChange={e => setFormData({ ...formData, follwedSubtitleGroups: e.map(item => item.value) })}
                    closeMenuOnSelect={false}
                  />
                </FormControl>
              </Box>
            </Stack>
          )}
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button mr="3" onClick={onClose}>
            返回
          </Button>
          <Button colorScheme="red" mr="3" variant="outline" onClick={handleUnSub}>
            取消订阅
          </Button>
          <Button colorScheme="red" onClick={handleSave} isLoading={handleSaveFilter.isMutating}>
            {formData?.subscribed ? '保存' : '订阅并保存'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
