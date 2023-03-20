import { useToast } from '@chakra-ui/react';
import useSWR from 'swr';
import { fetcher } from '~/lib/fetcher';

export interface BangumiData {
  name: string
  update_time: string
  cover: string
  id: number
  bangumi_name: string
  episode: number
  status: number
  updated_time: number
  player: Record<string, Record<string & {} | 'path', string>>
}
export interface BangumiResponse {
  version: string
  latest_version: string
  frontend_version: string
  status: string
  lang: string
  danmaku_api: string
  data: BangumiData[]
}

export const useBangumi = () => {
  const toast = useToast();

  return useSWR<BangumiResponse>(['/api/index'], fetcher, {
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
