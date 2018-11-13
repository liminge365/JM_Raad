import service from './ajax'
import * as types from './quantity'

export const content = () => {
  return service.ajaxReuqest(service.url + types.CONTRNT, {}, 'GET')
};
//分类文章列表
export const ApiCategoryArticleList = (params) => {
  return service.ajaxReuqest(service.url + types.CATEGORY_ARTICLE_LIST_URL,params, 'GET');
};
//他的首页
export const getReadAccountinfo = (params) => {
  return service.ajaxReuqest(service.url + types.READACCOUNTINFO, params, 'GET')
};

//获取账号平台分类
export const getAccountBindLoad = () => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_BIND__URL, {}, 'POST')
};
//获取账号组
export const ApiAccountListGroup = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_GROUP, params, 'POST')
};
//获取帐号列表
export const ApiAccountListData = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_DATA, params, 'POST')
};
//移除账号
export const ApiAccountListRemove = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_REMOVE, params, 'POST')
};
//删除账号
export const ApiAccountListDel = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_DEL, params, 'POST')
};
//刷新账号
export const getAccountListMobilereset = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_MOBILERESET, params, 'POST')
};
//获取自定义账号组
export const ApiAccountListAccountgroup = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_ACCOUNTGROUP, params, 'POST')
};
//账号设置账号组
export const ApiAccountListUpacgroup = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_UPACGROUP, params, 'POST')
};
//修改/增加账号组
export const ApiAccountListAddgroup = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_LIST_ADDGROUP, params, 'POST')
};
//获取单个账号平台
export const getAccountSingleType = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_SINGLE_TYPE, params, 'POST')
};
//获取需要修改的账号信息 
export const getUpdateAccount = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT_GET_UPDATE, params, 'POST')
};
//账号添加 
export const addAccount = (params) =>{
  return service.ajaxReuqest(service.url + types.ACCOUNT_ADD, params, 'POST')
};
//账号修改 
export const updateAccount = (params) =>{
  return service.ajaxReuqest(service.url + types.ACCOUNT_UPDATE, params, 'POST')
}




//文章详情
export const ApiArticleDetail = (params) => {
  return service.ajaxReuqest(service.url + types.ARTICLE_DETAIL_URL, params, 'GET');
};

//登陆
export const mobileLogin = (params) => {
  return service.ajaxReuqest(service.url + types.LOGIN, params , 'POST', 'true');
};

//获取短信验证码
export const mobileyzm = (params) => {
  return service.ajaxReuqest(service.url + types.GETYZM, params , 'GET', 'false');
};

//注册
export const mobileregister = (params) => {
  return service.ajaxReuqest(service.url + types.REGISTR, params , 'POST', 'true');
};

//忘记密码,获取短信验证码
export const forgetinfoyzm = (params) => {
  return service.ajaxReuqest(service.url + types.FORGETINFOYZM, params , 'GET', 'false');
};

//忘记密码,提交
export const forgetsubmit = (params) => {
  return service.ajaxReuqest(service.url + types.FORGETSUBMIT, params , 'POST', 'true');
};

//修改密码
export const updatepwd = (params) => {
  return service.ajaxReuqest(service.url + types.UPDATEPWD, params , 'POST', 'true');
};

//文章详情登录
export const articleLogin = (params) => {
  return service.ajaxReuqest(service.url + types.ARTICLELOGIN, params , 'POST', 'true');
};

//退出登录
export const quitLogin = (params) => {
  return service.ajaxReuqest(service.url + types.QUITLOGIN, params , 'GET');
};


//文章分类
export const ApiCategoryList = (params) => {
  return service.ajaxReuqest(service.url + types.CATEGORY_LIST_URL,params, 'GET');
};

//文章详情页重定向
export const DetailRightUrl = (params) =>{
  return service.ajaxReuqest(service.url + types.DETAIL_RIGHT_URL,params, 'GET');
};

//文章广告获取
export const GetContentAdvert = (params) =>{
  return service.ajaxReuqest(service.url + types.CONTENT_ADVERT_URL,params,'GET')
};
//广告资质查看
export const GetContentAdvertToken = (params) =>{
  return service.ajaxReuqest(service.url + types.CONTENT_ADVERT_TOKEN_URL,params,'GET')
};

//广告log
export const AddAdvertLog = (params) =>{
  return service.ajaxReuqest(service.url + types.ADVERT_LOG_URL,params,'GET')
};

//微信分享
export const WXShareInit = (params) =>{
  return service.ajaxReuqest(service.url + types.WEIXIN_SHARE,params,'GET')
};

//Home用户信息
export const ApiMobileHome = (params) => {
  return service.ajaxReuqest(service.url + types.HOME, params, 'GET')
};

//the account info in Home Page(such as account numbers..)
export const ApiMobileHomeAccount = (params) => {
  return service.ajaxReuqest(service.url + types.HOMEACCOUNT, params , 'GET')
};

//昨日阅读
export const ApiMobileReadCount = () => {
  return service.ajaxReuqest(service.url + types.AJAX_REDA_COUNT,{},'GET');
};

//订单
export const ApiOrder = (params) => {
  return service.ajaxReuqest(service.url + types.ORDER, params, 'POST', 'true')
};
export const ApiOrderDtail = (params) => {
  return service.ajaxReuqest(service.url + types.ORDERDETAIL, params, 'POST', 'true')
};
export const ApiOrderInfos = (params) => {
  return service.ajaxReuqest(service.url + types.ORDERDINFOS, params, 'POST', 'true')
};
export const ApiRecieveOrder = (params) => {
  return service.ajaxReuqest(service.url + types.RECIEVEORDER, params, 'POST', 'true')
};

//账户提现
export const ApiAccount = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNT, params, 'POST', 'true')
};

export const ApiAccountSend = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNTSEND, params, 'POST', 'true')
};

export const ApiAccountAmount = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNTAMOUNT, params, 'POST', 'true')
};

export const ApiUnSettlement = (params) => {
  return service.ajaxReuqest(service.url + types.UNSETTLEMENT, params, 'POST', 'true')
};ApiUnSettlement

//提现
export const ApiAccountWithdraw = (params) => {
  return service.ajaxReuqest(service.url + types.ACCOUNTWITHDRAW, params, 'POST', 'true')
};
//收支详情
export const availableList = (params) => {
  return service.ajaxReuqest(service.url + types.AVAILABLELIST, params, 'POST')
};

export const ApiAvailableDetail = (params) => {
  return service.ajaxReuqest(service.url + types.AVAILABLEDETAIL, params, 'POST', 'true')
};

export const ApiLedgerBillDetail = (params) => {
  return service.ajaxReuqest(service.url + types.LEDGERBILLDETAIL, params, 'POST', 'true')
};

//账户待结算余额
export const ApiUnSettlementUserAmount = (params) => {
  return service.ajaxReuqest(service.url + types.UNSETTLEMENT_USERAMOUNT, params, 'GET')
};

//待结算账户订单列表
export const ApiUnSettlementOrderList = (params) => {
  return service.ajaxReuqest(service.url + types.UNSETTLEMENT_LIST, params, 'GET')
};

//提现记录
export const ApiWithdrawList = (params) => {
  return service.ajaxReuqest(service.url + types.WITHDRAWLIST, params, 'POST')
};

//账户待结算详情
export const ApiUnSettlementDetail = (params) => {
  return service.ajaxReuqest(service.url + types.UNSETTLEMENT_DETAIL, params, 'GET')
};

//账户待结算流水
export const ApiUnSettlementSubList = (params) =>{
  return service.ajaxReuqest(service.url + types.UNSETTLEMENT_SUBLIST, params, 'GET')
};

//未发布文章
export const ApiUnPublish = (params) => {
  return service.ajaxReuqest(service.url + types.PUBLISH, params, 'POST');
};

//已发布文章
export const ApiAjaxlist = (params) => {
  return service.ajaxReuqest(service.url + types.AJAXLIST, params, 'POST');
};

//定时发布
export const ApiTimingPublish = (params) => {
  return service.ajaxReuqest(service.url + types.TIME_PUBLISH, params, 'POST');
};
//取消定时发布
export const ApiTimingPublishCancel = (params) => {
  return service.ajaxReuqest(service.url + types.TIME_PUBLISH_CANCEL, params, 'POST');
};

//文章排行版
export const ApiRankArticle = (params) => {
  return service.ajaxReuqest(service.url + types.RANK_ARTICLE, params, 'POST');
};
//文章排行版分类接口
export const ApiRankContent = (params) => {
  return service.ajaxReuqest(service.url + types.RANK_CONTENT, params, 'POST');
};


//整体数据 echarts
export const ApiAjaxDetailData = (params) => {
  return service.ajaxReuqest(service.url + types.AJAX_DETAIL_DATA, params, 'POST');
};

export const ApiMobileAjaxCountData = (params) => {
  return service.ajaxReuqest(service.url + types.MOBILE_AJAX_COUNT_DATA, params, 'POST');
};

//单篇数据 echarts   
export const ApiCenterData = (params) => {
  return service.ajaxReuqest(service.url + types.CRENTER_DATA, params, 'POST');
};

export const ApiAjaxSingleCount = (params) => {
  return service.ajaxReuqest(service.url + types.AJAX_SINGLE_COUNT, params, 'POST');
};

//数据分析页面单篇数据
export const ApiCorpusList = (params) => {
  return service.ajaxReuqest(service.url + types.AJAX_CORPUS_LIST, params, 'POST');
};

export const ApifindMaterialOrCorpus = (params) => {
  return service.ajaxReuqest(service.url + types.FIND_MATERIALR, params, 'POST');
};

//卡劵类分享 
export const GetAllCard = ()=>{
  return service.ajaxReuqest(service.url+types.SHARE_ALL_CARD,{},'POST');
}
export const GetCardMessage =(params)=>{
  return service.ajaxReuqest(service.url+types.SHARE_CARD_MESSAGE,params,'POST','true');
}
export const GetCardStateMessage=(params)=>{
  return service.ajaxReuqest(service.url+types.CARD_USE_MESSAGE,params,'POST','true');
}
export const GetHomeActivity=(params)=>{
  return service.ajaxReuqest(service.url+types.HOME_ACTIVITY,params,'POST','true');
}
export const GetNewALLCard=()=>{
  return service.ajaxReuqest(service.url+types.SHARE_ALL_NEW_CARD,{},'POST');
}
export const GetCardCount=()=>{
  return service.ajaxReuqest(service.url+types.CARD_COUNT,{},'POST');
}



