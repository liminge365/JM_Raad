<template>
      <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :autoFill = false
      ref="loadmore"
      class="loadmore">
        <div class="orderListbox">
          <div class="orderApply" v-for="(value,index) in getWithdrawList" :key="index">
            <p><span>{{value.accountName}}</span><b class="orderMoney">￥{{value.amount/100}}</b></p>
            <p class="od_conbox">
                <span class="od_namebox"><i>订单号：</i><a class="od_num" >{{value.encodeId}}</a></span>
                <span class="od_right od_load coloryellow">{{value.status}}</span>
            </p>
            <div class="recordContent">
              <div class="rctime">{{value.time}}</div>
              <div class="rcp colorgreen coloryellow">{{value.info}}</div>
            </div>
          </div>
          
          <Nodate v-if='orderList'></Nodate>
        </div>
      </mt-loadmore>
</template>
<script>
import {mapGetters} from 'vuex'
import Nodate from '@/components/Common/Nodate.vue'
export default{
  name: 'orderListbox',
  computed:{
		...mapGetters([
      'getWithdrawList',
		])
  },
  components:{
    Nodate
  },
  data(){
    return{
      allLoaded: false,
      page: 1,
      size: 10,
      orderList: false,//暂无数据
    }
  },
  created(){
      let self = this;
      let formData = new FormData();
      formData.append('page',self.page);
      formData.append('size',self.size);
      let params = {data:formData,page:self.page};
			params.callback= function(orders){
				if(orders.length === 0 ){
          self.orderList = true;
          self.allLoaded = true;
				}
			};
      this.$store.dispatch('actionWithdrawList',params);
  },
  methods:{
    loadBottom(){
      let self = this;
      this.page += 1;
      let formData = new FormData();
      formData.append('page',self.page);
      formData.append('size',self.size);
			let params = {data:formData,page:self.page};
			params.callback= function(orders){
				if(orders.length === 0 ){
					self.allLoaded = true;
				}
        self.$refs.loadmore.onBottomLoaded();
			};
      this.$store.dispatch('actionWithdrawList',params);
    }
  },
  updated(){
    let rcp = document.getElementsByClassName('rcp')
      for(let i=0;i<rcp.length;i++){
        if(parseInt(rcp[i].innerHTML.length)>5){
          console.log(parseInt(rcp[i].innerHTML.length))
          rcp[i].style["cssFloat" in rcp[i].style ?  "cssFloat" : "styleFloat"] = 'left';
          rcp[i].style.width = '100%';
          rcp[i].style.textAlign = 'left';
        }else{
          rcp[i].style["cssFloat" in rcp[i].style ?  "cssFloat" : "styleFloat"] = 'right'
          rcp[i].style.width = '50px';
          rcp[i].style.textAlign = 'right';
          
        }
      }
  }
}

</script>
<style lang="less" scoped>
.recordContent::after{content:'';display:block;height:0;visibility:hidden;clear:both;}
.recordContent{
  // display: flex;
  // align-content: space-between;
  .rcp{
    float: right;
  }
  .rcordernum{
    float: left;
  }
  .rctime{
    float: left;
    width: 50%;
  }

}
.od_conbox{
    justify-content: space-between;
    .od_right{
        width: 25%;
        text-align: right;
        float: right;
    }
    .od_namebox{
        width: 75%;
        float: left;
        display: flex;
        justify-content: space-between;
        i{
            min-width: 50px;
            font-style: normal;
            height: 20px;
            line-height: 20px;
        }
        .od_num{  
            width: 75%;
            overflow: hidden;
            height: 20px;
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #9da2a3;
        }
    }
}
</style>

