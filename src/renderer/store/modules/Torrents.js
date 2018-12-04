import { fstat } from 'fs-extra-p';

const fs = require('fs');

/* Store that lists the active torrents in the entire system */

let config = require('./../../../../config.json')

const state = config.SavedTorrents.map((current) => {
  current.downloadSpeed = 0
  current.uploadSpeed = 0
  current.peers = Math.floor(Math.random() * 100)
  current.optionsVisible = false
  current.time = 0,
  current.type = 'down',
  current.downLimit = null,
  current.upLimit = null
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
  },
  
  UPDATE_DOWN(state, payload) {
    state.filter( (current) => {
      return payload.name == current.name
    })[0].downloadSpeed = payload.downloadSpeed
  },

  UPDATE_UP(state, payload) {
    state.filter( (current) => {
      return payload.name == current.name
    })[0].uploadSpeed = payload.uploadSpeed
  },
  UPDATE_TIME (state, payload) {
    state.filter((current) => {
      return payload.name == current.name
    })[0].time = payload.time + state.filter((current) => {
      return payload.name == current.name
    })[0].time
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
  },
  updateDown (state, payload){
    state.commit('UPDATE_DOWN', payload)
  },
  updateUp (state, payload){
    state.commit('UPDATE_UP', payload)
  },
  updateTime (state, payload) {
    state.commit('UPDATE_TIME', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
