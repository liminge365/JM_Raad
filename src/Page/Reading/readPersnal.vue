<template>
  <div class="HomePage">
    <!-- <TopPage  title='个人首页' path="/reading"></TopPage> -->
    <mt-header title="个人主页">
      <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
    </mt-header>
    <div class="reading" ref="reading">
        <div class="rdPersnalhead"> 
          <a class="rdimg">
            <img v-if='userdata.avatar == null '  src="/static/image/home/userhead_big.png" alt="">
            <img v-else  :src="userdata.avatar" alt="">
            <span v-if='userdata.name' class="username">{{userdata.name}}</span>
            <span v-else class="username">简媒用户</span>
          </a>
          <div class="rdcount">
            <span v-if="userdata.readCount">阅读数<b>{{userdata.readCount}}</b></span>
            <span v-if="userdata.articleCount">文章数<b>{{userdata.articleCount}}</b></span>
          </div>
        </div>
       <user-list></user-list>
    </div>
  </div>
</template>
<script>
  import TopPage from '@/components/Common/TopPage.vue'
  import UserList from './components/UserList.vue'
  // import {mapGetters} from 'vuex'
  import {getReadAccountinfo} from '@/api/utils.js'
  export default {
    name: 'HomePage',
    data() {
      return {
        scrollTop: 0,
        avatar: '',
        userdata: []
      }
    },
    computed: {
      // ...mapGetters([
      //   'getUserInfo',
      //   'userdata'
      // ])
    },
    components: {
      TopPage,
      UserList,
    },
    methods: {
      lastpage() {
        this.$router.go(-1)
      },
      // resDate(){
      //   let userId = this.$route.query.userId === undefined ? '' : this.$route.query.userId;
      //   this.$store.dispatch('actionUserInfo', {id:userId});
      //   this.$store.dispatch('actionAccountInfo',{id:userId});
      // }
    },
    created() {
      // this.resDate();
      let userId = this.$route.query.userId === undefined ? '' : this.$route.query.userId;
      let params = {id: userId}
      getReadAccountinfo(params).then((res)=>{
        console.log(res)
          if(res.data.code == 200){
            this.userdata = res.data.data;
          }
      })
    },
  }
</script>
<style lang="less" scoped>
  .rdPersnalhead {
    width: 90%;
    background: #fff;
    margin: .2rem 5%;
    padding: .2rem;
    box-sizing: border-box;
    border-radius: 10px;
    color: #595E62;
    .rdimg {
      display: block;
      height: .35rem;
      line-height: .35rem;
      color: #595E62;
      display: flex;
      img {
        height: .35rem;
        width: .35rem;
        border-radius: 50%;
        margin-right: .1rem;
      }
    }
    .rdcount {
      padding-top: .1rem;
      display: flex;
      align-content: space-between;
      span {
        padding-left: .4rem;
        b {
          font-weight: normal;
          color: #29B0E7;
        }
      }
    }
  }
</style>

