<template>
  <div class="HomePage">
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Common/Footer.vue'
export default {
  name: 'setup',
  data () {
    return {
    }
  },
  components:{
      Footer
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/style/vars.less';
</style>
