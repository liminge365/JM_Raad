<template>
     <div class="HomePage">
        <TopPage  title='账号' path="/account"></TopPage>
        <div class="account_tab">
            <div class="account_tab_box">
                <router-link to="/s/account/accountBind">账号绑定</router-link >
                <router-link to="/s/account/accountList">账号列表</router-link >
            </div>  
        </div>
        <div class="account" ref="scroll" >
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <Footer></Footer>
    </div> 
    <!--<div class="HomePage">
        <TopPage  title='账号' path="/account"></TopPage>
        <div class="account">
            <div class="comingSoon">
                <div class="soon">
                    <img src="/static/image/home/comingSoon.jpg" alt="">
                    <p>敬请期待...</p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>-->
</template>

<script>
import TopPage from '@/components/Common/TopPage.vue'
import Footer from '@/components/Common/Footer.vue'
import accountBind from './accountBind/accountBind.vue'
import accountList from './accountList/accountList.vue'
export default {
    name: 'Account',
    data () {
        return {
        }
    },
    components:{
        TopPage,
        Footer,
        accountBind,
        accountList
    },
    beforeRouteLeave(to, from, next){
        this.scrollTop = this.$refs.scroll.scrollTop;
        next();
    },
    updated () {
        this.$nextTick(function(){
            this.$refs.scroll.scrollTop =this.scrollTop;
        }) 
    },
}
</script>

<style scoped lang="less">
@import '../../assets/style/vars.less';
.account{
  padding-top: .1rem;
  .comingSoon{
      padding:10px 20px;
      box-sizing:border-box;
      .soon{
          background:#fff;
          border-radius:5px;
          height:330px;
          .display-flex();
          .align-item();
          .column();
          .justify-content();
          img{
              width:50%;
          }
          p{
              color:#b8b8b8;
              margin-top:10px;
          }
      }
  }
}
.account_tab{
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  .account_tab_box{
    width: 60%;
    margin-left: 20%;
    display: flex;
      a{
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #595E62;
      }
      .router-link-active{
          color: #29b1e6;
      }
  }
}
.scroll{
    height: auto;
}
</style>
