<template>
  <mt-header :title="this.title">
    <img slot="left" src="/static/image/home/JMwhite.png" alt="" @click='homeClick'>
    <!--<i class='iconfont icon-tishi' slot="right" @click='handleclick'><b></b></i>-->
  </mt-header>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props:{
      title:String,
      path:String
    },
    methods:{
      handleclick(){
        this.$router.push(this.path + "/news");
      },
      homeClick () {
        this.$router.push("/s/page/home");
      }
    }
  }
</script>
