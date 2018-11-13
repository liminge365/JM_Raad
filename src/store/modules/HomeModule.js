import {ApiMobileHome, ApiMobileHomeAccount, ApiMobileReadCount,GetHomeActivity} from "../../api/utils";
//import {CATEGORY_ARTICLE_LIST} from "../mutationsTypes";

//mutationsTypes
const HOME_USER_INFO = "HOME_USER_INFO";
const HOME_ACCOUNT_INFO = "HOME_ACCOUNT_INFO";
const HOME_READ_COUNT = 'HOME_READ_COUNT';
const HOME_ACTIVITY = 'HOME_ACTIVITY';
const state = {
  user:{},      // user information
  account:{},    //
  read_count_info:{},  //昨日阅读数据
  number:{},
  setFlag:true
};

const getters = {
  getUserInfo(state){
    return state.user;
  },
  getAccountInfo(state){
    return state.account;
  },
  getReadCount(state){
    return state.read_count_info;
  },
  getHomeActivity(state){
    return state.number;
  }

};

const actions = {

  actionUserInfo({commit,state},params) {
    ApiMobileHome(params).then(res=>{
        if(res.data.code === 200){
          params.user = res.data.data;
          commit(HOME_USER_INFO, params);
        }
    });
  },
  actionAccountInfo({commit,state},params) {
    ApiMobileHomeAccount(params).then(res =>{
      if(res.data.code === 200){
        params.account = res.data.data;
        commit(HOME_ACCOUNT_INFO,params);
      }
    });
  },
  actionReadCount({commit,state},params){
    ApiMobileReadCount(params).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(HOME_READ_COUNT,params);
      }
    });
  },
  actionGetHomeActivity({commit,state},params){
    GetHomeActivity(params).then(res=>{
      commit(HOME_ACTIVITY,res.data);
    })
  }
};

const mutations = {
  [HOME_USER_INFO](state, params) {
    state.user = params.user;
  },
  [HOME_ACCOUNT_INFO](state, params) {
    state.account = params.account;
  },
  [HOME_READ_COUNT](state,params){
    state.read_count_info = params.data;
  },
  [HOME_ACTIVITY](state,params){
    state.number = params;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
