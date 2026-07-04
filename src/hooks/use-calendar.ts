import { useToast } from '@chakra-ui/react';
import useSWR from 'swr';
import { fetcher } from '~/lib/fetcher';
import type { CalendarData } from '~/types/calendar';

export function useCalendar() {
  const toast = useToast();

  const { data, isLoading, mutate } = useSWR<CalendarData>(['/api/calendar'], fetcher, {
    onError(err) {
      console.error(err);
      toast({
        title: '获取日历信息失败',
        description: '请检查网络连接或配置',
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    },
  });

  return {
    data: sortCalendar(data),
    isLoading,
    mutate,
  };
}

function sortCalendar(calendar?: CalendarData) {
  if (!calendar) return;

  const orderedKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'unknown'] as const;
  const orderedCalendarData = orderedKeys.reduce((obj, key) => {
    obj[key] = calendar[key];
    return obj;
  }, {} as CalendarData);

  return {
    data: orderedCalendarData,
  };
}
