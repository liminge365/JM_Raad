<template>
  <div class="accountList">
        <!-- 添加账号组 -->
        <alertBtn class="alertBtnbox" :alertObj="accountint">
            <label class="label_int" for=""><input type="text" v-model="addAccountNum" placeholder="请输入账号组名称"></label>
            <div class="btn" @click="addAccount">完成</div>
            <div class="message" ></div>
        </alertBtn>
        
        <!-- 添加账号组按钮 -->
        <div class="al_addbtn" @click="$('.alertBtnbox').show();"><i class="iconfont icon-tianjia"></i>添加账号组</div>
        <!-- 账号组列表 -->
        <pullDown></pullDown>
  </div>
</template>
<script>
import pullDown from './components/pullDown.vue'
import alertBtn from '@/components/Common/alertBtn.vue'
import {mapGetters} from 'vuex';
export default {
    name:'accountList',
    data(){        
        return{
            accountint:{
                name: "添加账号组",
            },
            addAccountNum: '',
        }
    },
    computed:{
        ...mapGetters([
            'getAccountListAddgroup'
        ])
    },
    components:{
        pullDown,
        alertBtn
    },
    created(){

    },
    methods:{
        //添加账号组
        addAccount(){
            let self = this;
            if(this.isEmpty(this.addAccountNum)){
                this.$('.message').text('名称不能为空');
                return false
            }else if(this.addAccountNum.length>8){
                this.$('.message').text('名称不能超过8个字符');
                return false
            }else{
                
                let formData = new FormData();
                formData.append('id',0);
                formData.append('name',this.addAccountNum);
                formData.callback = function(data){
                    if(data.code == -1){
                        self.$('.message').text(data.msg)
                    }else{
                       self.addAccountNum = '';
                        self.$('.alertBtnbox').hide();
                        let formDataAccountListGroup = new FormData();
                        self.$store.dispatch('actionAccountListGroup',formDataAccountListGroup); 
                    }
                }
                this.$store.dispatch('actionAccountListAddgroup',formData);
            }
        },
        //字符串为空返回true
		isEmpty(obj) {
            if (obj === null || obj === undefined || (typeof obj === "string" && obj.toLowerCase() === "null") || obj === "" || obj === 0 || obj.length === 0) {
                    return true;
            } else {
                    return false;
            }
		},
    }
}
</script>

<style scoped lang="less">
    
    .al_addbtn{
        width: 90%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-radius: 5px;
        background: #29B0E7;
        color: #fff;
        margin-left: 5%;
        .icon-tianjia{
          margin-right: 2px;
          position: relative;
          top: 1px;
          color: #fff;
        }
    }
    .al_sou{
      display: flex;
      width: 90%;
      margin: .15rem 5% .15rem 5%;
      .l-input{
        flex: 3;
        height: .35rem;
        line-height: .35rem;
        background: #fff;
        padding: 0 3px;
        border: 1px solid #E8ECED;
        border-radius: 3px;
        input{
          border: none
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
        flex: 2;
        width: 200px;
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
