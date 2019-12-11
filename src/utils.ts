import store from './store'

// import * as _ from ''

function hasWatched (bangumiName: string, episode: string) {
  bangumiName = bangumiName.toString()
  episode = episode.toString()
  if (Object.prototype.hasOwnProperty.call(store.state.history, bangumiName) &&
    Object.prototype.hasOwnProperty.call(store.state.history[bangumiName], episode)) {
    return store.state.history[bangumiName][episode]
  }
}

function isEmpty (obj: any) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
}

function normalizePath (url: string) {
  url = url.replace(/[:*?"<>|']/g, '')
  return url
}

export {
  normalizePath,
  isEmpty,
  hasWatched
}
