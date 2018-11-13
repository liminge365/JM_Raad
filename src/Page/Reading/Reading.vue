<template>
  <div class="HomePage">
        <TopPage  title='阅读' path="/reading"></TopPage>
        <navBar @childEvent="parentEvent"></navBar>
        <div class="reading" ref="reading">
            <keep-alive>
                <reading-list></reading-list>
            </keep-alive>
        </div>
        <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/components/Common/Footer.vue'
import TopPage from '@/components/Common/TopPage.vue'
import navBar from './components/navBar'
import readingList from './components/readingList'
export default {
  name: 'HomePage',
  data () {
    return {
      scrollTop: 0,
      queryId:null,
      clickIndex:'',
      distance:'',
      getPath:''
    }
  },
  components:{
      Footer,
      TopPage,
      navBar,
      readingList
  },
  methods:{
     parentEvent(index){
       this.$store.dispatch('actionsAdd',index);
     }
  },
  beforeRouteLeave(to, from, next){
      this.scrollTop = this.$refs.reading.scrollTop;
      next();
  },
  activated () {
      this.$nextTick(function(){
          this.$refs.reading.scrollTop = this.scrollTop;
      }) 
  }
}
</script>

<style scoped lang="less">
.reading{
  padding-top: 25px;
}
</style>
