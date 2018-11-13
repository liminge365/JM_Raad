import {
  ApiUnPublish,
  ApiAjaxlist,
  ApiTimingPublish,
  ApiTimingPublishCancel,
  ApiAjaxDetailData,
  ApiMobileAjaxCountData,
  ApiRankContent,
  ApiRankArticle,
  ApiCorpusList,
  ApiCenterData,
  ApiAjaxSingleCount,
  ApifindMaterialOrCorpus
} from "../../api/utils";


//mutationsTypes
const UN_PUBLISH_MATERIALS = 'UN_PUBLISH_MATERIALS';
const UN_AJAX_LIST = 'UN_AJAX_LIST';
const TIMING_PUBLISH_MATERIALS = 'TIMING_PUBLISH_MATERIALS';
const TIMING_PUBLISH_MATERIALS_CANCEL = 'TIMING_PUBLISH_MATERIALS_CANCEL';
const MOBILE_AJAX_DETAIL_DATA = 'MOBILE_AJAX_DETAIL_DATA'

const SORT_CONTENT = 'SORT_CONTENT';
const SORT_CORPUS = 'SORT_CORPUS';

const AJAX_DETAIL_DATA = 'AJAX_DETAIL_DATA';

const AJAX_CORPUS_LIST = 'AJAX_CORPUS_LIST';
const CENTER_DATA = 'CENTER_DATA';
const AJAX_SINGLE_COUNT = 'AJAX_SINGLE_COUNT';
const FIND_MATERIALR = 'FIND_MATERIALR';
const state = {
  ajaxListCount:0,
  ajaxList:[],
  ajaxListPageSize:0,
  mobileAjaxCountData:{},
  counts:0,   //待发布文章数
  materials:[],  //待发布文章列表
  timing_material:{}, //定时发布文章数据
  sort_content:[],  //文章排行
  sort_corpus:[],   //文章排行分类
  corpus_list:[],  //数据分析单篇数据
  ajaxDetailData:{},
  centerData:{},
  ajaxCountData:{},
  findMaterialOrCorpus:{}
};

const getters = {
  getCounts(state){
    return state.counts;
  },
  getMaterials(state){
    return state.materials;
  },
  getAjaxList(state){
    return state.ajaxList;
  },
  getAjaxListCount(state){
    return state.ajaxListCount;
  },
  getAjaxListPageSize(state){
    return state.ajaxListPageSize
  },
  getMobileAjaxCountData(state){
    return state.mobileAjaxCountData
  },
  getTimingMaterials(state){
    return state.timing_material;

  },
  getSortContent(state){
    return state.sort_content;
  },
  getSortCorpus(state){
    return state.sort_corpus;

  },
  getAjaxDetailData(state) {
    return state.ajaxDetailData
  },
  getCorpus(state){
    return state.corpus_list
  },
  getApiCenterData(state){
    return state.centerData
  },
  getAjaxCountData(state){
    return state.ajaxCountData
  },
  getFindMaterialOrCorpus(state){
    return state.findMaterialOrCorpus
  }
};

const actions = {
  actionAjaxMaterials({commit,state},params){
    ApiUnPublish(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(UN_PUBLISH_MATERIALS,params);
      }
    })
  },
  actionApiAjaxlist({commit,state},params){
     ApiAjaxlist(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(UN_AJAX_LIST,params);
      }
    })
  },
  actionAjaxTimingMaterials({commit,state},params){
    ApiTimingPublish(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(TIMING_PUBLISH_MATERIALS,params);
      }
    })
  },
  actionAjaxTimingMaterialsCancel({commit,state},params){
    ApiTimingPublishCancel(params.data).then(res=>{
      if(res.data.code === 200){
        commit(TIMING_PUBLISH_MATERIALS_CANCEL,params);
      }
    })
  },
  acitonAjaxSortContent({commit,state},params){
    ApiRankContent(params).then(res => {
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(SORT_CONTENT,params);
      }
    })
  },
  actionAjaxSortCorpus({commit,state},params){
    ApiRankArticle(params.data).then(res =>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(SORT_CORPUS,params);
      }
    })
  },
  actionApiAjaxDetailData({commit,state},params){
    ApiAjaxDetailData(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(AJAX_DETAIL_DATA,params);
      }
    })
  },
  actionApiMobileAjaxCountData({commit,state},params){
    ApiMobileAjaxCountData(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(MOBILE_AJAX_DETAIL_DATA,params);
      }
    })
  },
  actionApiMobileAjaxCorpusList({commit,state},params){
    ApiCorpusList(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(AJAX_CORPUS_LIST,params);
      }
    })
  },
  actionApiCenterData({commit,state},params){
    ApiCenterData(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(CENTER_DATA,params);
      }
    })
  },
  actionApiAjaxSingleCount({commit,state},params){
    ApiAjaxSingleCount(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data;
        commit(AJAX_SINGLE_COUNT,params);
      }
    })
  },
  actionFindMaterialOrCorpus({commit,state},params){
   ApifindMaterialOrCorpus(params.data).then(res=>{
      if(res.data.code === 200){
        params.data = res.data.data.articleContent;
        commit(FIND_MATERIALR,params);
      }
    })
  } 
};
const mutations = {
  [UN_PUBLISH_MATERIALS](state,params){
    if(parseInt(params.page) === 1){
      state.materials = params.data.materials;
    }else{
      for (let i=0; i< params.data.materials.length; i++){
        state.materials.push(params.data.materials[i]);
      }
    }
    state.counts = params.data.counts;
    params.callback ? params.callback(params.data.materials): params;

  },
  [UN_AJAX_LIST](state,params){
    if(parseInt(params.page) === 1){
      state.ajaxList = params.data.corpus
    }else{
      for (let i=0; i< params.data.corpus.length; i++){
        state.ajaxList.push(params.data.corpus[i]);
      }
    }
    state.ajaxListPageSize = params.data.pagesize
    state.ajaxListCount = params.data.count;

  },
  [TIMING_PUBLISH_MATERIALS](state,params){
    if(parseInt(params.page) === 1){
      state.timing_material = params.data;
    }else{
      for (let i=0; i< params.data.rows.length; i++){
        state.timing_material.rows.push(params.data.rows[i]);
      }
    }
    params.callback ? params.callback(params.data.rows): params;

  },
  [TIMING_PUBLISH_MATERIALS_CANCEL](state,params){
    let rows = state.timing_material.rows;
    for (let i=0; i< rows.length; i++){
      if(rows[i].id === params.id){
        state.timing_material.rows.splice(i,1);

        if( parseInt(state.timing_material.total) > 0){
          state.timing_material.total = state.timing_material.total - 1;

        }
      }

    }
  },
  [SORT_CORPUS](state,params){
    state.sort_corpus = params.data;
    params.callback ? params.callback(params.data): params;
  },
  [SORT_CONTENT](state,params){
    state.sort_content = params.data;
    params.callback ? params.callback(params.data): params;

  },
  [AJAX_DETAIL_DATA](state,params){
    state.ajaxDetailData = params.data;
    params.callback ? params.callback(params.data): params;
  },
  [MOBILE_AJAX_DETAIL_DATA](state,params){
    state.mobileAjaxCountData = params.data;
  },
  [AJAX_CORPUS_LIST](state,params){
    state.corpus_list = params.data;
    params.callback ? params.callback(): params;
  },
  [CENTER_DATA](state,params){
    state.centerData = params.data;
    params.callback ? params.callback(params.data): params;
  },
  [AJAX_SINGLE_COUNT](state,params){
    state.ajaxCountData = params.data;
  },
  [FIND_MATERIALR](state,params){
    state.findMaterialOrCorpus = params.data;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
