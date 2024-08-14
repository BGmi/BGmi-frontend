import { useToast } from '@chakra-ui/react';

import { atomWithStorage } from 'jotai/vanilla/utils';
import useSWRImmutable from 'swr/immutable';

import { fetcher } from '~/lib/fetcher';
import type { BangumiResponse } from '~/types/bangumi';

export type DataKind = 'new' | 'old' | 'both';
export const bangumiFilterAtom = atomWithStorage<DataKind>(
  'bangumi-data-filter',
  'both',
  {
    ...localStorage,
    getItem: key => (localStorage.getItem(key) ?? 'both') as DataKind,
    setItem: (key, value) => localStorage.setItem(key, value),
  },
  { getOnInit: true }
);

export const useBangumi = () => {
  const toast = useToast();

  const multipleFetcher = async <T extends BangumiResponse>(urls: string[], options: ResponseInit) => {
    const [index, old] = await Promise.all(urls.map(url => fetcher<T>([url], options)));

    return {
      new: index,
      old,
    };
  };

  const { data, isLoading, mutate } = useSWRImmutable<{ new: BangumiResponse; old: BangumiResponse }>(
    ['/api/index', '/api/old'],
    multipleFetcher,
    {
      onError(err) {
        console.error(err);
        toast({
          title: '获取番剧数据失败',
          description: '请检查网络连接或配置',
          status: 'error',
          duration: 3000,
          position: 'top-right',
        });
      },
    }
  );

  return {
    data: data ? { ...data.new, data: [...data.new.data, ...data.old.data] } : undefined,
    kind: data,
    isLoading,
    mutate,
  };
};
