<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 待结算详情 -->
            <div class="orderAddDele">
                <div class="orderDtail" v-if="getOrderInfos.order != undefined">
                    <div class="od_title">
                        <p>订单任务：<a @click="nextPage">{{getOrderInfos.order.name}}</a></p>
                        <p>订单号：<span>{{getOrderInfos.order.code}}</span></p>
                        <p v-if="getOrderInfos.order.state != 4"><span class="od_load">￥{{getOrderInfos.order.amount}}元</span></p>
                        <p v-if="getOrderInfos.order.state == 4"><span class="od_load" v-if="getOrderInfos.order.state == 4">执行中</span></p>
                        <p>收入总额</p>
                    </div>
                    <div class="od_filter" v-if="getOrderInfos.order.type != '订单任务'">
                        <span id="1" class="sort clicks" @click="sortData">按次查看</span>
                        <span>|</span>
                        <span id="2" class="sort" @click="sortData">按小时查看</span>
                        <span>|</span>
                        <span id="3" class="sort" @click="sortData">按天查看</span>
                    </div>
                    <div class="od_content" v-for="(value,index) in getOrderInfos.details" :key="index">
                        <div class="od_list">
                            <p v-if="value.time != undefined"><span>{{value.time}}</span><span class="od_right od_load">￥{{value.amount}}元</span></p>
                            <p v-if="value.time != undefined"  class="od_conbox">
                                <span class="od_namebox" v-if="value.code != -1" ><i>订单号：</i><span class="od_num">{{value.code}}</span></span>
                                <span class="od_namebox" v-if="value.code == -1" ><i></i><span class="od_num"></span></span>
                                <span class="od_right od_load">任务奖励</span>
                            </p>
                            <template  v-if="value.time == undefined">
                                
                                <p>{{value.name}}</p>
                                <p class="od_conbox">
                                    <span class="od_namebox"><i>{{value.platform_type_name}}：</i><a class="od_num" :href="value.success_url">{{value.title}}</a></span>
                                    <span class="od_right od_load" v-if="value.state == 1">执行中</span>
                                    <span class="od_right od_load" v-if="value.state == 2">￥{{value.amount}}</span>
                                    <span class="od_right od_load" v-if="value.state == 3">￥0.00</span>
                                </p>
                                <p class="od_conbox">
                                    <span class="od_namebox"><i>流水号：</i><span class="od_num">{{value.code}}</span></span>
                                    <span class="od_right" v-if="value.state == 1">任务执行中</span>
                                    <span class="od_right" v-if="value.state == 2">任务已完成</span>    
                                    <span class="od_right"  style="color:#ff9a38;" v-if="value.state == 3">任务失败</span>
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
            groupType: 0,
            isMobile: true
      }
    },
    computed:{
        ...mapGetters([
            'getOrderInfos',
        ])
    },
    watch: {
        '$route': 'getPath'
    },
    created(){
        //执行期的订单
        this.waitSettlement = true;
        //请求数据
        let formData = new FormData();
        formData.append('rk', this.$route.query.rk);
        formData.append('groupType', this.groupType);
        formData.append('isMobile', this.isMobile);
        this.$store.dispatch('actionOrderInfos',formData)
    },
    methods:{
        lastpage(){
            this.$router.go(-1)
        },
        nextPage(){
            if(this.$store.state.OrderModule.orderInfos.order.type === '订单任务'){
                
            }else{
                let ck = this.$store.state.OrderModule.orderInfos.order.ck;
                this.$router.push(`/readDtail/${ck}/0/0`)
            }
        },
        //排序
        sortData(e){
            this.$(e.currentTarget).toggleClass('clicks');
            this.$(e.currentTarget).siblings().removeClass('clicks');
            this.groupType = this.$(e.currentTarget)[0].id;
            let formDataDele = new FormData();
                formDataDele.append('rk', this.$route.query.rk);
                formDataDele.append('groupType', this.groupType);
                formDataDele.append('isMobile', this.isMobile);
            this.$store.dispatch('actionOrderInfos',formDataDele);
        }
    },
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
        height: .7rem;
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

