import { useToast } from '@chakra-ui/react';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '~/lib/fetcher';
import type { BangumiResponse } from '~/types/bangumi';

export const useBangumi = () => {
  const toast = useToast();

  return useSWRImmutable<BangumiResponse>(['/api/index'], fetcher, {
    onError(err) {
      console.error(err);
      toast({
        title: '获取番剧数据失败',
        description: '请检查网络连接或配置',
        status: 'error',
        duration: 3000,
        position: 'top-right'
      });
    }
  });
};
