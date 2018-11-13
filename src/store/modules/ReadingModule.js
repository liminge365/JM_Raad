import {ApiCategoryArticleList,ApiArticleDetail,ApiCategoryList,GetContentAdvert} from "../../api/utils";
import {cloneObj} from "../../lib/utils";
let _u = require("underscore");
//import {CATEGORY_ARTICLE_LIST} from "../mutationsTypes";

//mutationsTypes
const CATEGORY_ARTICLE_LIST = 'CATEGORY_ARTICLE_LIST';
const ARTICLE_DETAIL = 'ARTICLE_DETAIL';
const CATEGORY_LIST = 'CATEGORY_LIST';
const CONTENT_ADVERT_GET = 'CONTENT_ADVERT_GET';

const state = {
  categoryArticleList: [],        //分类文章
  articleDetail: {},              //文章详情
  categoryList: [],               //文章分类
  contentAdvert:{}
};

const getters = {
  getCategoryArticleList(state) {
    return state.categoryArticleList;
  },
  getArticleDetail(state) {
    return state.articleDetail;
  },
  getCategoryList(state) {
    return state.categoryList;
  },
  getContentAdvert(state) {
    return state.contentAdvert;
  }
};

const actions = {
  actionCategoryArticleList({commit,state},params) {
    ApiCategoryArticleList(cloneObj(params)).then(res=>{
      if(res.data.code === 200){
        params.list = res.data.data.contentBeans;
        commit(CATEGORY_ARTICLE_LIST,params);
      }
    });
  },
  actionArticleDetail({commit,state},params) {
    ApiArticleDetail(cloneObj(params)).then(res=>{
      if(res.data.code === 200){
        params.detail = res.data.data;
        commit(ARTICLE_DETAIL,params);
      }
    });
  },
  actionCategoryList({commit,state},params) {
    ApiCategoryList(cloneObj(params)).then(res=>{
      // console.log(res.data);
      if(res.data.code === 200){
        params.list = res.data.data;
        commit(CATEGORY_LIST,params);
      }
    });
  },
  actionContentAdvert({commit,state},params) {
      GetContentAdvert(cloneObj(params)).then(res=>{
        if(res.data.code===200){
          params.advert = res.data.data[0];
          commit(CONTENT_ADVERT_GET,params);
        }
      })
  }
};

const mutations = {
  [CATEGORY_ARTICLE_LIST](state, params) {
    if(params.pageNum === 1){
      state.categoryArticleList = params.list;
    }else{
      _u.each(params.list,function (item,index){
        state.categoryArticleList.push(item);
      });
    }
    params.callback ? params.callback(params.list): params;
  },
  [ARTICLE_DETAIL](state, params) {
    state.articleDetail = params.detail;
    params.callback ? params.callback(): params;
  },
  [CATEGORY_LIST](state, params) {
    state.categoryList = params.list;
    params.callback ? params.callback(): params;
  },
  [CONTENT_ADVERT_GET](state, params){
    params.callback ? params.callback(): params;
    state.contentAdvert = params.advert;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
