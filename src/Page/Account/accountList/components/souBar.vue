<template>
    <div class="al_sou">
        <label for="" class="l-input" ><input class="l_int" type="text" v-model="intval" placeholder="请输入关键字"></label>
        <a class="al_sobtn" href="#" @click="getsouNum">搜索</a>
        <div class="l-selectbox">
            <div class="check-box">
                <input type="checkbox" name='a' id="toggle-switch1"  class="toggleSwitch" value="1"  checked="checked"/>
                <label class="track" for="toggle-switch1" @click="getsouNum"  >
                    <i class="iconfont icon-tucenggouxuan"></i>
                </label>
                <span>正常</span>
            </div>
            <div class="check-box">
                <input type="checkbox" name='a' id="toggle-switch2" class="toggleSwitch" value="2"  checked="checked"/>
                <label class="track" for="toggle-switch2"  @click="getsouNum"  >
                    <i class="iconfont icon-tucenggouxuan"></i>
                </label>
                <span>异常</span>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '@/eventJs/bus.js';
import {mapGetters} from 'vuex'

export default {
    props:{
        datalist:{
            type:Object
        } 
    },
    computed:{
        ...mapGetters([
            'getAccountListSodata',
            'getAccountListData',
        ])
    },
    data(){
        return{
            intval: '',
            toggleSwitch1 : true,
            toggleSwitch2 : true,
            //账号组数据
            state: 0,
            pageNo: 1,
        }
    },
    methods:{
        //加载账号组数据
        getdata(){
            if(this.datalist.id == 0){
                console.log('groupId')
                this.$(this.$('.plist')[0]).addClass('fold');
            }
            if(this.$('.l-input input').val()==''){
                this.intval = '';
            }
            let formDataDele = new FormData();
            formDataDele.append('state', this.state);
            if(this.$route.name == 'accountList'){
                formDataDele.append('groupId', this.datalist.id);
            }else{
                formDataDele.append('groupId', this.$route.query.id);
            }
            formDataDele.append('pageNo', this.pageNo);
            formDataDele.append('search', this.intval);
            formDataDele.callback = (data)=>{
                // console.log(data)
            }
            this.$store.dispatch('actionAccountListData',formDataDele);
        },
        getsouNum(){
            setTimeout(()=>{
                this.toggleSwitch1 = document.getElementById('toggle-switch1').checked;
                this.toggleSwitch2 = document.getElementById('toggle-switch2').checked;
                if(this.toggleSwitch1 === true && this.toggleSwitch2 === false){
                    this.state = 1;
                }else if(this.toggleSwitch1 === false && this.toggleSwitch2 === true ){
                    this.state = 2;
                }else if(this.toggleSwitch1 === false && this.toggleSwitch2 === false){
                    this.state = -1;
                }else if(this.toggleSwitch1 === true && this.toggleSwitch2 === true){
                    this.state = 0;
                }
                this.getdata();
            },0);    
        }
    },
}
</script>

<style scoped lang="less">
.al_sou{
    display: flex;
    width: 90%;
    padding: .15rem 5% .15rem 5%;
    background: #eaf2f2;
    .l-input{
        flex: 3;
        height: .35rem;
        line-height: .35rem;
        background: #fff;
        padding: 0 5px;
        box-sizing: border-box;
        border: 1px solid #E8ECED;
        border-radius: 3px;
        input{
            border: none;
            width: 95%;
        }
    }
    .al_sobtn{
        flex: 1;
        height: .35rem;
        line-height: .35rem;
        text-align: center;
        color: #fff;
        background: #29B0E7;
        border-radius: 3px;
        margin: 0 .1rem;
    }
    .l-selectbox{
        width: 1rem;
        display: flex;
        justify-content:space-between;
        height: .35rem;
        line-height: .35rem;
        .check-box{
            position: relative;
            color: #AEB0AF;
            input{
                display: none;
            }
            label::after{
                content: "";
                display: block;
                position: absolute;
                top: 3px;
                left: 2px;
                width: 10px;
                height: 10px;
                // border: 1px solid #A9ABAA;
            }
            input:checked+.track i{
                // visibility: visible;
                color: #29B0E7;
            }
            i{
                color: #A9ABAA;
                cursor: pointer;
                // visibility: hidden;
            }
        }
    }
}
   
</style>