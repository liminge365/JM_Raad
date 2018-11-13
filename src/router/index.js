import Vue from 'vue'
import Router from 'vue-router'
import modules from './modules'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: modules
})
