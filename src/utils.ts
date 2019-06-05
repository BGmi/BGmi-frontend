import store from './store'

function hasWatched (bangumiName: string, episode: string) {
  bangumiName = bangumiName.toString()
  episode = episode.toString()
  if (store.state.history.hasOwnProperty(bangumiName) && store.state.history[bangumiName].hasOwnProperty(episode)) {
    return store.state.history[bangumiName][episode]
  }
}

function isEmpty (obj: any) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
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
