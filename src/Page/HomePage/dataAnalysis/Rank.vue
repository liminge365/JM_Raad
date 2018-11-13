<template>
  <div class="rank">
    <targetBar class="zhibiaoAll" :targetBar='zhibiaoAll'></targetBar>
    <targetBar class="zhibiaoType" :targetBar='zhibiaoType'></targetBar>
    <targetBar class="zhibiaoTime" :targetBar='zhibiaoTime'></targetBar>
    <div class="rankList pagestatus">
      <h4>TA的个人排行榜</h4>
      <section class="chartTitle">
        <span @click="$('.zhibiaoTime').show()">{{title1}}<i class="iconfont icon-xiayibu"></i></span>
        <span @click="$('.zhibiaoType').show()">{{title2}}<i class="iconfont icon-xiayibu"></i></span>
        <span @click="$('.zhibiaoAll').show()">{{title3}}<i class="iconfont icon-xiayibu"></i></span>
      </section>
      <ul v-if='getSortCorpus.length != 0'>
        <li  v-for="(value,index) in getSortCorpus" :key="index">
          <b>{{index+1}}</b>
          <span>{{value.count}}</span>
          <a @click="goreadDtail">[{{value.type}}]{{value.title}}</a>
          <router-link :to="{path:'/s/OneDataBar',query:{Id:value.corpusId}}" class="aicon"><i class="iconfont icon-xuanzhongpinpaiqushi"></i></router-link>
        </li>
      </ul>
      <Nodate v-else></Nodate>
    </div>
  </div>
</template>
<script>
  import targetBar from './targetBar.vue';
  import {mapGetters} from 'vuex'
  import bus from '@/eventJs/bus.js'
  import Nodate from '@/components/Common/Nodate.vue'
  export default {
    name: 'rank',
    components:{
      targetBar,
      Nodate
    },
    computed: {
      ...mapGetters([
        'getSortContent',
        'getSortCorpus'
      ])
    },
    data () {
      return {
        type:'',
        articleOrder:2,
        days:30,
        title1:'近30天',
        title2:'阅读量',
        title3:'全部',
        zhibiaoTime:{
          name: '指标选择',
          zuId: 1,
          list:[
            {name:'近30天',id:1},
            {name:'近15天',id:2},
            {name:'近7天',id:3},
          ],
        },
        zhibiaoType:{
          name: '指标选择',
          zuId: 2,
          list:[
            {name:'阅读量',id:2},
            {name:'推荐量',id:1},
            {name:'评论量',id:3},
            {name:'转发量',id:4},
            {name:'收藏量',id:5},
            {name:'点赞量',id:6},
          ],
        },
        zhibiaoAll:{
          name: '指标选择',
          zuId: 3,
          list:[
            {name:'全部',id:1},
          ],
        },
      }
    },
    created(){
      bus.$on('Rank',this.getdata);
      this.loadData();
    },
    beforeDestroy () {
      bus.$off('Rank',this.getdata)
    },
    methods:{
      getdata(msg){
        if(msg.zuId == 1){
          if(msg.ulli_Id == 1){
            this.days = 30;
            this.title1 = '近30天';
          }else if(msg.ulli_Id == 2){
            this.days = 15;
            this.title1 = '近15天';
          }else if(msg.ulli_Id == 3){
            this.days = 7;
            this.title1 = '近7天';
          }
        }else if(msg.zuId == 2){
          if(msg.ulli_name == ''){
            this.articleOrder = 2;
            this.title2 = '阅读量';
          }else{
            this.articleOrder = msg.ulli_Id;
            this.title2 = msg.ulli_name;
          }
        }else if(msg.zuId == 3){
          if(msg.ulli_name == '' ||  msg.ulli_Id == 1){
            this.type = '';
            this.title3 = '全部';
          }else{
            this.type = msg.ulli_Id;
            this.title3 = msg.ulli_name;
          }
        }
        this.loadData();
      },
      goreadDtail(){
        // this.$router.push(`/readDtail/${corpusPlain}/0/0`)
        console.log('通过this.$router.push(`/readDtail/${corpusPlain}/0/0`)跳转了')
      },
      formatterCount(list){
        for(var i=0;i<list.length;i++){
          if(list[i].count<=1000){
            list[i].count=list[i].count;
          }
          else{
          list[i].count=Math.floor(list[i].count/1000)+'K+';
          }
        }
      },
      loadData(){
        let da = {'type': this.type,
          'articleOrder': this.articleOrder,
          'days':this.days};
        let params = {data: this.qs.stringify(da)};
        this.$store.dispatch('actionAjaxSortCorpus', params);
        params.callback = (res) => {
          this.formatterCount(res)
        }
        let params_content ={};
        let self = this;
        params_content.callback = function(res){
          self.zhibiaoAll.list = [];
          self.zhibiaoAll.list.push({name:'全部',id:1});
          for (let i=0; i< res.length; i++) {
            self.zhibiaoAll.list.push({name:res[i].first_name,id:res[i].type_id});
          }
        };
        this.$store.dispatch('acitonAjaxSortContent',params_content);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
.rank{
    background-color: #fff;
    border-radius: 5px;
    .icon-xiayibu::before{
    font-size: 12px;
    color: @primary-color;
    display: inline-block;
    transform: rotate(90deg);
    margin-left: 5px;
  }
  .chartTitle{
    border-bottom: 1px solid #d7dcdc;
    height: .45rem;
    line-height: .45rem;
    color: @blue-text-color;
    span{
      margin-right: .1rem;
      color: @primary-color;
    }
  }
  //每日排行
  .rankList{
    width: 100%;
    background: #fff;
    border-collapse: collapse;
    box-shadow: 0 0 2px 1px #EAEEF1;
    padding:.22rem .19rem .22rem .19rem;
    box-sizing: border-box;
    h4{
      font-size: .14rem;
      color: #40474e;
      font-weight: normal;
    }
    ul{
      margin-top: 13px;
      li{
        height: .2rem;
        line-height: .2rem;
        margin-top: 7px;
        margin-bottom: 5px;
        position: relative;
        .icon-xuanzhongpinpaiqushi{
          position: absolute;
          right: 0;
          top: 0;
          color: #2AB7E4;
          font-weight: normal;
          font-size: 23px;

        }
        b{
          width: .2rem;
          height: .2rem;
          line-height: .2rem;
          display:block;
          background: #32B6E7;
          color: #fff;
          text-align: center;
          border-radius: 50%;
          margin-left: .04rem;
          margin-right: .04rem;
          font-weight: 400;
          float: left;
        }
        span{
          padding: 0 5px;
          height: .17rem;
          line-height: .17rem;
          display: block;
          background: #50C3AE;
          color: #fff;
          text-align: center;
          border-radius: .17rem;
          margin-right: .06rem;
          float: left;
          margin-top: .01rem;
        }
        a{
          width: 68%;
          color: #7a7f81;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          cursor: pointer;
          display: block;
        }
      }
    }
  }
}
  
</style>
