import {
  ApiOrder, 
  ApiOrderDtail, 
  ApiOrderInfos, 
  ApiRecieveOrder,
  ApiAccount, 
  ApiAccountSend,
  ApiUnSettlement, 
  ApiAccountAmount, 
  ApiAccountWithdraw, 
  } from "../../api/utils";
import {cloneObj} from "../../lib/utils";

//mutationsTypes
const ORDER = 'ORDER';
const ORDERDTAIL = 'ORDERDTAIL';
const ORDERINFOS = 'ORDERINFOS';
const RECIEVEORDER = 'RECIEVEORDER';
const ACCOUNT = 'ACCOUNT';
const ACCOUNTSEND = 'ACCOUNTSEND';
const UNSETTLEMENT = 'UNSETTLEMENT'
const ACCOUNTAMOUNT = 'ACCOUNTAMOUNT';
const ACCOUNTWITHDRAW = 'ACCOUNTWITHDRAW';
const state = {
  order: [],        //订单列表
  orderDtail: {}, //订单详情
  orderInfos: {},  //查看订单
  recieveOrder: {},  //接受订单
  account: {}, //获取支付宝账户
  accountSend: {}, //发送短信
  unSettlement: {},   //待结算金额
  accountAmount: {},   //待结算金额
  accountWithdraw: {},   //待结算金额
};

const getters = {
  getOrder(state) {
    return state.order;
  },
  getOrderDtail(state) {
    return state.orderDtail;
  },
  getOrderInfos(state) {
    return state.orderInfos;
  },
  getRecieveOrder(state) {
    return state.recieveOrder;
  },
  getAccount(state) {
    return state.account;
  },
  getAccountSend(state) {
    return state.accountSend;
  },
  getunSettlement(state) {
    return state.unSettlement;
  },
  getAccountAmount(state) {
    return state.accountAmount;
  },
  getAccountWithdraw(state) {
    return state.accountWithdraw;
  },
};

const actions = {
  actionOrder({commit,state},params) {
    ApiOrder(params.data).then(res=>{ 
    // console.log(params)      
      if(res.data.code === 200){
        params.order = res.data.data;
        commit(ORDER,params);
        // console.log(params);
      }
    });
  },
  actionOrderDtail({commit,state}, params) {
    ApiOrderDtail(params).then(res=>{ 
        //   console.log(res.data)
        //   console.log(params)
        if(res.data.code === 200){
            params.orderDtail = res.data.data;
            commit(ORDERDTAIL,params);
        }
    });
  },
  actionOrderInfos({commit,state}, params) {
    ApiOrderInfos(params).then(res=>{ 
        //   console.log(res.data.code)
        //   console.log(params)
        if(res.data.code === 200){
            params.orderInfos = res.data.data;
            commit(ORDERINFOS,params);
        }else if(res.data.code === -1){
            window.history.go(-1);
        }
    });
  },
  actionRecieveOrder({commit,state}, params) {
    ApiRecieveOrder(params).then(res=>{ 
        //   console.log(res.data)
        //   console.log(params)
        if(res.data.code === 200){
            params.recieveOrder = res.data.data;
            commit(RECIEVEORDER,params);
        }
    });
  },
  actionAccount({commit,state}, params) {
    ApiAccount(params).then(res=>{ 
          // console.log(res)
        //   console.log(params)
        if(res.data.code === 200){
            params.account = res.data.data;
            commit(ACCOUNT,params);
        }
    });
  },
  actionAccountSend({commit,state}, params) {
    ApiAccountSend(params).then(res=>{ 
          console.log(res.data)
        //   console.log(params)
        if(res.data.code === 200){
            params.accountSend = res.data;
            commit(ACCOUNTSEND,params);
        }
    });
  },
  actionunSettlement({commit,state}, params) {
    ApiUnSettlement(params).then(res=>{ 
        if(res.data.code === 200){
            params.recieveOrder = res.data.data;
            commit(UNSETTLEMENT,params);
        }
    });
  },
  actionAccountAmount({commit,state}, params) {
    ApiAccountAmount(params).then(res=>{ 
        //   console.log(params)
        if (Object.getOwnPropertyNames(res.data.data) == 0) {
          res.data.data = {availableAmount: 0, delayAmount: 0}
        }
        params.accountAmount = res.data.data;
        commit(ACCOUNTAMOUNT,params);
    });
  },
  actionAccountWithdraw({commit,state}, params) {
    ApiAccountWithdraw(params).then(res=>{ 
          // console.log(res)
        //   console.log(params)
        if(res.data.code === 200){
            params.accountWithdraw = res.data.data;
            commit(ACCOUNTWITHDRAW,params);
        }else{
          // console.log(res.data.msg)
          params.accountWithdraw = res.data.msg
          commit(ACCOUNTWITHDRAW,params)
          params.callback ? params.callback(params.accountWithdraw): params;
        }
    });
  },
};

const mutations = {
  [ORDER](state, params) {
    // console.log(params)
    // console.log(params.order.page)
    // console.log(parseInt(params.order.page) === 1)
    if(parseInt(params.page) === 1){
      state.order = params.order.orders;
    }else{
      for (let i=0; i< params.order.orders.length; i++){
        state.order.push(params.order.orders[i]);
      }
    }
    // console.log(state)
    params.callback ? params.callback(params.order.orders): params;
  },
  [ORDERDTAIL](state, params) {
    // console.log(state)
    state.orderDtail = params.orderDtail;
    
    params.callback ? params.callback(): params;
  },
  [ORDERINFOS](state, params) {
    // console.log(state)
    state.orderInfos = params.orderInfos;
    
    params.callback ? params.callback(): params;
  },
  [RECIEVEORDER](state, params) {
    // console.log(state)
    state.recieveOrder = params.recieveOrder;
    
    params.callback ? params.callback(): params;
  },
  [ACCOUNT](state, params) {
    // console.log(state)
    state.account = params.account;
    
    params.callback ? params.callback(): params;
  },
  [ACCOUNTSEND](state, params) {
    // console.log(state)
    state.accountSend = params.accountSend;
    
    params.callback ? params.callback(): params;
  },
  [ACCOUNTAMOUNT](state, params) {
    // console.log(state)
    state.accountAmount = params.accountAmount;
    
    params.callback ? params.callback(): params;
  },
  [ACCOUNTWITHDRAW](state, params) {
    // console.log(state)
    state.accountWithdraw = params.accountWithdraw;
    
    params.callback ? params.callback(): params;
  },
  [UNSETTLEMENT](state, params){
    state.unSettlement = params.recieveOrder
  },
};


export default {
  state,
  getters,
  actions,
  mutations
}
