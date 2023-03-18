import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/** 正在观看的剧集 记录播放时间戳 */
export interface CurrentWatchHistoryItem {
  episode: string
  currentTime?: string
}
export interface WatchHistoryItem {
  [episode: string]: 'mark' | CurrentWatchHistoryItem | undefined
  'current-watch': CurrentWatchHistoryItem | undefined
}
export interface WatchHistory {
  /** 动画片名称 */
  [name: string]: WatchHistoryItem | undefined
}
export const watchHistoryAtom = atomWithStorage<WatchHistory>('watch-history', {});
export const useWatchHistory = () => useAtom(watchHistoryAtom);

export const useVideoCurrentTime = (bangumiName: string) => {
  const [watchHistory] = useWatchHistory();

  // TODO 有没有人浇浇我怎么写这个更新啊
  const updateCurrentTimeToLocal = (currentTime: number) => localStorage.setItem('watch-history', JSON.stringify({
    ...watchHistory,
    [bangumiName]: {
      ...watchHistory[bangumiName],
      'current-watch': {
        ...watchHistory[bangumiName]?.['current-watch'],
        currentTime
      }
    }
  }));

  const getCurrentTimeWithLocal = () => {
    const wh = JSON.parse(localStorage.getItem('watch-history') ?? '') as WatchHistory;
    const seek = wh[bangumiName]?.['current-watch']?.currentTime ?? '0';

    return parseFloat(seek);
  };

  return {
    updateCurrentTimeToLocal,
    getCurrentTimeWithLocal
  };
};
