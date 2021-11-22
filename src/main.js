import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import $update from '@/utils';

import '@/assets/css/base.css';

Vue.config.productionTip = false
Vue.prototype.$up = $update

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
