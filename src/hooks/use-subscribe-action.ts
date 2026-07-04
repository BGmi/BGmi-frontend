import { useToast } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcherWithMutation } from '~/lib/fetcher';

import type { FetchFilterResp, SaveFilterBody, SeenStatusResp } from '~/types/subscribe';

const toFilterList = (value: string) =>
  value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

export function useSubscribeAction() {
  const authToken = getCookie('authToken') as string | undefined;
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const handleError = (err: any, title?: string) => {
    console.error(err);
    toast({
      title: title ?? '请求失败',
      status: 'error',
      duration: 3000,
      position: 'top-right',
    });
  };

  const handleSuccess = (title?: string) => {
    toast({
      title: title ?? '请求成功',
      status: 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  const { trigger: subscribe } = useSWRMutation(['/api/admin/add', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '订阅失败');
    },
    onSuccess() {
      handleSuccess('订阅成功');
    },
  });

  const { trigger: unSubscribe } = useSWRMutation(['/api/admin/delete', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '取消订阅失败');
    },
    onSuccess() {
      handleSuccess('取消订阅成功');
    },
  });

  const { trigger: fetchFilter } = useSWRMutation(['/api/admin/filter', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '获取订阅设定失败');
    },
  });

  const { trigger: fetchSeen } = useSWRMutation(['/api/admin/seen', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '获取观看状态失败');
    },
  });

  const { trigger: saveFilter, isMutating: saveFilterMutating } = useSWRMutation(
    ['/api/admin/filter', authToken],
    fetcherWithMutation,
    {
      onError(err) {
        handleError(err, '保存订阅设定失败');
      },
      onSuccess() {
        handleSuccess('保存订阅设定成功');
      },
    }
  );

  const { trigger: markUnwatched, isMutating: markUnwatchedMutating } = useSWRMutation(
    ['/api/admin/seen_forget', authToken],
    fetcherWithMutation,
    {
      onError(err) {
        handleError(err, '标记未观看失败');
      },
      onSuccess() {
        handleSuccess('标记未观看成功');
        mutate(key => Array.isArray(key) && key[0] === '/api/calendar');
      },
    }
  );

  const { trigger: markWatched, isMutating: markWatchedMutating } = useSWRMutation(
    ['/api/admin/seen_mark', authToken],
    fetcherWithMutation,
    {
      onError(err) {
        handleError(err, '标记已观看失败');
      },
      onSuccess() {
        handleSuccess('标记已观看成功');
        mutate(key => Array.isArray(key) && key[0] === '/api/calendar');
      },
    }
  );

  return {
    handleSubscribe: (name: string) => subscribe({ bangumi: name }),
    handleUnSubscribe: (name: string) => unSubscribe({ bangumi: name }),
    handleFetchFilter: (name: string) =>
      fetchFilter({
        method: 'GET',
        path: `/${encodeURIComponent(name)}`,
      }) as Promise<FetchFilterResp | undefined>,
    handleFetchSeen: (name: string) =>
      fetchSeen({
        method: 'GET',
        path: `/${encodeURIComponent(name)}`,
      }) as Promise<SeenStatusResp | undefined>,
    handleSaveFilter: {
      isMutating: saveFilterMutating,
      trigger: (body: SaveFilterBody) =>
        saveFilter({
          method: 'PATCH',
          path: `/${encodeURIComponent(body.name)}`,
          body: {
            selected_subtitle: body.selectedSubtitle,
            include: toFilterList(body.include),
            exclude: toFilterList(body.exclude),
            regex: body.regex,
          },
        }),
    },
    handleMarkUnwatched: {
      isMutating: markUnwatchedMutating,
      trigger: (body: { name: string; episode: number }) =>
        markUnwatched({
          bangumi: body.name,
          episode: body.episode,
        }) as Promise<SeenStatusResp | undefined>,
    },
    handleMarkWatched: {
      isMutating: markWatchedMutating,
      trigger: (body: { name: string; episode: number }) =>
        markWatched({
          bangumi: body.name,
          episode: body.episode,
        }) as Promise<SeenStatusResp | undefined>,
    },
  };
}
