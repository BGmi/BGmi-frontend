import { useToast } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

import useSWRMutation from 'swr/mutation';
import { fetcherWithMutation } from '~/lib/fetcher';

import type { FetchFilterResp, SaveFilterBody } from '~/types/subscribe';

export function useSubscribeAction() {
  const authToken = getCookie('authToken') as string | undefined;
  const toast = useToast();

  const handleError = (err: any, title?: string) => {
    console.error(err);
    toast({
      title: title ?? '请求失败',
      status: 'error',
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleSuccess = (title?: string) => {
    toast({
      title: title ?? '请求成功',
      status: 'success',
      duration: 3000,
      position: 'top-right'
    });
  };

  const { trigger: subscribe } = useSWRMutation(['/api/add', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '订阅失败');
    },
    onSuccess() {
      handleSuccess('订阅成功');
    }
  });

  const { trigger: unSubscribe } = useSWRMutation(['/api/delete', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '取消订阅失败');
    },
    onSuccess() {
      handleSuccess('取消订阅成功');
    }
  });

  const { trigger: fetchFilter } = useSWRMutation(['/api/filter', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '获取订阅设定失败');
    }
  });

  const { trigger: saveFilter, isMutating: saveFilterMutating } = useSWRMutation(['/api/filter', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '保存订阅设定失败');
    },
    onSuccess() {
      handleSuccess('保存订阅设定成功');
    }
  });

  const { trigger: saveMarkEpisode, isMutating: saveMarkMutating } = useSWRMutation(['/api/mark', authToken], fetcherWithMutation, {
    onError(err) {
      handleError(err, '保存剧集失败');
    }
  });

  // why use as? https://github.com/vercel/swr/issues/2500
  return {
    handleSubscribe: (name: string, episode: number) => subscribe({ name, episode }),
    handleUnSubscribe: (name: string) => unSubscribe({ name }),
    handleFetchFilter: (name: string) => fetchFilter({ name }) as Promise<FetchFilterResp>,
    handleSaveFilter: { isMutating: saveFilterMutating, trigger: (body: SaveFilterBody) => saveFilter(body) },
    handleSaveMark: { isMutating: saveMarkMutating, trigger: (body: { name: string; episode: number }) => saveMarkEpisode(body) }
  };
}
