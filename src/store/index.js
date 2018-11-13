import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import ReadingModule from './modules/ReadingModule'
import HomeModule from './modules/HomeModule'
import OrderModule from './modules/OrderModule'
import MoneyAccountModule from './modules/MoneyAccountModule'
import PublishModule from './modules/PublishModule'
import AccountModule from './modules/AccountModule'

Vue.use(Vuex);
const state = {
  totalNumber: '',
  Readnum: '',
  firstUrl:''
};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules:{
    ReadingModule,
    HomeModule,
    OrderModule,
    MoneyAccountModule,
    PublishModule,
    AccountModule
  }
})
