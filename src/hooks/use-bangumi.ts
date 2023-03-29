import { useToast } from '@chakra-ui/react';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '~/lib/fetcher';
import type { BangumiResponse } from '~/types/bangumi';

export const useBangumi = () => {
  const toast = useToast();
  const multipleFetcher = async <T extends BangumiResponse >(urls: string[], options: ResponseInit) => {
    const [index, old] = await Promise.all(urls.map(url => fetcher<T>([url], options)));
    return {
      ...index,
      data: [...index.data, ...old.data]
    };
  };

  return useSWRImmutable<BangumiResponse>(['/api/index', '/api/old'], multipleFetcher, {
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
