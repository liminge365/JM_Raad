<template>
  <!--<div class="shareLogo">
    <div class="setLogo"><img src="/static/image/home/JM.png" alt=""></div>
    <div class="shareName">
      <b>{{data.name}}</b>
      <p>邀请你<span>成为简媒高级会员</span></p>
    </div>
    <div class="receiveCard">
      <h3>快来领取</h3>
      <h2>10,0000</h2>
      <h4>自媒体人都在用</h4>
      <h4>简媒<img src="/static/image/home/gj.gif" alt=""></h4>
    </div>
    <h2 class="carry">高级会员权益CARRY全场</h2>
    <h2 class='terrace'>
      <p>一键发布15个自媒体平台</p>
      <p>投放广告作者可赚取收益</p>
    </h2>
    <div class="footerShow" v-show="show==1">
      <div class="djtime">
        有效期<b>{{data.time}}</b>天
      </div>
      <div class="operative">[运营我用简媒]</div>
      <div class='getInto'>
        <img src="/static/image/home/invite.png" alt="">
        <h2 @click="shareShow()">立即邀请</h2>
      </div>
    </div>
    <div class="footerShow" v-show="show==2">
      <div class="djtime">
        有效期<b>{{data.time}}</b>天
      </div>
      <div class="operative">[运营我用简媒]</div>
      <div class='getInto'>
        <img src="/static/image/home/invite.png" alt="">
        <h2 @click="getShare()">立即领取</h2>
      </div>
    </div>
    <div class="footerShow" v-show="show==3">
      <div class="shareTip">
        <h4>亲，您来晚了</h4>
        <h4>该高级会员名额已经被抢走了</h4>
        <h4 class='shareAction'>注册简媒抢高级会员名额</h4>
      </div>
      <div class="operative">[运营我用简媒]</div>
      <div class='getInto'>
        <img src="/static/image/home/invite.png" alt="">
        <h2 @click="goregis()">立即注册</h2>
      </div>
    </div>
    <div class="footerShow" v-show="show==5">
      <div class="shareTip">
        <h4 class='shareAction'>该活动仅限未注册简媒的新用户</h4>
        <h4>您可以去简媒公众号“会员活动”专区抢高级会员名额哦</h4>
      </div>
      <div class="operative">[运营我用简媒]</div>
      <div class="scavenging">
        <p>扫码关注简媒公众号</p>
        <p><img src="/static/image/login/ewm1.jpg" alt=""></p>
      </div>
    </div>
    <div class="footerShow" v-show="show==4">
      <div class="shareTip">
        <h4 class='shareAction'>该活动仅限未注册简媒的新用户</h4>
        <h4>您已是高级会员，请分享给未注册简媒的新用户</h4>
      </div>
      <div class="operative">[运营我用简媒]</div>
      <div class='getInto'>
        <img src="/static/image/home/invite.png" alt="">
        <h2 @click="goShareCard()">去邀请</h2>
      </div>
    </div>
    <div class="dialog-shareLogo" style="display:none">
      <div class="popup_fen" style="display:none" @click='popup_liuShow'>
        <div class="tishi">
          <span>点击右上方，分享文章至微信好友或朋友圈</span><img src="/static/image/login/fenxiang.png" alt="">
        </div>
      </div>
      <div class="popup_liu" style="display:none" @click='popup_liuShow'>
        <div class="model">
          <h3>活动分享</h3>
          <span>点击浏览器分享功能，分享至微信好友或朋友圈</span>
        </div>
      </div>
    </div>
  </div>-->
  <div class="shareLogo">
    <img class='setShareLogo' src="/static/image/shareinvite/login1.png" alt="">
    <!--<img class='setShareLogo' src="/static/image/shareinvite/logo2.jpg" alt="">-->
    <ul class='shareList'>
      <li v-for="(val,index) in data" :key="index">
        <div class="status">{{val.time_left}}</div>
        <div class='shareList-top'>
          <img :src="val.img" alt="">
        </div>
        <p>请保存邀请卡并分享给好友</p>
      </li>
    </ul>
    <img class='setShareLogo2' src="/static/image/shareinvite/logo4.png" alt="">
  </div>
</template>

<script>
  import {
    GetCardStateMessage,
    GetNewALLCard
  } from '../../../api/utils.js'
  import {
    wxReady
  } from '../../../plugins/weixinshare.js'
  export default {
    name: 'shareLogo',
    data() {
      return {
        code: '',
        data: [],
        show: ''
      }
    },
    created() {
      let _this = this;
      GetNewALLCard().then(res => {
        _this.data = res.data.data;
      });
    },
    methods: {}
  }

</script>

<style lang='less' scoped>
  @import '../../../assets/style/vars.less';
  .shareLogo {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .setShareLogo {
      width: 100%;
      vertical-align: top;
      height: 379px;
    }
    .setShareLogo2{
      width: 100%;
      vertical-align: top;
      position: absolute;
      top: 1567px;
    }
    .shareList {
      position: absolute;
      top: 374px;
      padding-top: 58px;
      box-sizing: border-box;
      height: 1195px;
      background: url("/static/image/shareinvite/logo2.jpg") no-repeat;
      background-size: 100% 100%;
      width: 100%;
      li {
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        width: 62%;
        margin-left: 18%;
        height: 543px;
        padding-top: 50px;
        box-sizing: border-box;
        .status {
          position: absolute;
          top: 0;
          text-align: center;
          top: 63px;
          left: 50%;
          transform: translate(-50%, 0);
          -ms-transform: translate(-50%, 0);
          -moz-transform: translate(-50%, 0);
          -webkit-transform: translate(-50%, 0);
          -o-transform: translate(-50%, 0);
          font-size: 20px;
          color: #CEB773;
        }
        .shareList-top {
          position: relative;
          width: 100%;
          display: block;
          height: 286px;
          margin: 68px auto 0;
          img {
            width: 100%;
            height: auto;
          }
        }
        p {
          font-size: 14px;
          color: #dac67d;
          text-align: center;
          margin-top: 87px;
        }
      }
    }
  }

</style>
