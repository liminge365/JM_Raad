<template>
  <div class="contact">
    <content-top title='关于简媒'></content-top> 
    <div class="contant-us">
      <div class="contant-body">
         <h2>简媒简媒接单是什么？</h2>
         <p class='ordername'>你已获得简媒简媒资格，代理接单是我们根据粉丝和阅读质量定向邀请的，xxx。</p>
         <h2>开通代理接单有什么好处？</h2>
         <p class='ordername'>代理多多；</p>
         <p>收益多多；</p>
         <p>客户精准匹配；</p>
         <p>专人助理协助</p>
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
        padding: 0 20px 108px;
        box-sizing: border-box;
        h2{
            font-size:14px;
            color:@blue-text-color;
            padding-top:.26rem;
        }
        p{
            font-size: 12px;
            color:@gray-text-color;
            line-height:1.6;
        }
        .ordername{
            padding-top:10px;
        }
    }
  }
}
</style>