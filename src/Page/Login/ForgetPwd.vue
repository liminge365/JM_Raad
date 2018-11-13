<template>
  <div class="forget">
     <mt-header title="忘记密码">
        <i class='iconfont icon-fanhui' slot="left" @click='cancelbtn'></i>
    </mt-header>
     <div class="forgetpwd" @keyup.13='registeruser'>
        <div class="scalebus">
            <div class="register">
                <div class="input-one">
                    <i class='iconfont icon-msnui-tel'></i>
                    <input type="text" class="form-control top-ju" placeholder="请输入手机号" v-model='usertel_2'>
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
                <div class="input-one">
                    <i class='iconfont icon-suoding'></i>
                    <input type="password" data-msg-required="新密码不能为空" class="form-control" placeholder="请输入密码" v-model='password_2'>
                </div>
                <div class="message" v-show='errmsg_2'>{{tishi_2}}</div>
                <div class="input-two">
                    <a @click='registeruser'>提交</a>
                    <a class='cancel'  @click='cancelbtn'>取消</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {forgetinfoyzm,forgetsubmit} from '../../api/utils.js'
  import {
    baseUrl
  } from '../../config/env.js'
  export default {
    name: 'forgetpwd',
    data () {
      return {
        errmsg_2:false,
        tishi_2:'',
        usertel_2:'',
        password_2:'',
        imgyzm:'',
        infoyzm:'',
        getTime:'获取验证码',
        src:baseUrl + '/regKaptcha/img.pnggg'
      }
    },
    methods :{
       register(){
           this.registeruser()
       },
       cancelbtn(){
           this.$router.push({path:'/'});
           window.sessionStorage.setItem('num',1)
       },
       //注册倒计时
       djTime () {
          var second = 120;
          var timer = null;
          let _this = this;
          _this.$refs.btn.disabled = true;
          timer = setInterval(function () {
                second--;
                if (second > 0) {
                    _this.getTime = second + '秒后重试';
                } else{
                    clearInterval(timer);
                    _this.getTime = "获取验证码";
                    _this.$refs.btn.disabled = false;
                }
            }, 1000);
       },
       // 获取短信验证码
       getyzmTime(){
            const usertel_2 = this.usertel_2.trim();
            const imgyzm = this.imgyzm.trim();
            this.tishi_2 =  "";
            this.errmsg_2 = false;
            let tel = /^1\d{10}$/;
            if(usertel_2 == '') {
                this.tishi_2 = '手机号不能为空';
                this.errmsg_2 = true;
            }else if(isNaN(usertel_2)){
                this.tishi_2 = '手机号必须是数字';
                this.errmsg_2 = true;
            }else if(!tel.test(usertel_2)){
                this.tishi_2 = '手机号不合法';
                this.errmsg_2 = true;
            }else if(imgyzm == ''){
                this.tishi_2 = '验证码不能为空';
                this.errmsg_2 = true;
            }else{
                var query = {
                    'imgCode': imgyzm,
                    'loginName':usertel_2
                }
                forgetinfoyzm(query).then((res)=>{
                    if(res.data.code == 200){
                        this.djTime();
                    }else{
                        this.tishi_2 =  res.data.msg;
                        this.errmsg_2 = true;
                    }
                }) 
            }
       },
       //获取图片验证码刷新
       getimgyzm (){
           this.tishi_2 =  "";
           this.errmsg_2 = false;
           this.src = baseUrl +  '/regKaptcha/img.pnggg?' + Math.random();
       },
       //注册
       registeruser(){
            const usertel_2 = this.usertel_2.trim();
            const password_2 = this.password_2.trim();
            const imgyzm = this.imgyzm.trim();
            const infoyzm = this.infoyzm.trim();
            let tel = /^1\d{10}$/;;
            if(usertel_2 == '') {
                this.tishi_2 = '手机号不能为空';
                this.errmsg_2 = true;
            }else if(isNaN(usertel_2)){
                this.tishi_2 = '手机号必须是数字';
                this.errmsg_2 = true;
            }else if(!tel.test(usertel_2)){
                this.tishi_2 = '手机号不合法';
                this.errmsg_2 = true;
            }else if(password_2 == ''){
                this.tishi_2 = '新密码不能为空';
                this.errmsg_2 = true;
            }else if(infoyzm == ''){
                this.tishi_2 = '短信验证码不能为空';
                this.errmsg_2 = true;
            }else{
                let data = {
                    'loginName': usertel_2,
                    'plainPassword': password_2,
                    'smsCode': infoyzm
                }
                forgetsubmit(this.qs.stringify(data)).then((res)=>{
                    if(res.data.code == 200){
                        this.$router.push("/")
                    }else{
                        this.tishi_2 =  res.data.msg;
                        this.errmsg_2 = true;
                    }
                }) 
            }
       }
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/style/vars.less';
.forgetpwd {
    width: 90%;
    margin: 0 5%;
    border-radius: 5px;
    padding-bottom: .43rem;
    box-sizing: border-box;
    .register{
        width: 100%;
        height: 39px;
        margin: auto;
        .input-one {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1.1px solid #dfdcdc;
            margin: .15rem auto;
            margin-bottom: 0;
            background-color: #fff;
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
                font-family: 'Microsoft Yahei';
                -webkit-box-shadow: 0 0 0px 1000px white inset;
                border: none;
                width: 100%;
                padding-right: 10px;
                box-sizing: border-box;
            }
        }
        .input-two {
            text-align: center;
            cursor: pointer;
            margin-top: .15rem;
            .display-flex();
            .space-between();
            a{
                width: 40%;
                height: .39rem;
                line-height: .39rem;
                border-radius: 5px;
                font-size: .16rem;
                border: none;
                color: #fff;
                font-family: 'Microsoft Yahei';
                background: #58B0E2;
                display: block;
            }
            .cancel{
                background-color: #fff;
                color: #000;
                 border: 1px solid #ccc;
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
                background-color: #fff;
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
                    font-family: 'Microsoft Yahei';
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
                border: 0;
                outline: none;
                border-radius: 3px;
                cursor: pointer;
                font-family: 'Microsoft Yahei';
                background: #58B0E2;
                background: -moz-linear-gradient(left, #6AD5CF, #58B0E2);
                background: -webkit-linear-gradient(left, #6AD5CF, #58B0E2);
                background: -o-linear-gradient(left, #6AD5CF, #58B0E2);
                background: -moz-linear-gradient(left, #6AD5CF, #58B0E2);
            }
        }
        .message {
            color: #ff9a38;
            width: 100%;
            text-align: right;
            margin: .03rem auto 0px;
        }
    }
}
</style>
