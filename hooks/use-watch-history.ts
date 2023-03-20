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
  const updateCurrentTime = (currentTime: number) => {
    const newWatchHistory = {
      ...watchHistory,
      [bangumiName]: {
        ...watchHistory[bangumiName],
        'current-watch': {
          ...(watchHistory[bangumiName]?.['current-watch'] || {}),
          currentTime
        }
      }
    };

    localStorage.setItem('watch-history', JSON.stringify(newWatchHistory));
  };

  const getCurrentTime = (): number => {
    const watchHistoryJson = localStorage.getItem('watch-history') ?? '{}';
    const watchHistory = JSON.parse(watchHistoryJson) as WatchHistory;
    const currentTime = watchHistory[bangumiName]?.['current-watch']?.currentTime ?? '0';

    return parseFloat(currentTime);
  };

  return {
    updateCurrentTime,
    getCurrentTime
  };
};
