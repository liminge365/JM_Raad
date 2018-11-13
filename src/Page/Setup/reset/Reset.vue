<template>
  <div class="reset">
    <div class="setHeight">
        <top-page title='我的' path='/s/setup'></top-page>
        <div class="newReset">
            <ul>
                <!-- <li @click='routerLink'>
                    <i class='iconfont icon-liwu'></i>
                    <span>活动专区</span>
                </li> -->
                <router-link v-for='(item,key) in setArr' 
                             :to='{path:item.path}'
                             :key='key'>
                    <li>
                        <i :class='item.icon'></i>
                        <span>{{item.name}}</span>
                    </li>
                </router-link>
            </ul>
        </div>
         <div class='quit' @click='quit'>
            <i class='iconfont icon-tuichu6'></i>
            <span>退出登录</span>
        </div>
    </div>
  </div>
</template>

<script>
import TopPage from '@/components/Common/TopPage.vue'
import { quitLogin,GetCardCount } from '../../../api/utils.js'
export default {
  name: 'setup',
  data () {
    return {
        number:"",
        setArr:[
           {
               name:'资料管理',
               path:'/s/setup/accountdetails',
               icon:'iconfont icon-gerenziliao'
           },
           {
               name:'修改密码',
               path:'/s/setup/setpwd',
               icon:'iconfont icon-dingbu_xiugaimima'
           },
        //    {
        //        name:'关于简媒',
        //        path:'/s/about',
        //        icon:'iconfont icon-guanyu'
        //    },
           {
               name:'联系我们',
               path:'/s/contact',
               icon:'iconfont icon-lianxi'
           }
        ]
    }
  },
  created(){
      GetCardCount({}).then(res => {
          if(res.data.code == 200){
            this.number = res.data.data
          }
      })
  },
  methods:{
     routerLink(){
        this.$router.push("/s/festival")
     },
     quit(){
        quitLogin({}).then(res=>{
            if(res.data.code == 200){
              this.$router.push("/")
              this.$store.dispatch('actionCategoryList', {});
            }
        })
     }
  },
  components:{
      TopPage
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
        ul{
            li{
                text-align:center;
                height:.4rem;
                line-height:.4rem;
                background-color:#fff;
                margin-bottom:7px;
                color:@blue-text-color;
                cursor:pointer;
            }
        }
    }
    .quit{
        text-align:center;
        height:.4rem;
        line-height:.4rem;
        background-color:#fff;
        color:@blue-text-color;
        cursor:pointer;
        margin-bottom:10px;
    }
  }
}
</style>
