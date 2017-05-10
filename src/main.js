// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  routes: [
    { path: '/goods', name: 'goods', component: Goods },
    { path: '/ratings', name: 'ratings', component: Ratings },
    { path: '/seller', name: 'seller', component: Seller }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
