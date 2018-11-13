<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <!-- 结算详情 -->
            <div class="orderAddDele">
                <div class="orderDtail">
                    <div class="od_title">
                        <p>{{list.typeName}}<span class="od_right od_load">+￥{{list.amount}}</span></p>
                        <p>订单号：<span>{{list.encodeId}}</span><span class="od_right od_load">{{list.charge}}</span></p>
                    </div>
                    <div class="od_content" v-for='(item,key) in list.detail' :key='key'>
                        <div class="od_list">
                            <p><span class="orderName">{{item.delayTypeName}}</span><span class="od_right">+￥{{item.billAmount}}</span></p>
                            <p>订单号：<span>{{item.billEncodeId}}</span><span class="od_right" @click='handleClick(item.delayId)'>查看详情</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ApiAvailableDetail} from '../../../api/utils.js'
  export default {
    props:{
    },
    data () {
      return {
        name: 'HomePage',
        list:'',
        type:''
      }
    },
    created(){
        const data = {
            'availableId':this.$route.query.id
        }
        this.type = this.$route.query.index;
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
        handleClick(id){
           this.$router.push({path:"/s/flowDtails",query:{id:id}})
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

