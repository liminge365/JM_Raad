<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 代扣税 -->
            <div class="orderAddDele" >
                <div class="orderDtail">
                        <div class="od_title">
                            <p>代扣税</p>
                            <p>订单号：<span>JM00000000014</span><span class="od_right od_load">-￥200元</span></p>
                        </div>
                </div>
                <div class="orderContent">
                    <p>
                        <span>代扣税流水号：</span>
                        <span>123123213</span>
                    </p>
                    <p>
                        <span>代扣税时间：</span>
                        <span>2032.32.32 10:90</span>
                    </p>
                    <p>
                        <span>类型：</span>
                        <span>代扣税</span>
                    </p>
                    <p>
                        <span>收入类型：</span>
                        <span>代结算转入</span>
                    </p>
                    <p>
                        <span>收入订单号：</span>
                        <span>jm132213131</span>
                    </p>
                    <p>
                        <span>收入金额（元）：</span>
                        <span>123</span>
                    </p>
                    <p>
                        <span>扣税比例：</span>
                        <span>20%</span>
                    </p>
                    <p>
                        <span>扣税金额（元）：</span>
                        <span>200.00</span>
                    </p>
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
            name: 'HomePage',
      }
    },
    computed:{
        ...mapGetters([
            
        ])
    },
    methods:{
        lastpage(){
            this.$router.go(-1)
        },
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
        span{
            float: left;
            margin-right: .2rem;
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
    }
}
.orderContent{
    padding: .12rem .2rem;
}
</style>

