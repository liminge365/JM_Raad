<template>
  <div class='noneDate'>
    <img src="/static/image/home/nodata.png" alt="">
    <p>暂无数据</p>
  </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        }
    }
</script>
<style lang="less">
  @import '../../assets/style/vars.less';
  .noneDate {
     width:100%;
    .display-flex();
    .align-item();
    .column();
    .justify-content();
    height:300px;
    img {
      width: 50%;
      opacity: 0.3;
    }
    p {
      color: #b8b8b8;
      margin-top: 10px;
    }
  }
</style>
