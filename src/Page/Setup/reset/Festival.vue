<template>
  <div class="Festival">
    <i class='iconfont icon-fanhui' @click='lastpage'></i>
    <div class="Festival-title"><img src="/static/image/shareinvite/ban.jpg" alt=""></div>
    <div class="Festival-text">
      <div>
        <p class="happy">喜讯！喜讯！特大喜讯！！！</p>
        <p>简媒来给小伙伴们送中秋节福利啦！</p>
      </div>
      <div>
        <p class="happy">简媒，快P营销，联合每日优鲜。</p>
        <p>给小伙伴们准备了100元每日优鲜优惠券（此券仅每日优鲜新用户有效）</p>
      </div>
      <div>
        <p class="happy">快快老领取吧！</p>
        <p>大家也可以发给亲朋好友共享福利哦！</p>
      </div>
      <img class="left" src="/static/image/shareinvite/left.png" alt="">
    </div>
    <div class="voucher">
        <div class="banner">
            <div class="banner2"></div>
            <div class="banner1"></div>
            <div class="setImg"><img src="/static/image/shareinvite/yhq.jpg" alt=""></div>
            <div class="banner3"></div>
            <div class="banner4"></div>
        </div>
        <img class="right" src="/static/image/shareinvite/left.png" alt="">
    </div>
    <div class="Festival-footer"><img src="/static/image/shareinvite/zan.png" alt=""> 长按领取优惠券</div>
  </div>
</template>

<script>
  export default {
    name: 'festival',
    data() {
      return {

      }
    },
    created() {

    },
    methods: {
      lastpage(){
        this.$router.go(-1)
      }
    }
  }

</script>

<style lang='less' scoped>
  @import '../../../assets/style/vars.less';
  .Festival{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
  }
  .icon-fanhui{
      position: absolute;
      top: 12px;
      left:12px;
  }
  .Festival-title {
    width: 100%;
    height: 227px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .Festival-text {
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
    .left{
        position: absolute;
        left:-97px;
        bottom:-63px;
        height:185px;
    }
    div {
      margin-top: 10px;
      font-weight:800;
      p {
        font-size: 14px;
        color: #282828;
        &:nth-child(1) {
          font-size: 16px !important;
          color: #ce131c !important;
        }
      }
    }
  }

  .voucher {
    width:100%;
    margin-top: 25px;
     position:relative;
    .banner {
       width:270px;
       height: 161px;
       margin:auto;
       position:relative;
       .banner1{
          width:260px;
          height: 5px;
          background: #dd316a;
          margin-left: 5px;
       }
       .banner2{
          width:260px;
          height: 5px;
          background: #dd76ce;
          margin-left: 10px;
       }
       .banner3{
          width:5px;
          height: 146px;
          background: #dd316a;
          position: absolute;
          right: 5px;
          top: 5px;
       }
       .banner4{
          width:5px;
          height: 141px;
          background: #dd76ce;
          position: absolute;
          right: 0;
          top: 5px;
       }
       .setImg{
           width:260px;
           height: 150px;
           box-shadow: -2px 2px 5px 0 #ccc;
           img{
               width:100%;
               height:100%;
           }
       }
    }
    .right{
        position: absolute;
        right: -84px;
        bottom: -30px;
        height: 185px;
    }
  }

  @keyframes mymove {
   0% {
      top: -3px;
    }
    25% {
      top: 2px;
    }
    50% {
      top: 0px;
    }
    75% {
      top: 2px;
    }
    100% {
      top: -3px;
    }
  }

  @-moz-keyframes mymove{
     0% {
      top: -3px;
    }
    25% {
      top: 2px;
    }
    50% {
      top: 0px;
    }
    75% {
      top: 2px;
    }
    100% {
      top: -3px;
    }
  }

  @-webkit-keyframes mymove{
      0% {
      top: -3px;
    }
    25% {
      top: 2px;
    }
    50% {
      top: 0px;
    }
    75% {
      top: 2px;
    }
    100% {
      top: -3px;
    }
  }

  @-o-keyframes mymove{
      0% {
      top: -3px;
    }
    25% {
      top: 2px;
    }
    50% {
      top: 0px;
    }
    75% {
      top: 2px;
    }
    100% {
      top: -3px;
    }
  }

  .Festival-footer {
    height: 45px;
    .display-flex();
    .align-item();
    .justify-content();
     color: #dd3e6a;
     font-weight:800;
    img {
      margin-right: 16px;
      font-size: 14px;
      position: relative;
      animation: mymove 2s infinite;
      -moz-animation: mymove 2s infinite;
      -webkit-animation: mymove 2s infinite;
      -o-animation: mymove 2s infinite;
    }
  }

</style>
