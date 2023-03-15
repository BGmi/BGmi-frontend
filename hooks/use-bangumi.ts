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
  const { data, error, isLoading } = useSWR<BangumiResponse>('/api/index', fetcher);

  return {
    data,
    error,
    isLoading
  };
};
