<template>
  <div class="nav_box">
    <div class="nav" ref="nav">
      <div class="readbook-content" ref="readbookContent">
        <router-link
          v-for="(item,index) in getCategoryList" :key="index"
          :to="{path:'/reading',query:{id:item.id}}"
          :class="{active:item.id == num}">
          <li @click="selectMenu(index,$event,item.id)">{{item.name}}</li>
        </router-link>
      </div>
    </div>
    <!--<router-link class="jia" to="/setnavBar"><i class='iconfont icon-jiahao'></i></router-link>-->
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'getCategoryList'
      ])
    },
    data() {
      return {
        num: -1,//导航默认显示
        scroll: {},//better-scroll
        category_params: {},
        distance: '',//导航位置
      }
    },
    created() {
      this.$emit('childEvent', this.$route.query.id)
      
      let self = this;
      this.category_params = {};
      this.category_params.callback = function () {
        //初始化better-scroll
        self.$nextTick(() => {
          self.initscroll();
          let lis = self.getCategoryList.length;
          document.querySelector('.readbook-content').style.width = (lis * 60) + 'px';
        });
      };
      this.$store.dispatch('actionCategoryList', this.category_params);
    },
    watch: {
      '$route': 'getPath'
    },
    methods: {
      getPath:function(){
        this.num = this.$route.query.id === undefined || this.$route.query.id === '' ? -3 : this.$route.query.id;
      },
      //滚动
      initscroll: function () {
        let options = {
          scrollX: true,
          click: true,
          tap: true,
          probeType: 3,
          useTransition:false,  // 防止iphone微信滑动卡顿
        };
        this.scroll = new BScroll(this.$refs.nav, options)//滚动初始化
      },
      selectMenu: function (index, event, index2) {
        this.$emit('childEvent', index2)
        //自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
        if (!event._constructed) {
          return;
        }
        //运用BScroll接口，滚动到相应位置
        let foodList = this.$refs.nav.getElementsByClassName('readbook-content')[0].children;
        //获取对应元素的列表
        let el = foodList[index];
        //设置滚动时间
        this.scroll.scrollToElement(el, 300, true);
        this.num = index2;
      },
    },
    updated(){
      this.getPath();
      //页面刷新，导航位置不变
      if(this.$route.query.id>0){
        this.distance = -((this.$route.query.id -1)*60+23)
        this.$(".readbook-content")[0].style.transform = 'translate('+this.distance+'px,0px) translateZ(0px)';
      }
    },
  }
</script>
<style lang="less" scoped>
  .nav_box {
    display: flex;
    height: 40px;
    line-height: 40px;
    // position: absolute;
    // top: 0;
    overflow: hidden;
    width: 100%;
    background: #fff;
    .nav {
      flex: 8;
      overflow: hidden;
      .readbook-content {
        a {
          display: inline-block;
          width: 60px;
          text-align: center;
          float: left;
          color: #2A2A2A;
        }
        .active {
          color: #29B0E7;
        }
        .router-link-exact-active{
          color: #29B0E7;
        }
      }
    }
    .jia {
      flex: 1;
      max-width: 40px !important;
      height: 40px;
      border-left: 1px solid #ccc;
      box-shadow: 0px 0px 5px 0px #ccc;
      .icon-jiahao:before {
        content: "\E66B";
        display: block;
        position: relative;
        top: 0;
        left: 10px;
        font-size: 21px;
        color: #2AB1E8;
      }
    }
  }
</style>

