<template>
  <div class="reset">
    <div class="setHeight">
        <content-top title='修改密码'></content-top>
        <div class="newReset">
            <div class="setpwd">
               <input type="password" placeholder='请输入旧密码' v-model='oldPwd'>
               <input type="password" placeholder='请输入新密码' v-model='newPwd_1'>
               <input type="password" placeholder='请再次输入新密码' v-model='newPwd_2'>
               <div class="message" v-show='errmsg'>{{tip}}</div>
               <p class='pbtn' @click='updatePwd'>保存修改</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { updatepwd } from '../../../api/utils.js'
import ContentTop from '@/components/Common/ContentTop.vue'
export default {
  name: 'setup',
  data () {
    return {
      oldPwd:'',
      newPwd_1:'',
      newPwd_2:'',
      errmsg:false,
      tip:''
    }
  },
  methods:{
    updatePwd () {
      const oldPwd = this.oldPwd.trim();
      const newPwd_1 = this.newPwd_1.trim();
      const newPwd_2 = this.newPwd_2.trim();
      if(oldPwd == ''){
        this.tip = '请输入旧密码';
        this.errmsg = true;
      }else if(newPwd_1 == ''){
        this.tip = '请输入新密码';
        this.errmsg = true;
      }else if(newPwd_2 == ''){
        this.tip = '请再次输入新密码';
        this.errmsg = true;
      }else if(newPwd_1 != newPwd_2){
        this.tip = '两次输入的新密码不一样';
        this.errmsg = true;
      }else if(oldPwd == newPwd_1){
        this.tip = '新旧密码相同';
        this.errmsg = true;
      }else{
        let data = {
            'newPwd': newPwd_1,
            'oldPwd': oldPwd
        }
        updatepwd(this.qs.stringify(data)).then((res)=>{
            if(res.data.code != 200){
                this.tip =  res.data.msg;
                this.errmsg = true;
            }else{
                this.$router.push("/")
            }
        })
      }
    }
  },
  components:{
      ContentTop
  }
}
</script>

<style lang='less' scoped>
@import '../../../assets/style/vars.less';
.reset{
  .flex();
  position:relative;
  .setHeight{
    position:absolute;
    width: 100%;
    height:100%;
    .display-flex();
    .column();
     background-color:#eaf2f2;
    .newReset{
        .flex();
        overflow-y:auto;
        padding-top:15px;
        box-sizing:border-box;
        padding: 10px 20px 0;
        box-sizing:border-box;
        .setpwd{
            background-color: #fff;
            padding:20px 20px 30px 20px;
            box-sizing: border-box;
            border-radius: 5px;
            input{
              width: 100%;
              height: .38rem;
              padding-left: .1rem;
              padding-right: .1rem;
              border: 1px solid #D9D9D9;
              box-sizing:border-box;
              margin-bottom: 10px;
              border-radius:3px;
              color: #7A7F82;
            }
            .message{
                color: #a7212b;
                text-align: right;
                margin-bottom: .1rem;
            }
            .pbtn{
              .btnp();
              height: .38rem;
              line-height:.38rem;
              font-size:14px;
            }
        }
    }
  }
}
</style>
