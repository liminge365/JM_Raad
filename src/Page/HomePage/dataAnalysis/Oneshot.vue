<template>
  <div class="whole">
      <div class="wholeList" v-if='getCorpus.length != 0'>
        <div class="publish-list">
          <dl v-for="(value,index) in getCorpus" :key="index">
            <dt>
              <img v-if='!value.img' src="/static/image/home/userhead_big.png" alt="" />
              <img v-else :src="value.img" alt="">
            </dt>
            <dd>[{{value.type}}]{{value.title}}</dd>
            <router-link :to="{path:'/s/OneDataBar',query:{Id:value.id}}" class="aicon"><i class="iconfont icon-xuanzhongpinpaiqushi"></i></router-link>
          </dl>
        </div>
      </div>
      <div class="noDataBox" v-else>
        <Nodate></Nodate>
      </div>
  </div>
</template>
<script>
  import bus from '@/eventJs/bus.js'
  import {
    mapGetters
  } from 'vuex'
  import Nodate from '@/components/Common/Nodate.vue'
  export default { 
    name: 'whole',
    data() {
      return {
      }
    },
    components: {
      Nodate
    },
    computed: {
      ...mapGetters([
        'getCorpus'
      ])
    },
    created() {
      let self = this;
      let da = {};
      let params = {
        data: this.qs.stringify(da),
      };
      this.$store.dispatch('actionApiMobileAjaxCorpusList', params);
    }
  }

</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';

  .wholeList {
    background-color: #fff;
    border-radius: 5px;
    padding: 18px 20px 40px;
    box-sizing: border-box;
  }

  .noDataBox {
    background-color: #fff;
    border-radius: 5px;
    padding: 18px 20px 40px;
    box-sizing: border-box;
  }

  .publish-list {
    dl {
      .display-flex();
      .align-item();
      margin-top: .12rem;
      position: relative;
      dt {
        width: 20%;
        img {
          width: 100%;
          height: auto;
        }
      }
      dd {
        width: 65%;
        margin-left: 5%;
        word-break: break-all;
        color: @blue-text-color;
        font-weight: 800;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

      }
      .aicon {
        position: absolute;
        right: 0;
        .icon-xuanzhongpinpaiqushi {

          color: #2AB7E4;
          font-weight: normal;
          font-size: 23px;
        }
      }
    }
  }

</style>
