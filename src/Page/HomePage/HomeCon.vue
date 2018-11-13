<template>
  <div class="HomeCon">
    <div class="home">
      <top-page title='首页' path='/s/page'></top-page>
      <div class="page">
        <div class='computer' @click='intoComputer'>进入电脑版</div>
        <div class="personalInfo">
          <div class="topImg">
            <img class="bglogo" src="/static/image/home/bghead.jpg" alt="">
            <img v-if='getUserInfo.avatar == null ' class="headportrait" src="/static/image/home/userhead_big.png" alt="">
            <img v-else class="headportrait" :src="getUserInfo.avatar" alt="">
          </div>
          <div class="info">
            <h4>{{getUserInfo.name}}</h4>
            <div v-show="getUserInfo.vip !=1">
                <p><img src="/static/image/home/vip.png" alt="">
                <span class='high'>高级会员</span></p>
              <span class='upto'>有效期至{{getUserInfo.endtime}}</span>
            </div>
            <div v-show="getUserInfo.vip === 1"><p><img src="/static/image/home/vips.png" alt=""><span>普通会员</span></p></div>
          </div>
          <ul class="account-number">
            <li>
              <b class='num'>{{getAccountInfo.accountNormal}}</b>
              <b>账号数</b>
            </li>
            <li>
              <b class='num'>{{getAccountInfo.articleCount}}</b>
              <b>文章数</b>
            </li>
            <li>
              <b class='num'>{{getAccountInfo.readCount}}</b>
              <b>总阅读数</b>
            </li>
          </ul>
          <div class="gross-income">
            累计收入：<span v-if="getAccountInfo.allReward">￥{{getAccountInfo.allReward/100}}</span>
            <span v-else>￥0</span>
          </div>
        </div>
        <div class="release" @click='handleClick(0)'>
          <div class="today-date"><b>今日发布</b><span>{{getAccountInfo.today}}</span></div>
          <div class="number">
            <p><span>文章数</span><b>{{getAccountInfo.articleNumForToday}}</b></p>
            <p><span>同步数</span><b>{{getAccountInfo.articleSynNumForToday}}/{{getAccountInfo.articleSynNumForTodayTODO}}</b></p>
          </div>
        </div>
        <div class="release" @click='handleClick(1)'>
          <div class="today-date"><b>昨日阅读</b><span>{{getAccountInfo.yesterday}}</span></div>
          <div class="number">
            <p><span>推荐数</span><b>+{{getReadCount.recommend_incr}}</b></p>
            <p><span>阅读数</span><b>+{{getReadCount.read_incr}}</b></p>
          </div>
        </div>
        <div class="release" @click='handleClick(2)'>
          <div class="today-date"><b>新增订单</b><span>{{getAccountInfo.today}}</span></div>
          <div class="number">
            <p><span>订单数</span><b>{{getAccountInfo.increasedOrderNum}}</b></p>
            <p><span>订单总数</span><b>{{getAccountInfo.totalOrderNum}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="dialog-associator" v-if='getHomeActivity.code == 200' v-show='showDialogShare'>
      <div class="dialog-associatormask" style='background-color: rgba(0, 0, 0, .8)' @click="removeDialogShare"></div>
      <div class="dialogShare">
        <img class='bgshare' src="/static/image/shareinvite/banner.png" alt="">
        <i class='cancelshare' @click="removeDialogShare"></i>
        <span @click='openLook'></span>
      </div>
    </div>
    <div class="goodDeed" v-else-if='getHomeActivity.code == 201' v-show='showDialogShare'>
      <div class="goodDeedMask" @click="removeDialogShare"></div>
      <div class="goodDeed-body">
        <img src="/static/image/home/prosit.png" alt="">
        <p>
          <span>恭喜您成为简媒高级会员</span>
          <span class='validity'>高级会员有效期为{{getHomeActivity.data}}天</span>
        </p>
      </div>
    </div>-->
    <div class="dialog-associator" v-show='showAssociator'>
      <div class="dialog-associatormask" @click="removeAssociator"></div>
      <div class="associator" v-if='getUserInfo.vip !=1'>
        <i class='iconfont icon-bt_quxiao_b' @click="removeAssociator"></i>
        <div>恭喜您，<span>亲爱的高级会员</span>：</div>
        <p class='dredge'>简媒已为您开通广告收益功能。</p>
        <p>点击【<span @click='routeRead'>阅读</span>】，找到【我的】文章列表，打开带有<i class='iconfont icon-shouyi1'></i>的收益文章，进行转发。</p>
        <p class='dredge'>转发至朋友圈、群聊、好友等，阅读越高，收益越高。快快转起来~~</p>
      </div>
      <div class="associator" v-else>
        <i class='iconfont icon-bt_quxiao_b' @click="removeAssociator"></i>
        <div>亲爱的官人：</div>
        <p class='dredge'>简媒新功能上线，转发文章享传播收益。</p>
        <p>点击【<span @click='routeRead'>阅读</span>】，打开带有<i class='iconfont icon-shouyi'></i>的收益文章，进行转发。</p>
        <p class='dredge'>转发至朋友圈、群聊、好友等，有效分享越多，收益越高。快快转起来~~</p>
      </div>
    </div>
  </div>
</template>
<script>
  import TopPage from '@/components/Common/TopPage.vue'
  import '../../api/utils.js'
  import {
    mapGetters
  } from 'vuex'
  import {
    content,
    GetHomeActivity
  } from '../../api/utils.js'
  export default {
    name: 'HomeCon',
    computed: {
      ...mapGetters([
        'getUserInfo',
        'getAccountInfo',
        'getReadCount',
        'getHomeActivity',
      ])
    },
    data() {
      return {
        showAssociator: true,
        showDialogShare: true
      }
    },
    created() {
      this.$store.dispatch('actionUserInfo', {});
      this.$store.dispatch('actionAccountInfo', {});
      this.$store.dispatch('actionReadCount', {});
      const params = {};
      this.$store.dispatch('actionGetHomeActivity', this.qs.stringify(params));
    },
    methods: {
      openLook() {
        this.$router.push("/s/shareInvitationCard")
      },
      removeAssociator() {
        this.showAssociator = false;
      },
      removeDialogShare() {
        this.showDialogShare = false;
      },
      intoComputer() {
        window.location.href = "http://www.ejianmedia.com/s/home";
      },
      routeRead() {
        if (this.$store.state.totalNumber == '' || this.$store.state.totalNumber == undefined) {
          this.$router.push('/reading?id=-3');
        } else {
          this.$router.push('/reading?id=' + this.$store.state.totalNumber);
        }
      },
      handleClick(index) {
        if (index == 0) {
          this.$router.push("/s/page/content")
        } else if (index == 1) {
          this.$router.push("/s/dataAnalysis")
        } else if (index == 2) {
          this.$router.push("/s/order/orderSet")
        }
      }
    },
    components: {
      TopPage
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/style/vars.less';
  .HomeCon {
    .flex();
    position: relative;
    .home {
      position: absolute;
      width: 100%;
      height: 100%;
      .display-flex();
      .column();
      .page {
        .flex();
        overflow-y: auto;
        padding: 10px 20px;
        box-sizing: border-box;
        background-color: #eaf2f2;
        .computer {
          position: fixed;
          right: 0;
          top: 50px;
          background-color: #29b1e6;
          color: #fff;
          width: 20px;
          text-align: center;
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
          font-size: 12px;
          padding-top: 5px;
          padding-bottom: 5px;
          box-sizing: border-box;
          cursor: pointer;
        }
        .personalInfo {
          border-radius: 10px;
          background-color: #fff;
          .topImg {
            width: 100%;
            height: 1.3rem;
            position: relative;
            .bglogo {
              width: 100%;
              height: 100%;
              border-top-right-radius: 10px;
              border-top-left-radius: 10px;
            }
            .headportrait {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              position: absolute;
              bottom: -40px;
              left: 50%;
              margin-left: -40px;
            }
          }
          .info {
            box-sizing: border-box;
            padding-top: .48rem;
            text-align: center;
            height: 124px;
            h4 {
              font-size: 16px;
              color: @blue-text-color;
            }
            p {
              padding-left: 16px;
              padding-right: 16px;
              color: @blue-text-color;
              margin-top: 3px;
            }
            div {
              p {
                .display-flex();
                .align-item();
                .justify-content();
                margin-top: .08rem;
                span {
                  padding-left: 3px;
                }
              }
              .upto {
                color: #496271;
                padding-top: 5px;
                padding-bottom: .12rem;
                display: block;
              }
              .high {
                color: #fdb427;
              }
            }
          }
          .account-number {
            .display-flex();
            border-top: 1px solid @gray-border-color;
            border-bottom: 1px solid @gray-border-color;
            li {
              .flex();
              text-align: center;
              background-color: #f6f9f8;
              border-left: 1px solid @gray-border-color;
              padding-top: .1rem;
              padding-bottom: .1rem;
              &:nth-child(1) {
                border-left: none;
              }
              b {
                display: block;
                color: @blue-text-color;
              }
              .num {
                font-size: .14rem;
              }
            }
          }
          .gross-income {
            text-align: center;
            height: .5rem;
            line-height: .5rem;
            color: @blue-text-color;
            font-size: .14rem;
            span {
              color: @primary-color;
            }
          }
        }
        .release {
          border-radius: 10px;
          background-color: #fff;
          margin-top: 10px;
          padding: 28px 20px;
          box-sizing: border-box;
          cursor: pointer;
          .today-date {
            font-size: 14px;
            color: @blue-text-color;
            span {
              padding-left: 6px;
            }
          }
          .number {
            .display-flex();
            margin-top: 14px;
            p {
              width: 50%;
              text-align: center;
              border-left: 1px solid @gray-border-color;
              padding-top: 3px;
              padding-bottom: 3px;
              &:nth-child(1) {
                border-left: 0;
              }
              b {
                color: @primary-color;
                font-weight: 400;
              }
              span {
                color: #999c9c;
                padding-right: 3px;
              }
            }
          }
        }
      }
    }
  }

  .dialog-associator {
    .dialog-associatormask {
      .dialog();
      background-color: rgba(0, 0, 0, 0.5);
    }
    .associator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      background: #fff;
      padding: 40px 20px;
      box-sizing: border-box;
      border-radius: 5px;
      width: 86%;
      color: @blue-text-color;
      font-size: 13px;
      z-index: 1024;
      .icon-bt_quxiao_b {
        position: absolute;
        right: 15px;
        top: 20px;
        cursor: pointer;
      }
      .icon-shouyi1,
      .icon-shouyi {
        color: #FEA654;
      }
      p {
        padding-left: 2em;
      }
      span {
        color: @primary-color;
      }
      .dredge {
        padding-top: 20px;
      }
    }
    .dialogShare {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      border-radius: 5px;
      width: 243px;
      height: 292px;
      z-index: 1025;
      .bgshare {
        width: 100%;
      }
      .cancelshare {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        cursor: pointer;
      }
      span {
        position: absolute;
        bottom: 3px;
        left: 78px;
        width: 92px;
        height: 22px;
        display: block;
        cursor: pointer;
      }
    }
  }

  .goodDeed {
    .goodDeedMask {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, .5);
      z-index: 1025;
    }
    .goodDeed-body {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      padding-bottom: 40px;
      box-sizing: border-box;
      z-index: 9999;
      img {
        width: 300px;
        display: block;
        margin: 0 auto;
      }
      p {
        width: 100%;
        color: #f5cf12;
        font-size: 20px;
        font-weight: 800;
        text-align: center;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        font-family: cursive;
        span {
          display: block;
        }
        .validity {
          font-size: 18px;
        }
      }
    }
  }

</style>
