import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect, useMemo, useState } from 'react';

import { useSubscribeAction } from '~/hooks/use-subscribe-action';

export interface InitialData {
  bangumiName: string
  completedEpisodes: number
  filterOptions: {
    include: string
    exclude: string
    regex: string
  }
  subtitleGroups: string[]
  follwedSubtitleGroups: string[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
  initialData: InitialData | undefined
  setUnSubscribed: (bangumiName: string) => void
  setEpisode: (bangumiName: string, newEpisode: number) => void
}

export default function SubscribeForm({ isOpen, onClose, initialData, setUnSubscribed, setEpisode }: Props) {
  const [formData, setFormData] = useState<InitialData | undefined>();
  // 每次操作完，关闭面板后 需清除数据
  const { handleSaveFilter, handleSaveMark, handleUnSubscribe } = useSubscribeAction();

  const selectOptions = useMemo(() => {
    return formData?.subtitleGroups.map((subtitleGroup) => {
      return {
        label: subtitleGroup,
        value: subtitleGroup
      };
    });
  }, [formData]);

  const selectDefaultValue = useMemo(() => {
    return formData?.follwedSubtitleGroups.map((follwedSubtileGroup) => {
      return {
        label: follwedSubtileGroup,
        value: follwedSubtileGroup
      };
    });
  }, [formData]);

  const handleClose = () => {
    setFormData(undefined);
    onClose();
  };

  const handleSave = async () => {
    if (!formData) {
      console.error('formData is undefined');
      return;
    }

    await handleSaveFilter.trigger({
      name: formData.bangumiName,
      include: formData.filterOptions.include,
      exclude: formData.filterOptions.exclude,
      regex: formData.filterOptions.regex,
      subtitle: formData.follwedSubtitleGroups.join(',')
    });

    await handleSaveMark.trigger({
      name: formData.bangumiName,
      episode: formData.completedEpisodes
    });

    setEpisode(formData.bangumiName, formData.completedEpisodes);
    setFormData(undefined);
    onClose();
  };

  const handleUnSub = async () => {
    const data = await handleUnSubscribe(formData?.bangumiName ?? '');
    if (data)
      setUnSubscribed(formData?.bangumiName ?? '');

    setFormData(undefined);
    onClose();
  };

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={{ base: 'sm', md: 'md' }}>
        <ModalHeader>订阅设置</ModalHeader>
        <ModalBody>
          {
            !formData
              ? (
                <Box textAlign="center" my="4">
                  <Spinner />
                </Box>
                )
              : (
                <Flex>
                  <Stack spacing="2" w="full">
                    <Flex>
                      <FormControl id="include" mr="1">
                        <FormLabel>包含字段</FormLabel>
                        <Input
                          onChange={e => setFormData({ ...formData, filterOptions: { ...formData.filterOptions, include: e.target.value } })}
                          defaultValue={formData.filterOptions.include}
                          type="text"
                        />
                      </FormControl>
                      <FormControl id="exclude" ml="1">
                        <FormLabel>排除字段</FormLabel>
                        <Input
                          onChange={e => setFormData({ ...formData, filterOptions: { ...formData.filterOptions, exclude: e.target.value } })}
                          defaultValue={formData.filterOptions.exclude}
                          type="text"
                        />
                      </FormControl>
                    </Flex>
                    <FormControl id="regex">
                      <FormLabel>正则表达式</FormLabel>
                      <Input
                        onChange={e => setFormData({ ...formData, filterOptions: { ...formData.filterOptions, regex: e.target.value } })}
                        defaultValue={formData.filterOptions.regex}
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="completedEpisodes">
                      <FormLabel>已完成下载的剧集</FormLabel>
                      <Input
                        onChange={e => setFormData({ ...formData, completedEpisodes: +e.target.value })}
                        defaultValue={formData.completedEpisodes}
                        type="text"
                      />
                    </FormControl>
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
                  </Stack>
                </Flex>
                )
          }
        </ModalBody>
        <ModalCloseButton />

        <ModalFooter>
          <Button mr="3" onClick={onClose}>返回</Button>
          <Button colorScheme="red" mr="3" onClick={handleUnSub}>取消订阅</Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={handleSaveFilter.isMutating || handleSaveMark.isMutating}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
