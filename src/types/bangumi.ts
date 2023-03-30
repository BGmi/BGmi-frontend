export interface UpdateTime {
  Mon: 'Mon';
  Tue: 'Tue';
  Wed: 'Wed';
  Thu: 'Thu';
  Fri: 'Fri';
  Sat: 'Sat';
  Sun: 'Sun';
}

export interface Bangumi {
  bangumi_id: number;
  bangumi_name: string;
  name: string;
  cover: string;
  data_source: string;
  episode: number;
  exclude: string;
  include: string;
  player: { [keys: number]: { player: string } };
  regex: string;
  status: 1;
  subtitle: string;
  update_time: UpdateTime;
  updated_time: number;
}

export interface BangumiData {
  name: string;
  update_time: string;
  cover: string;
  id: number;
  bangumi_name: string;
  episode: number;
  status: number;
  updated_time: number;
  player: Record<string, Record<(string & {}) | 'path', string>>;
}

export interface BangumiResponse {
  version: string;
  latest_version: string;
  frontend_version: string;
  status: string;
  lang: string;
  danmaku_api: string;
  data: BangumiData[];
}
