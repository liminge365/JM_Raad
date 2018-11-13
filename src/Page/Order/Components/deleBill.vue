<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 扣费 -->
            <div class="orderAddDele" >
                <div class="orderDtail">
                    <div class="od_title">
                        <p>{{list.typeName}}<span class="od_right od_load">-￥{{list.amount}}</span></p>
                        <p>订单号：<span>{{list.encodeId}}</span><span class="od_right od_load">{{list.charge}}</span></p>
                    </div>
                </div>
                <div class="orderContent" v-if='list.detail'>
                    <p>
                        <span>代扣税流水号：</span>
                        <span>{{list.detail.billEncodeId}}</span>
                    </p>
                    <p>
                        <span>代扣税时间：</span>
                        <span>{{list.time}}</span>
                    </p>
                     <p>
                        <span>类型：</span>
                        <span>{{list.typeName}}</span>
                    </p>
                    <p>
                        <span>收入类型：</span>
                        <span>代结算转入</span>
                    </p>
                    <p>
                        <span>收入订单号：</span>
                        <span>{{list.detail.incomeEncodeId}}</span>
                    </p>
                    <p>
                        <span>收入金额（元）：</span>
                        <span>{{list.detail.incomeAmount}}</span>
                    </p>
                    <p>
                        <span>扣税比例：</span>
                        <span>20%</span>
                    </p>
                    <p>
                        <span>扣税金额（元）：</span>
                        <span>{{list.detail.outcomeAmount}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {ApiAvailableDetail} from '../../../api/utils.js'
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
        const data = {
            'availableId':this.$route.query.id
        }
        ApiAvailableDetail(this.qs.stringify(data)).then(res=>{
          if(res.data.code == 200){
              this.list = res.data.data
          }
      })
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

