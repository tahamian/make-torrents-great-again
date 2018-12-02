const state = {
  themes: ['Light', 'Dark', 'Blue'],
  fonts: ['Roboto', 'Georgia','Times New Roman', 'Arial', 'Helvetica','Courier','Verdana','Geneva'],
  maxDown: '',
  maxUp: '',
  usuage: '',
  languages: ['English', 'French', 'Spanish'],
  data: []
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
    return state.languages
  },
  getThemes: state => {
    return state.themes
  },
  getFonts: state => {
    let x =state.fonts 
    return x.sort()
  }
}

// const setters = {

// }

export default {
  state,
  mutations,
  actions,
  getters
}
