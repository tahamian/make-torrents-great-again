let config = require('./../../../../config.json')

const state = {
  categories: config.TorrentCategories,
  active: config.TorrentCategories[0]
}

const mutations = {
  SET_ACTIVE_TORRENT_CATEGORY (state, activeName) {
    state.categories.filter(current => {
      if (current.name === activeName) state.active = current
    })
  }
}

const actions = {
  setActiveTorrentCategory (state, name) {
    state.commit('SET_ACTIVE_TORRENT_CATEGORY', name)
  }
}

export default {
  state,
  mutations,
  actions
}
