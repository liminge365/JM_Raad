<template>
     <div class="HomePage">
       <content-top title='消息通知'></content-top>
       <div class="publish">
           <div class="news">
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
               <p>开始的开始疯狂地<span>￥1200.00元</span>浪费大家看了看看见路上的<span>说的可都是</span></p>
           </div>
       </div>
       <Footer></Footer>
  </div>
</template>
<script>
  import Footer from '@/components/Common/Footer.vue'
  import ContentTop from '@/components/Common/ContentTop.vue'
  export default {
    name: 'news',
    data () {
      return {
      }
    },
    components:{
      Footer,
      ContentTop
    }
  }
</script>
<style lang="less" scoped>
@import '../../../assets/style/vars.less';
.publish{
    padding:10px 20px;
    box-sizing: border-box; 
    .news{
      background-color: #fff;
      border-radius:5px;
      padding:10px 20px;
      box-sizing:border-box;
      p{
          color:#9ba0a1;
          border-bottom: 1px solid @gray-border-color;
          padding-top:10px;
          padding-bottom:10px;
          &:last-child{
              border-bottom:0;
          }
          span{
            color:@primary-color;
          }
      }
    }
}
</style>
