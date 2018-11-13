<template>
  <div class="main" >
    <div class="alertProfit"></div>
    <mt-loadmore
      v-if="toggleShow === 'Reading'"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :autoFill = false
      ref="loadmore"
      class="loadmore">
      <div class="listcont" v-for="(item,index) in getCategoryArticleList" :key="index" >
        <router-link 
        :to="{name:'readDtail',params:{corpusId:item.corpusId,curId:0,preId:0}}"
         @click.native='statistics'
         class="l_top_box">
          <!-- <a :href="'/readDtail/'+item.corpusId+'/0/0'"  class="l_top_box"> -->
          <div class="l_topimg" v-if="item.cover !== '0'">
            <div class="topimg_img" ><img :src="item.cover" alt=""></div>
            <a href="#" class="topimg_p" style="top:70%;">{{item.title}}</a>
          </div>
          <div class="l_topimg" v-if="item.cover == '0'">
            <a href="#" class="topimg_p" >{{item.title}}</a>
          </div>
          <p class="l_box_p" v-html="item.content"></p>
          <!-- </a> -->
        </router-link>
        <div class="l_box">
          <div class="l_count">
                <span class="l_left" v-if='item.readCount'>
                    阅读<span class="l_num">{{item.readCount}}</span>
                </span>
                
               <span class="l_right">
                    <b>{{item.time}}</b>
                </span>
                <span class="l_content" v-if="item.advert == 2 || item.advert == 3">
                  <i class="iconfont icon-shouyi1" v-if="item.advert == 2 || item.advert == 3" @click="fnAlertProfit(writeZ1)"></i>
                  <i class="iconfont icon-shouyi"  v-if="item.advert == 3" @click="fnAlertProfit(writeZ2)"></i>
                </span>
                <span class="l_content_nob" v-if="item.advert == 1"></span>
          </div>
          <div class="l_user" v-if="mineId != -2">
            <div class="userimg">
              <a>
                <img v-if='item.avatar != 0' :src="item.avatar" alt="">
                <img v-else src="/static/image/home/userhead_big.png" alt="">
              </a>
              <a v-if='item.name' class="username">{{item.name}}</a>
              <a v-else class="username">简媒用户</a>
            </div>
            <router-link :to="{path:'/readPersnal',query:{userId:item.uk}}" class="userbtn">TA的首页</router-link>
          </div>
        </div>
      </div>
      <div class="nodatebox" v-if="nodate === true" style=" background: #fff;border-radius: 5px;box-shadow: 0 0 2px 1px #EAEEF1; width:90%;margin-left:5%;">
        <Nodate></Nodate>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  // import cubeScroll from 'cube-scroll'
  import Vue from 'vue'
  import {Loadmore} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import Nodate from '@/components/Common/Nodate.vue'
  import {
    statistics
  } from '../../../plugins/statistics.js'
  Vue.component(Loadmore.name, Loadmore);
  export default {
    computed: {
      ...mapGetters([
        'getCategoryArticleList',
        'getAllNumber'
      ])
    },
    data() {
      return {
        toggleShow: '',//用哪个组件
        topStatus: '',//加载状态
        allLoaded: false,
        categoryId: -1,
        pageSize: 10,
        pageNum: 1,
        headhide: true,
        nodate: false,//暂无数据
        mineId: 0,
        writeZ1: '此篇文章已投放广告，作者享有收益',
        writeZ2: '此篇文章已投放广告，传播者也享有收益'
      }
    },
    watch: {
      '$route'(to,from){
          if(from.name == 'Reading'){
              this.getPath();
          }
      }
    },
    components:{
      Nodate
    },
    created(){
      this.toggleShow = this.$route.name;
      //是否显示头像+他的首页
      if(this.$route.name === 'readPersnal'){
        this.headhide = false;
      }
      let self = this;
      this.loadData(function(list){
        if(list.length === 0){
          self.nodate = true;
        }else{
          self.nodate = false;
        }
      });
    },

    updated(){
      let newreadnum = this.$store.state.Readnum;
      newreadnum ++
      this.$store.dispatch('actionsReadnum',newreadnum)
      this.mineId = this.$route.query.id
    },
    methods: {
      //收益展示
      fnAlertProfit(val){
        this.$('.alertProfit').text(val);
        this.$('.alertProfit').show();
        this.$('.alertProfit').fadeOut(4000);
      },
      //获取地址栏参数id
      statistics(){
        statistics();
      },
      getPath() {
        let pathTmp = this.$route.query.id === undefined ? '' : '?id='+this.$route.query.id;
        if (this.$route.fullPath === '/reading'+pathTmp) {
          this.pageNum = 1;
          this.allLoaded = false;
          let self = this;
          this.loadData(function (list) {
            if (list.length === 0) {
              self.nodate = true;
            } else {
              self.nodate = false;
            }
          });
        }
      },
      //加载状态
      handleTopChange(status) {
        this.topStatus = status;
      },
      //请求数据
      loadData(cb){
        //获取分类文章
        this.categoryId = this.$route.query.id === undefined ? -3 : this.$route.query.id;
        let userId = this.$route.query.userId === undefined ?'':this.$route.query.userId;

        let cal_params = {categoryId:this.categoryId,pageSize:this.pageSize,pageNum:this.pageNum,userId:userId};
        if(cb !== undefined){
          cal_params.callback = cb
        }
        this.$store.dispatch('actionCategoryArticleList',cal_params);
      },
      //下拉加载
      loadTop() {
        let self = this;
        this.pageNum = 1;
        this.loadData(
          function(list){
            // 加载更多数据
            self.$refs.loadmore.onTopLoaded();
          })
      },
      //上拉加载
      loadBottom: function () {
        let self = this;
        this.pageNum += 1;
        this.loadData(function(list){
          // 加载更多数据
          if(list.length ===0){
            self.allLoaded = true;// 若数据已全部获取完毕
          }
          self.$refs.loadmore.onBottomLoaded();
        });
      },
    },
  }
</script>
<style lang="less" scoped>
.alertProfit{
  width: 70%;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 14px;
  border-radius: .2rem;
  padding: 0 .2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: none;
  z-index: 999;
}

  .listcont {
    margin: 0 4%;
    margin-bottom: 25px;
    box-sizing: border-box;
    color: #595E62;
    background: #fff;
    border-radius: 5px;
    .l_top_box{
      .l_topimg {
        display: block;
        width: 100%;
        min-height: .7rem;
        max-height: 1.4rem;
        background: #29B0E7;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        position: relative;
        .topimg_img {
          height: 1.4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .topimg_p {
          width: 90%;
          font-size: 16px;
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          -webkit-line-clamp: 2;
          -moz-line-clamp: 2;
          -ms-line-clamp: 2;
          -line-clamp: 2;
          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          -ms-box-orient: vertical;
          -box-orient: vertical;
          display: -webkit-box;
          text-shadow:1px 1px 1px #000;
        }
      }
      .l_box_p {
        overflow: hidden;
        -webkit-line-clamp: 4;
        -moz-line-clamp: 4;
        -ms-line-clamp: 4;
        -line-clamp: 4;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-box-orient: vertical;
        -box-orient: vertical;
        display: -webkit-box;
        display: -webkit-box;
        width: 90%;
        margin: .15rem 5% 0;
      }

    }
    .l_box {
      padding: 5%;
      padding-top: 0;
      box-sizing: border-box;
      .l_count {
        height: .44rem;
        line-height: .44rem;
        .l_num {
          color: #29B0E7;
        }
        .l_content{
          margin-top: 7px;
          height: 30px;
          line-height: 30px;
          float: right;
          margin-right: 10px;
          border-right: 1px solid #E9E9E9;
          i{
            color: #FEA654;
            margin-right: 10px;
            font-size: 18px;
          }
        }
        .l_content_nob{
            border: none;
        }
        .l_right {
          float: right;
          b {
            font-weight: normal;
          }
        }
      }
      .l_user {
        height: .25rem;
        line-height: .25rem;
        padding-top: .1rem;
        border-top: 1px solid #E7E9E8;
        .userimg {
          display: block;
          display: flex;
          float: left;
          img {
            width: .25rem;
            height: .25rem;
            border-radius: 50%;
            margin-right: .1rem;
          }
          .username {
            width: 96px;
            white-space: nowrap;
            overflow: hidden;
            color: #595E62;
          }
        }
        .userbtn {
          display: block;
          float: right;
          background: #29B0E7;
          color: #fff;
          padding: 0 5px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
</style>

