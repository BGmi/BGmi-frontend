export interface WeekCalendar {
  status?: number;
  episode?: number;
  id: number;
  name: string;
  subtitle_group: {
    name: string;
    id: string;
  }[];
  keyword: string;
  update_time: string;
  cover: string;
}

export type CalendarData = Record<
  'sun' | 'fri' | 'sat' | 'wed' | 'mon' | 'thu' | 'tue' | 'unknown',
  WeekCalendar[] | undefined
>;
export type CalendarDataKey = keyof CalendarData;
export type CalendarDataEntries = [keyof CalendarData, WeekCalendar[] | undefined][];

export interface Calendar {
  version: string;
  latest_version: string;
  frontend_version: string;
  status: string;
  lang: string;
  danmaku_api: string;
  data: CalendarData;
}
