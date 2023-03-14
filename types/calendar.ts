export interface SubtitleGroup {
  name: string
  id: string
}

export interface Bangumi {
  status?: number
  episode?: number
  id: number
  name: string
  subtitle_group: SubtitleGroup[]
  keyword: string
  update_time: string
  cover: string
}

export type Calendar = Record<'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'unknown', Bangumi[]>;
