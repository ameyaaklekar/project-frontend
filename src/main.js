import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from "axios"

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.withCredentials = true;

store.dispatch("auth/getUser").then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
