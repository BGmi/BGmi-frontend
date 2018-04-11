import store from './store'

function hasWatched (bangumiName, episode) {
  bangumiName = bangumiName.toString()
  episode = episode.toString()
  if (store.state.history.hasOwnProperty(bangumiName) &&
    store.state.history[bangumiName].hasOwnProperty(episode)) {
    return store.state.history[bangumiName][episode]
  }
}

function isEmpty (obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export {
  isEmpty,
  hasWatched
}
