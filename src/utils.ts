import store from './store';

function hasWatched(bangumiName: string, episode: string): boolean {
  return store.state.history?.[bangumiName]?.[episode] ?? false;
}

function normalizePath(url: string): string {
  return url.replace(/[:*?"<>|']/g, '');
}

export { normalizePath, hasWatched };
