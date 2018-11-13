<template>
  <mt-header :title="this.title">
    <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
  </mt-header>
</template>
  
<script>
  export default {
    props:{
      title:String
    },
    methods:{
      lastpage(){
        this.$router.go(-1)
      }
    },
    data () {
      return {
      }
    }
  }
</script>