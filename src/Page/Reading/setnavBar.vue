<template>
  <transition>
    <div class="setnavBar">
      <router-link class="a_icon" to="/reading"><i class="iconfont icon-bt_quxiao_b"></i></router-link>
      <p class="s_title">点击删除以下频道</p>
      <div class="newnav">
        <div class="always allbabel">全部</div>
        <div class="always" v-for="(item,index) in topData" :key="index">
          {{item.name}}
        </div>
      </div>
      <p class="s_title">点击增加以下频道</p>
      <div class="oldnav">
        <div class="always" v-for="(item,index) in bottomData" :key="index">
          {{item.name}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'getCategoryList'
      ])
    },
    data() {
      return {
        topData: [
          {name: "游戏", router: "readbook/allBar", id: 1},
          {name: "互联网", router: "/tianjin", id: 2},
          {name: "搞笑", router: "/beijing", id: 3},
        ],
        bottomData: [
          {name: "科技", router: "/beijing", id: 10},
          {name: "历史", router: "/beijing", id: 11},
        ]
      }
    },
    created() {
      let self = this;
      let category_params = {};
      category_params.callback = function () {

      };
      //this.$store.dispatch('actionCategoryList', category_params);
    },
    methods: {}
  }
</script>
<style scoped lang="less">
  // .fade-enter，.fade-enter-active{
  //     opacity: 1;
  // }
  // .fade-in，.fade-in-active{
  //     opacity: 0;
  // }
  .newnav::after, .oldnav::after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  .a_icon {
    display: block;
    height: 30px;
    float: right;
    .icon-bt_quxiao_b {
      float: right;
      margin: .1rem;
    }
  }

  .s_title {
    width: 100%;
    clear: both;
    padding-left: .1rem;
    box-sizing: border-box;
    color: #595E62;
  }

  .always {
    min-width: .8rem;
    width: .8rem;
    height: .3rem;
    text-align: center;
    line-height: .3rem;
    border: 1px solid #ccc;
    font-size: 14px;
    margin: .1rem;
    margin-right: 0;
    float: left;
  }
</style>

