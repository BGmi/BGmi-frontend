import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type WatchHistory = Record<string, Record<string & {} | 'cur-watch', ('mark' | undefined) | number>>;

export const watchHistoryAtom = atomWithStorage <WatchHistory>('watch-history', {});

export const useWatchHistory = () => useAtom(watchHistoryAtom);

export const useHasWatched = (bangumiName: string, episode: string) => {
  const [watchHistory] = useAtom(watchHistoryAtom);

  return watchHistory?.[bangumiName]?.[episode] === 'mark';
};
