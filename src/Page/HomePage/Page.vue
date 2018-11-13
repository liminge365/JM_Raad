<template>
  <div class="HomePage">
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Common/Footer.vue'
export default {
  name: 'page',
  data () {
    return {
    }
  },
  components:{
      Footer,
  }
}
</script>
