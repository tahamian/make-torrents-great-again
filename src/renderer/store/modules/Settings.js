const state = {  
  maxDown: '',
  maxUp: '',
  usuage: '',
  currentLang: 'English',
  currentTheme: 'Light',
  currentFont: 'Roboto'
}

const mutations = {
  CHANGE_LANG (state) {
    state.languages = 'lang'
  }
}

const actions = {
  change_lang (context) {
    context.commit('CHANGE_LANG')
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
