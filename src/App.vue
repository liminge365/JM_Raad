<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    console.log(this.$route)
  }
}
</script>
<style lang='less'>
@import "./assets/style/public.less";
.HomePage{
   position: absolute;
   top: 0;
   bottom: 0;
   width: 100%;
  .display-flex();
  .column();
  .account,.order,.reading,.publish{
    .flex();
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
    background-color:#eaf2f2;
  }
}
</style>
