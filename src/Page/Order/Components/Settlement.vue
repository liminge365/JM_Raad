<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" 
      :bottom-all-loaded="allLoaded" 
      :autoFill="false"
      ref="loadmore">
          <div class="order_top_box">
            <div class="o_div" style="margin-right:10px;">待结算总额</div>
            <p class="o_p">￥{{getUserAmount}}</p>
          </div>
          <div class="orderListbox">
            <Nodate v-if='list.length == 0'></Nodate>
            <router-link v-else :to="{path:'/s/settlementBill',query:{id:item.order_id}}" tag="div" class="orderRecord" v-for="(item,index) in list" :key="index">
              <p v-if="item.type == 1">订单任务</p>
              <p v-if="item.type == 2">简媒广告</p>
              <p v-if="item.type == 3">传播奖励</p>
              <p class="oRnumber">订单号：<span>{{item.order_id}}</span><b class="orderMoney">￥{{item.amount}}元</b></p>
              <p><span>{{item.create_time}}</span></p>
            </router-link>
          </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { Navbar, TabItem,  TabContainer, Cell} from 'mint-ui';
  import Nodate from '@/components/Common/Nodate.vue'
  import alertBtn from '@/components/Common/alertBtn.vue'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return{
        list: [],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        page: 1,
        pageSize: 10,
        allnumber: 0
//        selected: '1',
//        accountTx:{
//          name: "提现申请",
//          messageshow: true,
//          messageMsg: '12313',
//          btnshow: 'true',
//          btnMsg: "提现"
//        },
      }
    },
    watch: {
      selected: function (val) {
        //val     切换后 id
        //    console.log(val);
      }
    },
    components:{
      Navbar,
      TabItem,
      TabContainer,
      Cell,
      alertBtn,
      Nodate
    },
    computed: {
      ...mapGetters([
        'getUserAmount',
        'getUnSettlementOrderList',
      ])
    },
    created(){
      this.loadDate()
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods:{
      lastpage(){
        this.$router.go(-1)
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          this.page += 1;
          let lastValue = this.list.length;
          if (lastValue < this.allnumber) {
            this.loadDate();
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      loadDate() {
          let cal_o={
            pageNo:this.page,
            pageSize:this.pageSize
          };
          const _this = this;
          cal_o.callback = function(res){
             if(res.result){
               res.result.map((i, v) => {
                  _this.list.push(i)
               })
               _this.allnumber = res.total
            }
          }
          this.$store.dispatch('actionUserAmount',{});
          this.$store.dispatch('actionunSettlementOrderList', cal_o);
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/style/vars.less';
  .order{
    display: flex;
    flex-direction: column;
  }
  .order_top_box{
    box-sizing: border-box;
    display: flex;
    .o_div{
      color: #595E62;
      width: 60px;
    }
    .o_p{
      color: #29B0E7;
      flex: auto;
      text-align: left;
    }
    .button{
      width: .4rem;
      padding: 1px 3px;
      border-radius: 3px;
      background: #29B0E7;
      color: #fff;
      border: none;
      font-size: 12px;
    }
  }
  .orderListbox, .order_top_box{
    width: 90%;
    margin: .2rem 5%;
    padding: .2rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 2px 1px #EAEEF1;
    box-shadow: 0 0 2px 1px #EAEEF1;
  }

  .orderRecord, .orderApply{
    border-bottom: 1px solid @gray-border-color;
    padding: .1rem 0;
    color: @gray-text-color;
    .oRnumber{
      width: 100%;
    }
    
    b{
      float: right;
      font-weight: normal;
    }
    .colorgreen{
      color: #64AD5C;
    }
    .coloryellow{
      color: #F7C264;
    }
    .orderMoney{
      color: @primary-color;
    }
  }
</style>
