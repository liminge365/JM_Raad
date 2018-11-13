<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 流水详情 -->
            <div class="orderAddDele" >
                <div class="orderDtail">
                    <div class="od_title od_flow">
                        <span>流水详情</span>
                    </div>
                </div>
                <div class="orderDtail">
                    <div class="od_title">
                        <p>{{list.typeName}}<span class="od_right od_load">+￥{{list.amount}}</span></p>
                        <p>类型：<span>{{list.charge}}</span></p>
                    </div>
                </div>
                <div class="orderContent" v-if='list.detail'>
                    <p>
                        <span>流水号：</span>
                        <span>{{list.detail.billEncodeId}}</span>
                    </p>
                    <p>
                        <span>流水状态：</span>
                        <span>{{list.detail.time}}</span>
                    </p>
                    <p>
                        <span>订单类型：</span>
                        <span>{{list.charge}}</span>
                    </p>
                    <p>
                        <span>订单号：</span>
                        <span>{{list.encodeId}}</span>
                    </p>
                    <p>
                        <span>收支类型：</span>
                        <span>{{list.charge}}</span>
                    </p>
                    <p>
                        <span>时间：</span>
                        <span>{{list.detail.time}}</span>
                    </p>
                    <p>
                        <span>订单详情：</span>
                        <span v-if='list.detail.corpusTitle' @click='routerTo(list.detail.corpusPlain)'>{{list.detail.corpusWriter}}：{{list.detail.corpusTitle}}</span>
                        <span v-else>{{list.detail.corpusWriter}}：{{list.detail.corpusTitle}}</span>
                    </p>
                    <p>
                        <span>流水金额（元）：</span>
                        <span>{{list.amount}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {ApiLedgerBillDetail} from '../../../api/utils.js'
  export default {
    props:{
    },
    data () {
      return {
            name: 'HomePage',
            list:''
      }
    },
    computed:{
        ...mapGetters([
            
        ])
    },
    created(){
        var data = {
            'delayId':this.$route.query.id
        }
        ApiLedgerBillDetail(this.qs.stringify(data)).then(res=>{
          if(res.data.code == 200){
              this.list = res.data.data
          }
        })
    },
    methods:{
        lastpage(){
            this.$router.go(-1)
        },
        routerTo(corpusPlain){
            this.$router.push(`/readDtail/${corpusPlain}/0/0`)
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
    .od_flow{
        min-height: 0;
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

