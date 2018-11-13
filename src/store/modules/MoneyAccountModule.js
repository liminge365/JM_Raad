import {
  ApiUnSettlement,
  availableList,
  ApiUnSettlementUserAmount,
  ApiUnSettlementOrderList,
  ApiAvailableDetail,
  ApiWithdrawList,
  ApiUnSettlementDetail,
  ApiUnSettlementSubList
} from "../../api/utils";
import {cloneObj} from "../../lib/utils";

//mutationsTypes

const UN_SETTLEMENT_ORDER_LIST = 'UN_SETTLEMENT_ORDER_LIST';
const UN_SETTLEMENT_USER_AMOUNT = 'UN_SETTLEMENT_USER_AMOUNT';
const UN_SETTLEMENT_DETAIL = 'UN_SETTLEMENT_DETAIL';
const UN_SETTLEMENT_SUBLIST = 'UN_SETTLEMENT_SUBLIST';
const AVAILABLELIST = 'AVAILABLELIST';
const WITHDRAWLIST = 'WITHDRAWLIST';


const state = {
  unSettlementOrderList: [],       //待结算
  availableList:[],
  userAmount:0,   //待结算总额
  availableDetail:[],
  withdrawList: [],  //提现记录
  unSettlementOrderDetail:{},
  unSettlementOrderSubList:[]

};

const getters = {
  getUserAmount(state){
    return state.userAmount;
  },
  getUnSettlementOrderList(state) {
    return state.unSettlementOrderList;
  },
  getAvailableList(state) {
    return state.availableList;
  },
  getWithdrawList(state) {
    return state.withdrawList
  },
  getUnSettlementOrderDetail(state){
    console.log(state.unSettlementOrderDetail)
    return state.unSettlementOrderDetail;
  },
  getUnSettlementOrderSubList(state) {
    return state.unSettlementOrderSubList;
  }

};

const actions = {
  actionunSettlementOrderList({commit,state},params) {
    ApiUnSettlementOrderList(cloneObj(params)).then(res=>{
      if(res.data.code === 200){
        params.list = res.data.data;
        commit(UN_SETTLEMENT_ORDER_LIST,params);
      }
    });
  },
  actionUserAmount({commit,state},params){
    ApiUnSettlementUserAmount(cloneObj(params)).then(res=>{
      if(res.data.code === 200){
        params.userAmount = res.data.data;
        commit(UN_SETTLEMENT_USER_AMOUNT,params);
      }
    })
  },
  actionAvailableList({commit,state},params) {
    availableList(cloneObj(params)).then(res=>{
      console.log(res)
      if(res.data.code === 200){
        params.list = res.data.data.availables;
        commit(AVAILABLELIST, params);
      }
    });
  },
  actionWithdrawList({commit,state}, params) {
   ApiWithdrawList(params.data).then(res=>{
          // console.log(res.data.data)
          // console.log(params);
        if(res.data.code === 200){
            params.withdrawList = res.data.data;
            commit(WITHDRAWLIST,params);
        }
    });
  },
  actionunSettlementOrderDetail({commit,state}, params) {
    ApiUnSettlementDetail(params).then(res =>{
      if(res.data.code === 200){
        params.detail = res.data.data;
        commit(UN_SETTLEMENT_DETAIL,params);
      }
    });
  },
  actionunSettlementOrderSubList({commit,state}, params) {
    ApiUnSettlementSubList(params).then(res => {
      if(res.data.code === 200){
        params.sublist = res.data.data;
        commit(UN_SETTLEMENT_SUBLIST,params);
      }
    })
  }
};

const mutations = {
  [UN_SETTLEMENT_ORDER_LIST](state, params) {
    state.unSettlementOrderList = params.list;
    params.callback ? params.callback(params.list): params;
  },
  [AVAILABLELIST](state, params) {
      state.availableList = params.list;
   },
  [UN_SETTLEMENT_USER_AMOUNT](state, params) {
    state.userAmount = params.userAmount;
    params.callback ? params.callback(): params;
  },
  [WITHDRAWLIST](state, params){
    console.log('params.page',params.page)
    if(parseInt(params.page) === 1){
      state.withdrawList = params.withdrawList.withdraws;
    }else{
      for(let i=0;i<params.withdrawList.withdraws.length; i++){
        state.withdrawList.push(params.withdrawList.withdraws[i]);
      }
    }
    
    params.callback ? params.callback(params.withdrawList.withdraws) : params;
  },
  [UN_SETTLEMENT_DETAIL](state, params){
    state.unSettlementOrderDetail = params.detail;
    params.callback ? params.callback(): params;
  },
  [UN_SETTLEMENT_SUBLIST](state, params){
    state.unSettlementOrderSubList = params.sublist;
    params.callback ? params.callback(): params;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
