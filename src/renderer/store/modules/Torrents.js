/* Store that lists the active torrents in the entire system */

let config = require('./../../../../config.json')

const state = config.SavedTorrents.map((current) => {
  current.downloadSpeed = 0
  current.uploadSpeed = 0
  current.peers = 0

  return current
})

const mutations = {}

const actions = {}

export default {
  state,
  mutations,
  actions
}
