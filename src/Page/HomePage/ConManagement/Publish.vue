<template>
  <div class="getPublish">
    <div class="setHeight">
      <mt-header title="内容管理">
        <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
      </mt-header>
      <div class="publish-top">
        <router-link v-for='(item,index) in publishData' :key='index' :to='{path:item.path}'>
          <span>{{item.title}}</span>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
    <!--<Footer></Footer>-->
  </div>
</template>
<script>
  import Footer from '@/components/Common/Footer.vue'
  export default {
    name: 'publish',
    data() {
      return {
        selected: 1,
        publishData: [{
            id: 0,
            title: '未发布',
            path: '/s/page/content/Unpublished',
          },
          {
            id: 1,
            title: '已发布',
            path: '/s/page/content/lauched',
          },
          {
            id: 2,
            title: '定时发布',
            path: '/s/page/content/timerelease',
          }
        ]
      }
    },
    methods: {
      lastpage(){
        this.$router.push("/s/page/home")
      }
    },
    components: {
      Footer
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .getPublish {
    flex: 1;
    position: relative;
    .setHeight{
        position: absolute;
        top:0;
        bottom:0;
        width:100%;
        .display-flex();
        .column();
    }
  }
  .publish-top {
    .display-flex();
    .align-item();
    height: 40px;
    padding-left: .4rem;
    padding-right: .4rem;
    box-sizing: border-box;
    a {
      .flex();
      font-size: .14rem;
      text-align: center;
      color: #282828;
    }
    .router-link-active {
      color: @primary-color;
    }
  }

</style>
