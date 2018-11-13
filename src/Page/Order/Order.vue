<template>
  <div class="HomePage">
      <TopPage  title='订单管理' path="/order"></TopPage>
      <div class="order" ref="scroll">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import TopPage from '@/components/Common/TopPage.vue'
import Footer from '@/components/Common/Footer.vue'
export default {
  name: 'Order',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      TopPage,
      Footer
  },
  beforeRouteLeave(to, from, next){
      this.scrollTop = this.$refs.scroll.scrollTop;
      next();
  },
  updated () {
      this.$nextTick(function(){
          this.$refs.scroll.scrollTop = this.scrollTop;
      }) 
  }
}
</script>

