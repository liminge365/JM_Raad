<template>
  <div class="publish">
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :autoFill=false
      ref="loadmore"
      class="loadmore">

        <div class="search">
          <input type="text" placeholder="请输入关键字" id="keyword">
          <button @click="searchClick">搜索</button>
        </div>
        <div class="publish-con" v-if="getCounts != 0">
          <div class="publish-title">
            <div class="article">
              <i class='iconfont icon-paper'></i>
              <span>共<b>{{getCounts}}</b>篇文章</span>
            </div>
          </div>
          <!--<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">-->
          <div class="publish-list">
            <dl v-for="item in getMaterials">
              <dt>
                <img v-if='!item.img' src="/static/image/home/userhead_big.png" alt=""/>
                <img v-else :src="item.img" alt="">
              </dt>
              <dd @click='routerPage(item.id)'>{{item.title}}</dd>
            </dl>
          </div>

          <!--</div>-->

        </div>
        <div v-else class="noDataBox">
          <Nodate></Nodate>
        </div>
    </mt-loadmore>
    <!--<transition-group name="fade">
      <div class="dialog" v-show="isShow" key='0'>
        <div class="dialog-body">
          <div class="dialog-top">
            <span>内容发布</span>
            <i class='iconfont icon-bt_quxiao_b' @click='remove'></i>
          </div>
          <div class="dialog-content">
            <div class='select' @click='fenleiclick'>
              文章分类
              <span><b>科技</b><i class='iconfont icon-xiayibu'></i></span>
            </div>
            <div class='select'>
              文章封面
              <span class='setHeight'><img src="/static/image/home/v.png" alt=""><i
                class='iconfont icon-xiayibu'></i></span>
            </div>
            <div class='select' @click='zahaoclick'>
              发布账号
              <span><b>45</b><i class='iconfont icon-xiayibu'></i></span>
            </div>
            <div class='select'>
              设置定时
              <span><b>2018-04-20 10:20</b><i class='iconfont icon-xiayibu'></i></span>
            </div>
          </div>
          <div class="dialog-article">
            <h2>排量大耗油小，这两款车或许与你印象中美系车有些不同。</h2>
            <p>排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小排量大耗油小</p>
          </div>
          <router-link to='/s/content/bind2'>
            <p class='pbtn'>发布</p>
          </router-link>
          <div class="tip">请设置文章分类后在发布</div>
        </div>
      </div>
      <div class="dialog" v-show="fenlei" key='1'>
        <div class="dialog-body">
          <div class="dialog-top">
            <span>文章分类</span>
            <i class='iconfont icon-bt_quxiao_b' @click='remove'></i>
          </div>
          <ul class="dialog-list">
            <li class='leithis'>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
            <li>科技</li>
          </ul>
          <p class='true'>确定</p>
        </div>
      </div>
      <div class="dialog" v-show="zahao" key='2'>
        <div class="dialog-body">
          <div class="dialog-top">
            <span>设置账号</span>
            <i class='iconfont icon-bt_quxiao_b'></i>
          </div>
          <div class='dialog-zahao'>
            <router-link to='/s/accounts'>
              <div class="zahao-top">
                设置发布账号
              </div>
            </router-link>
            <div class="zahao-list">
              <p>
                <span><img src="/static/image/accountmsg/wechat.png" alt=""><b class='within-name'>微信名称</b></span>
                <span class='within-btn'><button class='btnactive'>广告</button><button>原创</button></span>
              </p>
              <p>
                <span><img src="/static/image/accountmsg/wechat.png" alt=""><b class='within-name'>微信名称</b></span>
                <span class='within-btn'><button class='btnactive'>广告</button><button>原创</button></span>
              </p>
              <p>
                <span><img src="/static/image/accountmsg/wechat.png" alt=""><b class='within-name'>微信名称</b></span>
                <span class='within-btn'><button class='btnactive'>广告</button><button>原创</button></span>
              </p>
              <p>
                <span><img src="/static/image/accountmsg/wechat.png" alt=""><b class='within-name'>微信名称</b></span>
                <span class='within-btn'><button class='btnactive'>广告</button><button>原创</button></span>
              </p>
            </div>
          </div>
          <p class='true'>发布</p>
        </div>
      </div>
    </transition-group>-->
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import Nodate from '@/components/Common/Nodate.vue'

  export default {
    name: 'bind1',
    data() {
      return {
        isShow: false,
        fenlei: false,
        zahao: false,
        keyword: '',
        page: 1,
        allLoaded: false,
      }
    },
    methods: {
      routerPage(id){
        this.$router.push({name:'articleDetails',params:{id:id}})
      },
      remove() {
        this.isShow = false;
        this.fenlei = false
      },
      zahaoclick() {
        this.isShow = false;
        this.zahao = true
      },
      fenleiclick() {
        this.isShow = false;
        this.fenlei = true
      },
      searchClick() {
        this.keyword = document.getElementById("keyword").value;
        this.allLoaded = false;
        this.page = 1;
        let queryData = {
          'page': this.page,
          'keyword': this.keyword
        };
        let params = {data: this.qs.stringify(queryData), page: this.page};
        this.$store.dispatch('actionAjaxMaterials', params);
      },
      loadBottom() {
        let self = this;
        this.page += 1;
        let queryData = {
          'page': this.page,
          'keyword': this.keyword
        };
        let params = {data: this.qs.stringify(queryData), page: this.page};
        params.callback= function(orders){
          // console.log(orders)
          if(orders.length === 0){
            self.allLoaded = true;// 若数据已全部获取完毕
          }
          self.$refs.loadmore.onBottomLoaded();
        };
        this.$store.dispatch('actionAjaxMaterials', params);

      },

    },
    components: {
      Nodate
    },
    computed: {
      ...mapGetters([
        'getCounts',
        'getMaterials'
      ])
    },
    created() {

      let da = {'page': this.page, 'keyword': this.keyword};
      let params = {data: this.qs.stringify(da), 'page': this.page};
      params.callback = function () {
      };
      this.$store.dispatch('actionAjaxMaterials', params);
    },

  }
</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';

  .publish {
    padding: .1rem .2rem;
    box-sizing: border-box;
    .noDataBox {
      background-color: #fff;
      border-radius: 5px;
      margin-top: 10px;
    }
    .search {
      .display-flex();
      .align-item();
      .space-between();
      height: .35rem;
      input {
        .input();
      }
      button {
        .button();
      }
    }
    .publish-con {
      padding: .1rem .2rem;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 5px;
      margin-top: .1rem;
      margin-bottom: .1rem;
      .publish-title {
        .display-flex();
        .align-item();
        .space-between();
        color: @blue-text-color;
        border-bottom: 1px solid @gray-border-color;
        padding-bottom: 10px;
        padding-top: 5px;
        font-weight: 800;
        .article {
          font-size: .14rem;
          b {
            color: @primary-color;
            padding-left: 2px;
            padding-right: 2px;
          }
        }
        .setTime {
          color: @primary-color;
          cursor: pointer;
          i {
            font-size: 12px;
          }
        }
      }
      .publish-list {
        dl {
          .display-flex();
          .align-item();
          margin-top: .12rem;
          dt {
            width: 20%;
            text-align: center;
            img {
              width: 46px;
              height: 46px;
            }
          }
          dd {
            width: 70%;
            margin-left: 5%;
            word-break: break-all;
            color: @blue-text-color;
            font-weight: 800;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            cursor: pointer;
          }
        }
      }
    }
  }

  .dialog {
    .dialog();
    .dialog-body {
      .dialog-body();
      .dialog-top {
        font-size: .14rem;
        color: @blue-text-color;
        position: relative;
        margin-bottom: 10px;
        i {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      .dialog-content {
        padding-left: .1rem;
        padding-right: .1rem;
        box-sizing: border-box;
        .select {
          color: #9ea6a6;
          padding-bottom: .1rem;
          padding-top: .1rem;
          box-sizing: border-box;
          border-bottom: 1px solid @gray-border-color;
          position: relative;
          span {
            position: absolute;
            right: 0;
            top: 10px;
            color: @primary-color;
            .display-flex();
            .align-item();
            b {
              font-weight: 400;
              padding-right: 10px;
            }
            img {
              margin-right: 10px;
              width: 40px;
              height: 24px;
            }
            i {
              font-size: .12rem;
            }
          }
          .setHeight {
            top: 6px;
          }
        }
      }
      .dialog-article {
        padding-left: .1rem;
        padding-right: .1rem;
        box-sizing: border-box;
        h2 {
          font-size: 14px;
          margin-top: 10px;
          color: #505050;
        }
        p {
          margin-top: 2px;
          color: #8a8a8a;
        }
      }
      .pbtn {
        .btnp();
        height: .36rem;
        line-height: .36rem;
        margin-top: 10px;
      }
      .true {
        .btnp();
        height: .36rem;
        line-height: .36rem;
        margin-top: 10px;
      }
      .tip {
        color: #b13c3f;
        text-align: center;
        margin-top: 2px;
      }
      .dialog-list {
        .display-flex();
        .flex-wrap();
        padding-top: 10px;
        padding-bottom: 15px;
        li {
          width: 22%;
          height: .32rem;
          line-height: .32rem;
          text-align: center;
          font-size: 14px;
          color: #7b8081;
          border: 1px solid @gray-border-color;
          background-color: #fcfcfc;
          border-radius: 2px;
          margin-left: 1%;
          margin-right: 1%;
          margin-top: 5px;
        }
        .leithis {
          color: #fff;
          background-color: @primary-color;
        }
      }
      .dialog-zahao {
        margin-bottom: 27px;
        .zahao-top {
          color: @primary-color;
          border-top: 1px solid @gray-border-color;
          border-bottom: 1px solid @gray-border-color;
          padding: 10px 0;
          text-align: center;
          cursor: pointer;
        }
        .zahao-list {
          p {
            position: relative;
            margin-top: 14px;
            span {
              .display-flex();
              .align-item();
              .within-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 65px;
                color: @blue-text-color;
              }
              img {
                width: 26px;
                height: 26px;
                margin-left: 5px;
                margin-right: 5px;
              }
            }
            .within-btn {
              position: absolute;
              right: 0;
              top: 0;
              .display-flex();
              button {
                outline: none;
                border: 0;
                border: 1px solid #d0d3d2;
                background-color: #fff;
                border-radius: 4px;
                width: .59rem;
                height: .29rem;
                line-height: .29rem;
                text-align: center;
                color: #797F7D;
                font-size: 12px;
                margin-left: 14px;
                font-family: "Microsoft YaHei";
              }
              .btnactive {
                background-color: #24B1E7 !important;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>

