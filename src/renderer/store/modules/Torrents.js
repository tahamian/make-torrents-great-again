/* Store that lists the active torrents in the entire system */

let config = require('./../../../../config.json')

const state = config.SavedTorrents

const mutations = {}

const actions = {}

export default {
  state,
  mutations,
  actions
}
