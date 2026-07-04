export interface WeekCalendar {
  status?: number;
  episode?: number;
  id: string;
  name: string;
  subtitle_group?: {
    name: string;
    id: string;
  }[];
  keyword?: string;
  update_day: string;
  cover: string;
}

export type CalendarData = Record<
  'sun' | 'fri' | 'sat' | 'wed' | 'mon' | 'thu' | 'tue' | 'unknown',
  WeekCalendar[] | undefined
>;
export type CalendarDataKey = keyof CalendarData;
export type CalendarDataEntries = [keyof CalendarData, WeekCalendar[] | undefined][];

export interface Calendar {
  data: CalendarData;
}
