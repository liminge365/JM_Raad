<template>
  <ul class='shareList'>
      <li>
        <div class='shareList-top'>
          <p class='invitationName'>弟李亦非诚邀</p>
          <img src="/static/image/shareinvite/viplogo.jpg" alt="">
          <p class='deprecated'>
            <span>YADDDJKJKD</span>
            <span>30天VIP</span>
          </p>
        </div>
        <div class="shareList-bottom">
          <p>
            <img class='setYzm' src="/static/image/home/ewm1.jpg" alt="">
            <span>扫码立即领取</span>
          </p>
          <img class='vipdetail' src="/static/image/shareinvite/vipdetail.jpg" alt="">
        </div>
      </li>
    </ul>
</template>

<script>
  export default {
    name: 'Screenshot',
    data() {
      return {
      }
    },
    created() {
    }
  }

</script>

<style lang='less' scoped>
  @import '../../../assets/style/vars.less';
   .shareList {
      li {
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        width: 62%;
        margin-left: 18%;
        .status {
          position: absolute;
          top: 0;
          text-align: center;
          top: 63px;
          left: 50%;
          transform:translate(-50%,0);
          -ms-transform:translate(-50%,0); 
          -moz-transform:translate(-50%,0); 
          -webkit-transform:translate(-50%,0);
          -o-transform:translate(-50%,0); 
          font-size: 20px;
          color: #CEB773;
        }
        .shareList-top {
          position: relative;
          box-shadow: 0 0 10px 0 #CEB773 ;
          margin-top:68px;
          .invitationName {
            position: absolute;
            top: 0;
            padding-top: 10px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #fbedbf;
            font-weight: 800;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .deprecated {
            width: 100%;
            position: absolute;
            bottom: 4px;
            padding: 0 10px;
            box-sizing: border-box;
            color: #fbedbf;
            font-weight: 800;
            .display-flex();
            .space-between();
          }
        }
        .shareList-bottom {
          position: relative;
          margin-top: 25px;
          box-shadow: 0 0 10px 0 #CEB773;
          p {
            position: absolute;
            left: 03px;
            top: 30px;
            width: .8rem;
            height: .8rem;
            .setYzm {
              width: 52px;
              height: 52px;
              display: block;
              margin: auto;
            }
            span {
              display: block;
              color: #fff;
              text-align: center;
              .scale();
            }
          }
          .vipdetail {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
</style>
