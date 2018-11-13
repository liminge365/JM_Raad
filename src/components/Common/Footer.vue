<template>
  <div class="footer">
     <router-link to="/s/page" @click.native='statistics'>
      <i class="iconfont icon-home"></i>   
      <p>首页</p>
     </router-link>
     <router-link v-if='getAllNumber == null || getAllNumber == ""' to='/reading' @click.native='statistics'>
      <i class="iconfont icon-news"></i>   
      <p>阅读</p>
     </router-link>
     <router-link v-else :to="'/reading?id=' + getAllNumber" @click.native='statistics'>
      <i class="iconfont icon-news"></i>   
      <p>阅读</p>
     </router-link>
     <router-link to="/s/account" @click.native='statistics'>
      <i class="iconfont icon-similar-product"></i>   
      <p >账号</p>
     </router-link>
     <router-link to="/s/order" @click.native='statistics'>
      <i class="iconfont icon-signed"></i>   
      <p>订单</p>
     </router-link>
     <router-link to="/s/setup" @click.native='statistics'>
      <i class="iconfont icon-setting"></i>   
      <p>我的</p>
     </router-link>
  </div>
</template>

<script>
    import {
    statistics
  } from '../../plugins/statistics.js'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    methods:{
      statistics(){
        statistics();
      }
    },
    computed: {
      ...mapGetters([
        'getAllNumber'
      ])
    },
  }
</script>

<style lang="less">
  @import '../../assets/style/vars.less';
  .footer {
    .display-flex();
    .align-item();
    height: .45rem;
    background-color: @primary-color;
      a{
        width: 20%;
        height: .43rem;
        display: block;
        color: #fff;
        text-align: center;
        i {
          display: block;
          margin-top: 5px;
        }
      }
      .router-link-active{
        border-bottom: 2px solid #fff;
      }
  }
</style>