<template>
  <div class="dataAnalysis">
    <mt-header title="数据分析">
        <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        <!--<span slot="right">下载报表</span>-->
    </mt-header>
    <div class="dataList">
        <router-link v-for='(item, key) in dataAnalysis' :key='key' :to={path:item.path}>
            <span>{{item.name}}</span>
        </router-link>
    </div>
    <div class="analysis">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'publish',
  data () {
    return {
       dataAnalysis:[
           {
               name:'整体数据',
               path:'/s/dataAnalysis/whole'
           },
           {
               name:'单篇数据',
               path:'/s/dataAnalysis/oneshot'
           },
           {
               name:'排行榜',
               path:'/s/dataAnalysis/rank'
           }
       ]
    }
  },
  methods:{
      lastpage(){
        this.$router.push("/s/page/home")
      }
  },
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/vars.less';
.dataAnalysis{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .display-flex();
    .column();
    background-color:#eaf2f2;
    .dataList{
        .display-flex();
        font-size:15px;
        height:38px;
        line-height:38px;
        background-color:#fff;
        color:#2d2d2d;
        padding-left:40px;
        padding-right:40px;
        box-sizing:border-box;
        a{
            .flex();
            text-align:center;
            span{
               width:100%;
               display:block;
               cursor: pointer;
            }
        }
        .router-link-active{
            color:@primary-color;
        }
    }
    .analysis{
        .flex();
        padding:10px 20px;
        box-sizing:border-box;
        overflow-y:auto;
    }
}
</style>
