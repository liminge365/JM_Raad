<template>
  <div class="accountBind">
      <p class="ab_title">账号绑定</p>
      <div class="ab_list" v-for="(value,index) in data" :key="index">
        <img class="ab_img" :src="value.logo" alt="">
        <div class="ab_cont">
          <p>{{value.name}}<i :class="value.icon"></i></p>
          <!-- <p>已有<span class="ab_sum">{{value.count}}</span>个用户绑定</p> -->
        </div>
        <router-link  class="ab_bind" :to="{path:'/s/accountgive/'+value.id}"><i class="iconfont icon-tianjia"></i>绑定账号</router-link>
      </div>
  </div>
</template>
<script>
import {getAccountBindLoad} from '../../../api/utils.js'
export default {
  data(){
    return{
      data:[
      ]
    }
  },
  components:{
   
  },
  created(){
    let _self = this;
    getAccountBindLoad().then((res) =>{
      _self.$data.data = res.data.data ;
    })
  }
}
</script>
<style scoped lang="less">
.accountBind{
  margin-left: 5%;
  margin-bottom: .1rem;
  width: 90%;
  background: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  color: #595E62;
  box-shadow: 0 0 2px 1px #EAEEF1;
  padding: 5%;
  .ab_title{
    color: #4E5357;
    font-size: 14px;
  }
  .ab_list{
    border-bottom: 1px solid #E9EBEA;
    display: flex;
    padding: 7px 0;
    .ab_img{
      width: 40px;
      height: 40px;
    }
    .ab_cont{
      flex: auto;
      margin-left: 7px;
      p{
        line-height: 40px;
      }
      .ab_sum{
        color: #29B0E7;
      }
      .icon-newchunse{
        color: #F10001;
      }
    }
    .ab_bind{
      width: .7rem;
      margin: auto;
      color: #29B0E7;
      .icon-tianjia{
        margin-right: 2px;
        position: relative;
        top: 1px;
        color: #29B0E7;
      }
    }
  }
}
</style>

