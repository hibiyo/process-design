import Vue from 'vue'
import App from './App.vue'
// import { Table } from 'ant-design-vue'

Vue.config.productionTip = false

// Vue.use(Table)

new Vue({
  render: h => h(App),
}).$mount('#app')
