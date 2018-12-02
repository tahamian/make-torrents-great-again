import Vue from 'vue'
// import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
// import ElementUI from 'element-ui'
// import VueRangedatePicker from 'vue-rangedate-picker'

// Vue.use(VueRangedatePicker)
Vue.use(BootstrapVue)
// Vue.use(ElementUI)

// import Buefy from 'buefy'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
