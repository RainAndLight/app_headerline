import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

import './style/index.css'
import request from '@/utils/requset'
Vue.use(request)
Vue.use(Vant)
// import { Button, Cell, CellGroup } from 'vant'

// Vue
//   .use(Button)
//   .use(Cell)
//   .use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
