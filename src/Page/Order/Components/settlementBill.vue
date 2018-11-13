<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 待结算详情 -->
            <div class="orderAddDele">
                <div class="orderDtail" >
                    <div class="od_title" v-if="getUnSettlementOrderDetail.type == 1">
                        <p >订单任务:{{getUnSettlementOrderDetail.title}}</p>
                        <p>订单号：<span>{{getUnSettlementOrderDetail.id}}</span></p>
                        <p><span class="od_load">￥{{getUnSettlementOrderDetail.amount}}元<span></span></span></p>
                        <p>收入总额</p>
                    </div>
                    <div class="od_title" v-else-if="getUnSettlementOrderDetail.type == 2">
                      <p ><span @click='routerTo(getUnSettlementOrderDetail.corpusId)'>{{getUnSettlementOrderDetail.title}}</span></p>
                      <p>订单号：<span>{{getUnSettlementOrderDetail.id}}</span></p>
                      <p><span class="od_load">￥{{getUnSettlementOrderDetail.amount}}元<span></span></span></p>
                      <p>收入总额</p>
                    </div>
                    <div class="od_title" v-else-if="getUnSettlementOrderDetail.type == 3">
                      <p ><span @click='routerTo(getUnSettlementOrderDetail.corpusId)'>{{getUnSettlementOrderDetail.title}}</span></p>
                      <p>订单号：<span>{{getUnSettlementOrderDetail.id}}</span></p>
                      <p><span class="od_load">￥{{getUnSettlementOrderDetail.amount}}元<span></span></span></p>
                      <p>收入总额</p>
                    </div>

                    <div v-if=" getUnSettlementOrderDetail.type != 1 " class="od_filter">
                        <span id="0" class="sort clicks"  @click="sortData">按次查看</span>
                        <span>|</span>
                        <span id="1" class="sort"  @click="sortData">按小时查看</span>
                        <span>|</span>
                        <span id="2" class="sort"  @click="sortData">按天查看</span>
                    </div>
                    <div class="od_content" v-for="(item,index) in getUnSettlementOrderSubList" :key="index">
                        <div class="od_list">
                            <!-- <p><span>{{value.time}}</span><span class="od_right od_load">$213元</span></p>
                            <p>
                                <span>流水号：<span>312313</span></span>
                                <span class="od_right od_load">任务奖励</span>
                            </p> -->
                            <template v-if=" getUnSettlementOrderDetail.type == 1 ">
                                <p>
                                  <span>{{item.account_name}}@{{item.account_type}}: <a :href="item.url">{{item.title}}</a></span>
                                    <span class="od_right od_load">￥{{item.amount}}元</span>
                                </p>
                                <p  class="od_conbox">
                                    <span v-if="item.timeType == 0" class="od_namebox"><i>流水号：</i><span class="od_num">{{item.id}}</span></span>
                                    <span v-if="item.timeType != 0" class="od_namebox"><i></i><span class="od_num"></span></span>
                                    <span class="od_right">任务完成</span>
                                </p>
                            </template>
                            <template v-else-if=" getUnSettlementOrderDetail.type == 2">
                                <p>
                                <span>{{item.date}}</span>
                                <span class="od_right od_load">￥{{item.amount}}元</span>
                                </p>
                                <p  class="od_conbox">
                                    <span v-if="item.timeType == 0" class="od_namebox"><i>流水号：</i><span class="od_num">{{item.id}}</span></span>
                                    <span v-if="item.timeType != 0" class="od_namebox"><i></i><span class="od_num"></span></span>
                                    <span class="od_right">任务完成</span>
                                </p>
                            </template>
                            <template v-else-if=" getUnSettlementOrderDetail.type == 3">
                                <p>
                                <span>{{item.date}}</span>
                                <span class="od_right od_load">￥{{item.amount}}元</span>
                                </p>
                                <p  class="od_conbox">
                                    <span v-if="item.timeType == 0" class="od_namebox"><i>流水号：</i><span class="od_num">{{item.id}}</span></span>
                                    <span v-if="item.timeType != 0" class="od_namebox"><i></i><span class="od_num"></span></span>
                                    <span class="od_right">任务完成</span>
                                </p>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
  export default {
    props:{
    },
    data () {
      return {
            name: '',
            list: [1,2,3,4,5],
            orderId:'',
            groupType:0
      }
    },
    computed:{
        ...mapGetters([
          'getUnSettlementOrderDetail',
          'getUnSettlementOrderSubList'
        ])
    },
    watch: {
        '$route': 'getPath'
    },
    created(){
      this.orderId = this.$route.query.id;
      this.$store.dispatch('actionunSettlementOrderDetail',{id:this.orderId});
      this.$store.dispatch('actionunSettlementOrderSubList', {id:this.orderId});
    },
    methods:{
        lastpage(){
            this.$router.go(-1)
        },
        routerTo(corpusPlain){

          this.$store.dispatch('actionsReadnum', this.$store.state.Readnum++)
          this.$router.push(`/readDtail/${corpusPlain}/0/0`)
        },
        //排序
        sortData(e){
            
            this.$(e.currentTarget).toggleClass('clicks');
            this.$(e.currentTarget).siblings().removeClass('clicks');
            this.groupType = this.$(e.currentTarget)[0].id;
            this.orderId = this.$route.query.id;
            this.$store.dispatch('actionunSettlementOrderSubList',{id: this.orderId,timeType: this.groupType});
        }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
.orderAddDele{
    width: 90%;
    margin: .2rem 5%;
    padding: .2rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 2px 1px #EAEEF1;
    box-shadow: 0 0 2px 1px #EAEEF1;
    color: #595E62;
    // display: none;
}
a{
    color: #595E62;
}
.od_load{
    color: #2ac3de;
}

.orderDtail{
    .od_right{
        float: right;
    }
    .od_title{
        min-height: .6rem;
        padding: .12rem .2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #DADADA;
    }
    .od_filter{
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        padding-left: .2rem;
        display: flex;
        span{
            float: left;
            margin-right: 5%;
        }
        .clicks{
            color: #2ac3de;
        }
    }
    .od_list{
        height: .6rem;
        padding: .12rem .2rem;
        margin-top: 5px;
        box-sizing: border-box;
        .orderName{
            width: 63%;
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
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
                    min-width: 60px;
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
                }
            }
        }
    }
}
.orderContent{
    padding: .12rem .2rem;
}
</style>

