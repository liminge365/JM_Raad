<template>
  <div class="readingLogin">
    <div class="popup_fen" @click='deletepopup_fen'>
      <div class="tishi" >
        <span>点击右上方，分享文章至微信好友或朋友圈</span><img src="/static/image/login/fenxiang.png" alt="">
      </div>
    </div>
    <div class="popup_liu" @click='deletepopup_fen'>
      <div class="model" >
          <h3>活动分享</h3>
          <span>点击浏览器分享功能，分享至微信好友或朋友圈</span>
      </div>
    </div>
    <div class="popup">
      <div class="popLogin" @keyup.13='loginUser'>
        <div class="scalebus">
          <div class="register">
            <i class="iconfont icon-bt_quxiao_b remove" @click='removepopup'></i>
            <span class='loginIn'>登录</span>
            <div class="input-one">
              <i class='iconfont icon-msnui-tel'></i>
              <input type="text" class="form-control top-ju" placeholder="请输入手机号" v-model='usertel'>
            </div>
            <div class="identifyingcode">
                <p>
                <i class="iconfont icon-msnui-msg-invert"></i>
                <input type="text" placeholder="请输入验证码" v-model='imgyzm'>
                </p>
                <img class='yzcode' @click='getimgyzm' :src="src" alt="">
            </div>
            <div class="identifyingcode">
              <p>
                <i class="iconfont icon-xinfeng"></i>
                <input type="text" placeholder="请输入短信验证码" v-model='infoyzm'>
              </p>
              <button class="btn" ref='btn' @click='getyzmTime'>{{getTime}}</button>
            </div>
            <div class="message" v-show='errmsg'>{{tip}}</div>
            <div class="input-two">
              <a class="form-control2" @click='loginUser'>登录</a>
            </div>
            <div class="wenzi">
              <p><span class='okuser'>点击“登录”表明您同意遵守简媒<a href="#">用户协议</a>和<a href="#">隐私政策</a></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {baseUrl} from '../../../config/env.js'
  import {
    mobileyzm,
    articleLogin
  } from '../../../api/utils.js'
  export default {
    name: 'readingLogin',
    data() {
      return {
        errmsg:false,
        tip:'',
        usertel:'',
        imgyzm:'',
        infoyzm:'',
        getTime: '获取验证码',
        src: baseUrl + '/regKaptcha/img.pnggg'
      }
    },
    methods:{
      //获取图片验证码刷新
      getimgyzm() {
        this.tip = '';
        this.errmsg = false;
        this.src = baseUrl + '/regKaptcha/img.pnggg?' + Math.random();
      },
      deletepopup_fen (){
        this.$(".popup_fen").hide();
        this.$(".popup_liu").hide();
      },
      removepopup(){
        this.$(".popup").hide();
      },
      //倒计时
      djTime() {
        var second = 120;
        var timer = null;
        let _this = this;
        this.$refs.btn.disabled = true
        timer = setInterval(function () {
          second--;
          if (second > 0) {
            _this.getTime = second + '秒后重试';
          } else {
            clearInterval(timer);
            _this.getTime = "获取验证码";
            _this.$refs.btn.disabled = false
          }
        }, 1000);
      },
      getyzmTime() {
        this.tip = '';
        this.errmsg = false;
        const usertel = this.usertel.trim();
        const imgyzm = this.imgyzm.trim();
        let tel = /^1\d{10}$/;
        if (usertel == '') {
          this.tip = '手机号不能为空';
          this.errmsg = true;
        } else if (isNaN(usertel)) {
          this.tip = '手机号必须是数字';
          this.errmsg = true;
        } else if (!tel.test(usertel)) {
          this.tip = '手机号不合法';
          this.errmsg = true;
        } else if (imgyzm == '') {
          this.tip = '验证码不能为空';
          this.errmsg = true;
        } else {
          var query = {
            'imgCode': imgyzm,
            'loginName': usertel
          }
          mobileyzm(query).then((res) => {
            if (res.data.code == 200) {
              this.djTime()
            } else {
              this.tip = res.data.msg;
              this.errmsg = true;
            }
          })
        }
      },
      loginUser(){
        const usertel = this.usertel.trim();
        const infoyzm = this.infoyzm.trim();
        let tel = /^1\d{10}$/;;
        if (usertel == '') {
          this.tip = '手机号不能为空';
          this.errmsg = true;
        } else if (isNaN(usertel)) {
          this.tip = '手机号必须是数字';
          this.errmsg = true;
        } else if (!tel.test(usertel)) {
          this.tip = '手机号不合法';
          this.errmsg = true;
        }else if (infoyzm == '') {
          this.tip = '短信验证码不能为空';
          this.errmsg = true;
        } else {
          let data = {
            'loginName': usertel,
            'smsCode': infoyzm
          }
          articleLogin(this.qs.stringify(data)).then((res) => {
            if (res.data.code == 200) {
              location.reload();
              this.$(".popup").hide();

            } else {
              this.tip = res.data.msg;
              this.errmsg = true;
            }
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../../assets/style/vars.less';
  .popup,
  .popup_fen,
  .popup_liu {
    background: rgba(10, 0, 0, 0.22);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1111;
    display: none;
  }
  .popup_liu{
    background: rgba(10, 0, 0, 0);
  }
  .active{
      display: inline-block;
  }
  .model {
    width: 88%;
    height: .92rem;
    left: 6%;
    position: fixed;
    top: 50%;
    margin-top: -0.46rem;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 3px;
    text-align: center;
  }
  .model h3 {
    padding-top: 15px;
    font-size: .2rem;
    padding-bottom: 10px;
  }
  .model span {
    font-size: .12rem;
  }

  .popup_fen {
    background: rgba(10, 0, 0, 0.5);
    .tishi {
      position: absolute;
      top: 10%;
      left: 50%;
      -webkit-transform: translate(-50%, 50%);
      transform: translate(-50%, 50%);
      width: 90%;
      z-index: 9999;
      color: #fff;
      font-size: .21rem;
      text-align: center;
      span {
        width: 75%;
        display: inline-block;
        padding-right: .1rem;
        text-align: left;
      }
      img {
        width: 20%;
      }
    }
  }
  .popLogin {
    width: 90%;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding-top: .23rem;
    padding-bottom: .13rem;
    box-sizing: border-box;
    z-index: 9999;
    background: #fff;
    .register{
      width: 100%;
      height: 39px;
      margin: auto;
      -webkit-transform: scale(0.9);
      -o-transform: scale(0.9);
      -moz-transform: scale(0.9);
      -ms-transform: scale(0.9);
      transform: scale(0.9);
      position:relative;
      .remove{
          position: absolute;
          top:-8px;
          font-size: 18px;
          right:0;
      }
      .loginIn {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #2ab6e5;
        height: 20px;
        line-height: 20px;
      }
      .input-one {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1.1px solid #dfdcdc;
        margin: .15rem auto;
        margin-bottom: 0;
        .display-flex();
        .align-item();
        i {
          color: #868686;
          font-size: .25rem;
          padding-left: .05rem;
          padding-right: 6px;
        }
        .icon-msnui-tel {
          font-size: .23rem;
        }
        .form-control {
          border: none;
          width: 100%;
          padding-right: 10px;
          box-sizing: border-box;
          background: none;
        }
      }
      .input-two {
        text-align: center;
        cursor: pointer;
        margin-top: .15rem;
        .form-control2 {
          width: 100%;
          height: .39rem;
          line-height: .39rem;
          border-radius: 2px;
          font-size: .16rem;
          border: none;
          color: #fff;
          background: #2ab6e5;
          display: block;
        }
      }
      .identifyingcode {
        .display-flex();
        .align-item();
        .space-between();
        width: 100%;
        height: 100%;
        margin: .15rem auto 0;
        p {
          width: 60%;
          border: 1px solid #dfdcdc;
          height: 100%;
          border-radius: 5px;
          .display-flex();
          .align-item();
          i {
            color: #868686;
            font-size: .2rem;
            padding-left: .07rem;
            padding-right: 8px;
          }
          input {
            width: 100%;
            height: 90%;
            border: 0;
            outline: none;
            padding-right: .1rem;
            background: none;
          }
        }
        .yzcode {
          width: 35%;
          height: .39rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          width: 35%;
          height: .39rem;
          line-height: .39rem;
          text-align: center;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
          background: #2ab6e5;
          border: 0;
          outline: none;
        }
      }
      .message {
        color: #ff9a38;
        width: 100%;
        text-align: right;
        margin: .03rem auto 0px;
      }
      .wenzi {
        margin-top: 10px;
        display: fixed;
        text-align: center;
        p {
          display: block;
          width: 100%;
          margin: auto;
        }
        .okuser {
          color: #b6b6b6;
          float: right;
          a {
            color: #2ab6e5;
            cursor: pointer;
          }
        }
        .forget {
          color: #2ab6e5;
          flood-color: left;
          float: left;
          font-size: .12rem;
          cursor: pointer;
        }
      }
    }
  }

</style>
