import store from './store';

function hasWatched(bangumiName: string, episode: string) {
  if (
    Object.prototype.hasOwnProperty.call(store.state.history, bangumiName) &&
    Object.prototype.hasOwnProperty.call(
      store.state.history[bangumiName],
      episode
    )
  ) {
    return store.state.history[bangumiName][episode];
  }
}

function normalizePath(url: string) {
  url = url.replace(/[:*?"<>|']/g, '');
  return url;
}

export { normalizePath, hasWatched };
