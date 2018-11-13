<template>
  <div class="HomePage">
    <mt-header title="文章详情">
      <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
    </mt-header>
    <div class="reading">
      <div class="homepage">
        <div class="stationList">
          <div class="article">
            <h3 class='text-justify'>
              <!--<button>移动</button>-->
              <a>{{getFindMaterialOrCorpus.title}}</a>
            </h3>
          </div>
          <div class="userbox">
            <a class="user_name_box">
                <img class='img-circle' v-if='getFindMaterialOrCorpus.img' :src="getFindMaterialOrCorpus.img" />                
                <img class='img-circle' v-else src="/static/image/home/head.png" />
                <span class="user_name" v-if='getFindMaterialOrCorpus.author'>{{getFindMaterialOrCorpus.author}}</span>
                <span class="user_name" v-else>简媒用户</span>
            </a>  
            <span class="user_time">{{getFindMaterialOrCorpus.update_time}}</span>
          </div>
          <article id="content" class="text-justify" v-html='getFindMaterialOrCorpus.content'>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    ApifindMaterialOrCorpus
  } from '../../../api/utils.js'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        mcType: 1,
        materialId: '',
        rpType: 1,
      }
    },
    computed: {
      ...mapGetters([
        'getFindMaterialOrCorpus',
      ])
    },
    created() {
      this.loadData()
    },
    methods: {
      lastpage() {
        this.$router.push('/s/page/content/Unpublished')
      },
      loadData() {
        this.materialId = this.$route.params.id;
        let queryData = {
          mcType: this.mcType,
          materialId: this.materialId,
          rpType: this.rpType
        };
        let params = {
          data: this.qs.stringify(queryData),
        };
        // ApifindMaterialOrCorpus(params.data).then((res)=>{
        //     console.log(res)
        // })
        this.$store.dispatch('actionFindMaterialOrCorpus', params);
      }
    }
  }

</script>


<style lang="less">
  .homepage {
    width: 90%;
    margin: .2rem 5%;
    padding: .2rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #EDF1F0;
  }

  .article {
    h3 {
      font-size: .16rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-word;
      a {
        color: #515151;
      }
      button {
        height: .2rem;
        line-height: .2rem;
        padding: 0 7px;
        border-radius: .15rem;
        border: none;
        background: #50C3AE;
        outline: none;
        color: #fff;
        display: inline;
        position: relative;
        top: -3px;
      }
    }
  }

  .userbox {
    height: .48rem;
    line-height: .48rem;
    border-top: 2px solid transparent;
    display: flex;
    align-items: center;
    position: relative;
    span {
      float: left;
      font-size: 14px;
      color: #787b80;
    }
    .user_name_box {
      display: flex;
      .user_name {
        width: 85px;
        overflow: hidden;
        white-space: nowrap;
        margin-left: .1rem;
      }
      img {
        width: .24rem;
        height: .24rem;
        border-radius: 50%;
        margin: auto;
      }
    }
    .user_time {
      position: absolute;
      right: 0;
    }
  }

  article {
    font-size: .12rem;
    color: #9D9D9D;
    word-break: break-all;
    p {
      letter-spacing: 1px;
      img {
        max-width: 100% !important;
        margin: 0 !important;
        transform: translateX(0) !important;
      }
      span {
        left: 0 !important;
      }
    }
  }

</style>
