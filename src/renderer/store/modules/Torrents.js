/* Store that lists the active torrents in the entire system */

let config = require('./../../../../config.json')

const state = config.SavedTorrents.map((current) => {
  current.downloadSpeed = 0
  current.uploadSpeed = 0
  current.peers = 0
  current.optionsVisible = false

  return current
})

const mutations = {
  TOGGLE_TORRENT_OPTIONS_VISIBLE (state, payload) {
    let torrent = payload.torrent
    let option = payload.option

    state.filter(current => {
      return current.name === torrent.name
    })[0].optionsVisible = option
  },
  ADD_TORRENT (state, payload) {
    state.push(payload)
   
  }
}

const actions = {
  toggleTorrentOptionsVisible (state, payload) {
    state.commit('TOGGLE_TORRENT_OPTIONS_VISIBLE', payload)
  },
  addTorrent(state, payload){
    state.commit('ADD_TORRENT',payload)
  }
}

export default {
  state,
  mutations,
  actions
}
