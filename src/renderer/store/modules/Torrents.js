import { fstat } from 'fs-extra-p';

const fs = require('fs');

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
  },
  DELETE_TORRENT (state, payload) {
    // Delete from the vuex store //

    let index = -1

    for (let i = 0; i < state.length; i++) {
      let torrent = state[i]

      if (torrent.name === payload.name) index = i
    }

    if (index < 0) return

    state.splice(index, 1)

    // Delete from the config file //

    if (config.SavedTorrents.length < index - 1) return

    let configVersion = config.SavedTorrents[index]

    if (configVersion.name !== payload.name) return

    config.SavedTorrents.splice(index, 1)

    fs.writeFileSync('./config.json', JSON.stringify(config), 'utf-8')
  }
}

const actions = {
  toggleTorrentOptionsVisible (state, payload) {
    state.commit('TOGGLE_TORRENT_OPTIONS_VISIBLE', payload)
  },
  addTorrent(state, payload) {
    state.commit('ADD_TORRENT',payload)
  },
  deleteTorrent(state, payload) {
    state.commit('DELETE_TORRENT', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
