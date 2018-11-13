import {ApiAccountListGroup, 
  ApiAccountListData, 
  ApiAccountListRemove, 
  ApiAccountListDel, 
  ApiAccountListAccountgroup,
  ApiAccountListUpacgroup,
  ApiAccountListAddgroup,
} from "../../api/utils";

//mutationsTypes
const ACCOUNT_LIST_GROUP = "ACCOUNT_LIST_GROUP";
const ACCOUNT_LIST_DATA = "ACCOUNT_LIST_DATA";
const ACCOUNT_LIST_REMOVE = "ACCOUNT_LIST_REMOVE";
const ACCOUNT_LIST_DEL = "ACCOUNT_LIST_DEL";
const ACCOUNT_LIST_ACCOUNTGROUP = "ACCOUNT_LIST_ACCOUNTGROUP";
const ACCOUNT_LIST_ADDUPACGROUP = "ACCOUNT_LIST_ADDUPACGROUP";
const ACCOUNT_LIST_ADDGROUP = "ACCOUNT_LIST_ADDGROUP";
const ACCOUNT_LIST_SODATA = "ACCOUNT_LIST_SODATA";
const state = {
  list:{},      // 账号组
  accounts: {},//账号列表
  removeid: {},//移除账号
  delid:{}, //删除账号
  addgroup:{},
  upacgroup:{},
  sodata: {},//搜索的数据
};

const getters = {
  getAccountListGroup(state){
    return state.list;
  },
  getAccountListData(state){
    return state.accounts;
  },
  getAccountListRemove(state){
    return state.removeid;
  },
  getAccountListDel(state){
    return state.delid;
  },
  getAccountListAccountgroup(state){
    return state.delid;
  },
  getAccountListUpacgroup(state){
    return state.upacgroup;
  },
  getAccountListAddgroup(state){
    return state.addgroup;
  },
  getAccountListSodata(state){
    return state.sodata;
  },
};

const actions = {

    actionAccountListGroup({commit,state},params) {
        ApiAccountListGroup(params).then(res=>{
                // console.log(res)
                // console.log(params)
            if(res.data.code === 200){
            params.list = res.data.data;
            commit(ACCOUNT_LIST_GROUP, params);
            }
        });
    },
    actionAccountListData({commit,state},params) {
        ApiAccountListData(params).then(res=>{
                // console.log(res);
                // console.log(params);
            if(res.data.code === 200){
                params.accounts = res.data.data.accounts;
                commit(ACCOUNT_LIST_DATA, params);
            }
        });
    },
    actionAccountListRemove({commit,state},params) {
      ApiAccountListRemove(params).then(res=>{
              // console.log(res);
              // console.log(params);
          if(res.data.code === 200){
              params.accounts = res.data.data;
              commit(ACCOUNT_LIST_REMOVE, params);
          }
      });
    },
    actionAccountListDel({commit,state},params) {
      ApiAccountListDel(params).then(res=>{
              // console.log(res);
              // console.log(params);
          if(res.data.code === 200){
              params.accounts = res.data.data;
              commit(ACCOUNT_LIST_DEL, params);
          }
      });
    },
    actionAccountListAccountgroup({commit,state},params) {
      ApiAccountListAccountgroup(params).then(res=>{
              // console.log(res);
              // console.log(params);
          if(res.data.code === 200){
              params.accounts = res.data.data;
              commit(ACCOUNT_LIST_ACCOUNTGROUP, params);
          }
      });
    },
    actionAccountListUpacgroup({commit,state},params) {
      ApiAccountListUpacgroup(params).then(res=>{
              // console.log(res);
              // console.log(params);
          if(res.data.code === 200){
              params.upacgroup = res.data;
              commit(ACCOUNT_LIST_ADDUPACGROUP, params);
          }
      });
    },
    actionAccountListAddgroup({commit,state},params) {
      ApiAccountListAddgroup(params).then(res=>{
              // console.log(res);
              // console.log(params);
          if(res.data.code === 200){
              params.addgroup = res.data;
              commit(ACCOUNT_LIST_ADDGROUP, params);
          }else{
              params.addgroup = res.data;
              commit(ACCOUNT_LIST_ADDGROUP, params);
          }
      });
    },
    actionAccountListSodata({commit,state},params) {
      // ApiAccountListSodata(params).then(res=>{
              // console.log(res);
              console.log(params);
          // if(res.data.code === 200){
          //     params.sodata = res.data;
          //     commit(ACCOUNT_LIST_SODATA, params);
          // }else{
          //     params.sodata = res.data;
          //     commit(ACCOUNT_LIST_SODATA, params);
          // }
      // });
    },
};

const mutations = {
  [ACCOUNT_LIST_GROUP](state, params) {
    state.list = params.list;
  },
  [ACCOUNT_LIST_DATA](state, params) {
    state.accounts = params.accounts;
    params.callback ? params.callback(params.accounts): params;
  },
  [ACCOUNT_LIST_REMOVE](state, params) {
    state.removeid = params.accounts;
    params.callback ? params.callback(params.accounts): params;
  },
  [ACCOUNT_LIST_DEL](state, params) {
    state.delid = params.accounts;
    params.callback ? params.callback(params.accounts): params;
  },
  [ACCOUNT_LIST_ACCOUNTGROUP](state, params) {
    // console.log(params)
    state.delid = params.accounts;
    params.callback ? params.callback(params.accounts): params;
  },
  [ACCOUNT_LIST_ADDUPACGROUP](state, params) {
    // console.log(params)
    state.upacgroup = params.upacgroup;
    params.callback ? params.callback(params.upacgroup): params;
  },
  [ACCOUNT_LIST_ADDGROUP](state, params) {
    state.addgroup = params.addgroup;
    params.callback ? params.callback(params.addgroup): params;
  },
  [ACCOUNT_LIST_SODATA](state, params) {
    state.sodata = params.sodata;
    params.callback ? params.callback(params.sodata): params;
  },
};


export default {
  state,
  getters,
  actions,
  mutations
}
