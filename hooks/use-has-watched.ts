import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const watchHistoryAtom = atomWithStorage <Record<string, Record<string, boolean>>>('watch-history', {});

export const useHasWatched = (bangumiName: string, episode: string) => {
  const [watchHistory] = useAtom(watchHistoryAtom);

  return watchHistory?.[bangumiName]?.[episode] ?? false;
};
