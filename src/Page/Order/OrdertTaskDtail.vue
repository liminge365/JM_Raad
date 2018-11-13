<template>
  <div class="HomePage">
        <mt-header title="任务详情">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="order">
            <div class="otdHead">
                <p class="otdP">共<span>{{getOrderDtail.missionCount}}</span>个账号</p>
                <div class="otdbox">
                    <ul class="otdbox_ul">
                        <li v-for="(value,index) in getOrderDtail.selectAccounts" :key="index">
                            <img :src="value.logo" >
                            <p class="otdname">{{value.name}}</p>
                        </li>
                    </ul>
                </div>
            </div> 
            <div id="content" class="text-justify setArticle" v-if="getOrderDtail.material != undefined" v-html="getOrderDtail.material.content"></div>
        </div>
        <div class="otdFooter">
            <span class="otdMoney">￥{{getOrderDtail.amount}}</span><a class="otdBtn" @click="getOrder">接受任务</a>
        </div>
  </div>
</template>

<script>
import TopPage from '@/components/Common/TopPage.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'HomePage',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            isMobile: true,
            rk: '',
            groupType: 0,

            material: '',
            selectAccounts:''
        }
    },
    computed:{
        ...mapGetters([
            'getOrderDtail',
            'getRecieveOrder'
        ])
    },
    components:{
        TopPage
    },  
    created(){
        let formDataDtail = new FormData();
        formDataDtail.append('isMobile', true)         
        formDataDtail.append('rk', this.$route.query.rk) 
        this.$store.dispatch('actionOrderDtail',formDataDtail)
    },
    methods:{
        lastpage(){
        this.$router.go(-1)
        },
        getOrder(){
            this.material = this.$store.state.OrderModule.orderDtail.material
            this.rk = this.$store.state.OrderModule.orderDtail.rk       
            let accounts = []
            let storeselectAccounts = this.$store.state.OrderModule.orderDtail.selectAccounts
            for( let i=0;i<storeselectAccounts.length;i++){
                var param = {};
                param.id = storeselectAccounts[i].accountId;
                param.original = 0;
                param.advert = 0;
                accounts.push(param)
            }
            this.selectAccounts = JSON.stringify(accounts)

            let formDataRecieve = new FormData();
            formDataRecieve.append('material', this.material.materialId)         
            formDataRecieve.append('rk', this.$route.query.rk) 
            formDataRecieve.append('accounts', this.selectAccounts) 
            this.$store.dispatch('actionRecieveOrder',formDataRecieve)
            window.location.href="/s/order/orderSet";
        }
    }
}
</script>
<style lang="less" >
@import '../../assets/style/vars.less';
.otdHead{
    width: 100%;
    height: .9rem;
    background: #fff;
    padding-left: .2rem;
    box-sizing: border-box;
    position: fixed;
    .otdP{
        line-height: .3rem;
        span{
            color: @primary-color;
        }
    }
    .otdbox_ul::-webkit-scrollbar {
        display: none;
    }
    .otdbox_ul{
        transform: scale(.5);
        overflow: hidden;
        overflow-x: scroll;
        display: flex;width: 193%;
        position: absolute;
        top: 5.5%;
        left: -43%;
        li{
            padding: .1rem .05rem;
            float: left;
            img{
                width: .6rem;
                height: .6rem;
            }
            .otdname{
                display: block;
                text-align: center;
            }
        }
    }
}
.setArticle{
    width: 90%;
    margin: 1rem 5% .2rem;
    padding: .2rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2px 1px #EAEEF1;
    font-size: .12rem;
    color: #9D9D9D;
    p{
        img{
            width: 100%;
            margin: 0;
        }
    }
}
.otdFooter{
    height: .4rem;
    line-height: .4rem;
    box-sizing: border-box;
    background: #fff;
    padding: 0 6%;
    .otdMoney{
        color: @primary-color;
    }
    .otdBtn{
        float: right;
        height: .3rem;
        line-height: .3rem;
        margin-top: 3px;
        padding: 2px 12px;
        border-radius: 3px;
        background: @primary-color;
        color: #fff;
    } 
}
</style>


