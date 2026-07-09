export interface FetchFilterResp {
  available_subtitle: string[];
  selected_subtitle: string[];
  include: string[];
  exclude: string[];
  regex: string;
  season: number;
  episode_offset: number;
}

export interface SeenStatusResp {
  bangumi: string;
  episode?: number;
  total_episode: number;
  seen: number[];
}

export interface SaveFilterBody {
  name: string;
  include: string;
  exclude: string;
  regex: string;
  selectedSubtitle: string[];
}
