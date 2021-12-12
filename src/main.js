import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vuetify, dataV, echarts } from '@/plugins';

import $update from '@/utils';

import '@/assets/css/base.css';

Vue.config.productionTip = false
Vue.prototype.$up = $update
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  vuetify,
  dataV,
  echarts,
  render: h => h(App)
}).$mount('#app')
