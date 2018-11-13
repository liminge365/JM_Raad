<template>
  <div class="HomePage">
        <!-- 输入验证码弹出框 -->
            <!-- <div class="popbox" style="display: none">
                <div class="mask"></div>
                <div class="popup">
                    <p class='p-title'>系统已发送验证</p>
                    <p>正在向您绑定的手机号码发送短信验证码</p>
                    <p>请在<span class='times'>60</span>秒之内填写您收到的短信验证码完成授权</p>
                    <input type="text" placeholder="请输入验证码" >
                    <router-link :to="{path:'/account/accountBind'}" class='dele'>确认</router-link >
                </div>
            </div> -->
        <!-- 授权页 -->
            <div class="gr-content">
                <div class="cont-top">
                    <dl class='wechat'>
                        <dt><img :src="logo" alt=""></dt>
                        <dd>
                            <p class='tp'> 账号授权</p>
                            <p class='cp'> 请填写以下信息</p>
                        </dd>
                    </dl>
                    <p class='int '>{{account.type_name}}账号: <span class="text-input"><input v-model.trim="account.account_name" :disabled='account.platform_name' type="text" class="user" placeholder="请输入账号"></span></p>
                    <p class='int '>{{account.type_name}}密码: <span class="text-input"><input v-model.trim="account.account_pwd"  type="password" class="password" placeholder="请输入密码"></span></p>
                    <p class='errorcont'><span>{{error_msg}}</span></p>
                    <div class="btn-box">
                        <div class='btn hover' @click="accountSubmit" :disabled='desubmit'>授权</div>
                        <div class='btn' @click="$router.go(-1)">取消</div>
                    </div>
                    <!-- <div class="another" v-if="true === anothershow">
                        <span>第三方登录：</span>
                        <i class='iconfont icon-weibo1 hover'></i>
                        <i class='iconfont icon-qq'></i>
                    </div> -->
                </div>
                <div class="cont-bottom">
                    <h3>简媒将获得以下权限</h3>
                    <p>获得您的昵称、头像、性别；</p>
                    <p>获得您委托发布权限</p>
                    <p>获得您数据报表权限</p>
                    <p>授权后表示您已同意 <router-link to='/protocol'>简媒服务协议</router-link></p>
                </div>
            </div>
  </div>
</template>
<script>
import {getUpdateAccount,addAccount,updateAccount} from '../../../api/utils.js'
import { Indicator } from 'mint-ui';
// var newanothershow = false
// newanothershow = location.href.split('anothershow=')[1]
// console.log(newanothershow)
// this.$.each(newanothershow, function (i, item) {console.log(item); item  = false })    //应该写在这里
export default {
    props:{
         logo:String
         },
    data(){
        return{
            anothershow: false,
            account:{},
            error_msg:'',
            desubmit:false
        }
    },
    created(){
        let _self = this;
        // this.anothershow = this.$route.query.anothershow
        //更新时 获取原账号参数 
        if(this.$route.name=='accountupdate'){
           let params = new FormData();
           params.append("account_id",_self.$route.params.accountId);
           getUpdateAccount(params).then((res)=>{
               if(res.data.code!=200){
                   _self.$router.go(-1);
               }else{
                   _self.account = res.data.data;
                   if(_self.$route.params.typeId!=_self.account.account_type){
                       _self.$router.go(-1);
                   }
               }
           })
        }
        if(this.$route.name=='accountGive'){
            _self.account.account_type = _self.$route.params.typeId;
        }
    },
    methods:{
        //提交方法 
        accountSubmit(){
            if(!this.desubmit){
                this.desubmit = true;
                let _self = this;
                let params = _self.account;
                _self.error_msg = "";
                if(!params.account_name||!params.account_pwd){
                    _self.error_msg = "账号及密码不能为空";
                    _self.desubmit = false;
                    return;
                }
                if(/[\u4e00-\u9fbb]/.test(params.account_name)){
                    _self.error_msg = "账号不能为中文";
                    _self.desubmit = false;
                    return;
                }
                if(this.$route.name=="accountGive"){
                    this.funcAdd(params);
                }
                if(this.$route.name=="accountupdate"){
                    this.upAccount(params);
                }
            }
        },
        //add
        funcAdd(params){
            console.log(this.account);
            let _self = this;
            addAccount(params).then((res)=>{
                console.log(res.data.code);
                if(res.data.code==200){
                     _self.$router.go(-1)
                }else{
                    _self.error_msg = res.data.data;
                    _self.desubmit = false; 
                }

            })

        },
        upAccount(params){
            let _self = this;
            console.log(JSON.stringify(params));
            updateAccount(params).then((res)=>{
                console.log(res.data.code);
                if(res.data.code==200){
                    _self.$router.go(-1)
                }else{
                    _self.error_msg = res.data.data;
                    _self.desubmit = false; 
                }

            })
        }
    },
    
}
</script>
