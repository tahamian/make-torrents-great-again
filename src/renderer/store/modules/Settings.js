const state = {  
  maxDown: null,
  maxUp: null,
  usuage: null,
  currentLang: 'English',
  currentTheme: 'Light',
  currentFont: 'Roboto'
}

const mutations = {
  CHANGE_LANG (state, payload) {
    state.currentLang = payload.lang
  },
  CHANGE_FONT (state, payload) {
    state.currentFont = payload.value
  },
  CHANGE_THEME (state, payload) {
    state.currentTheme = payload.value
  },
  CHANGE_DOWN (state, payload) {
    state.maxDown = payload.value
  },
  CHANGE_UP (state, payload) {
    state.maxUp = payload.value
  },
  CHANGE_MAX (state, payload) {
    state.usuage = payload.value
  }
}

const actions = {
  change_lang (state, payload) {
    state.commit('CHANGE_LANG', payload)
  },
  change_font (state, payload) {
    state.commit('CHANGE_FONT', payload)
  },
  change_theme (state, payload) {
    state.commit('CHANGE_THEME', payload)
  },
  change_down (state, payload) {
    state.commit('CHANGE_DOWN', payload)
  },
  change_up (state, payload) {
    state.commit('CHANGE_UP', payload)
  },
  change_max (state, payload) {
    state.commit('CHANGE_MAX', payload)
  }
}

const getters = {
  getLanguages: state => {
    return state.currentLang
  },
  getThemes: state => {
    return state.currentTheme
  },
  getFonts: state => {
    return state.currentFont
  },
  getUsage: state => {
    return state.usuage
  },
  getDown: state => {
    return state.maxDown
  },
  getUp: state => {
    return state.maxUp
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
