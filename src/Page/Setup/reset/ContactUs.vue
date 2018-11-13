<template>
  <div class="contact">
    <content-top title='联系我们'></content-top> 
    <div class="contant-us">
      <div class="contant-body">
         <img src="/static/image/home/ewm2.jpg" alt="">
         <p>简媒客服</p>
         <img src="/static/image/home/ewm1.jpg" alt="">
         <p>简媒公众号</p>
      </div>
    </div>
  </div>
</template>
<script>
import ContentTop from '@/components/Common/ContentTop.vue'
export default {
  name: 'contact',
  data () {
    return {
    }
  },
  components:{
      ContentTop
  }
}
</script>

<style lang='less' scoped>
@import '../../../assets/style/vars.less';
.contact{
  position:absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .display-flex();
  .column();
  .contant-us{
    .flex();
    overflow-y:auto;
    background-color:#eaf2f2;
    padding: 10px 20px 0;
    .contant-body{
        background-color: #fff;
        border-radius: 5px;
        padding-bottom:44px;
        img{
            width:40%;
            margin-left:30%;
            margin-top:44px;
        }
        p{
            text-align: center;
            color:@gray-text-color;
        }
    }
  }
}
</style>