<template>
    <div class="HomePage">
        <mt-header title="账户详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="publish-top">
            <router-link v-for='(item,index) in publishData' :key='index' :to='{path:item.path}'>
                <span>{{item.title}}</span>
            </router-link>
       </div>
        <div class="order" ref="orderScroll">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
         </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            publishData:[
                {
                    id:0,
                    title:'收支详情',
                    path:'/s/orderDtail/moneyDetails',
                },
                {
                    id:1,
                    title:'待结算',
                    path:'/s/orderDtail/Settlement',
                },
                {
                    id:2,
                    title:'提现记录',
                    path:'/s/orderDtail/PresentRecord',
                }
            ]
        }
    },
    methods:{
        lastpage(){
           this.$router.push('/s/order/orderSet')
        }
    },
    beforeRouteLeave(to, from, next){
        this.scrollTop = this.$refs.orderScroll.scrollTop;
        next();
    },
    updated () {
        this.$nextTick(function(){
            this.$refs.orderScroll.scrollTop =this.scrollTop;
        }) 
    },
    deactivated: function () {
    //   console.log(4)
    }
}
</script>
<style lang="less">
@import '../../assets/style/vars.less';
.publish-top{
    .display-flex();
    .align-item();
    height: 40px;
    padding-left:.4rem;
    padding-right:.4rem;
    box-sizing:border-box;
    a{
       .flex();
       font-size:.14rem;
       text-align:center;
       color:#282828;
    }
    .router-link-active{
        color:@primary-color;
    }
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

