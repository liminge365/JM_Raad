<template>
  <div class="HomePage">
      <!-- 确定移除账号 -->
        <div class="alertremoveBox">
            <div class="mask"></div>
            <div class="alertContent">
                <p class="atitle">确定删除账号</p>
                <div class="btns">
                    <div class="btn1" @click="removeAccountbtn">确定</div>
                    <div class="btn2" @click="$('.alertremoveBox').hide()">取消</div>
                </div>
            </div>
        </div>

        <mt-header :title="this.$route.query.names">
            <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
        </mt-header>
        <div class="account">
            <souBar :datalist="solist"></souBar>
            <div class="changebox">
                <!-- <div class="quanbox"> -->
                    <div class="check-box">
                        <input type="checkbox" name='b' id="delete-switchquan"/>
                        <label class="track" for="delete-switchquan" @click="toggleallChecked">
                            <i class="iconfont icon-tucenggouxuan"></i>
                        </label>
                    </div>
                <span class="quanbtn">全部</span>
                <!-- </div> -->
                <span class="delbtn" @click="removeAccount" >删除账号({{delCount}})</span>
            </div>
            <div class="del_box">
                <div class="del_account_list" v-for="(value,index) in getAccountListData" :key="index">
                    <div class="check-box">
                        <input type="checkbox" name='a' :id="'delete-switch'+index"  :data-listid="value.id" 
                        @click="delCountNum"
                        class="checkboxint"/>
                        <label class="track" :for="'delete-switch'+index" >
                            <i class="iconfont icon-tucenggouxuan"></i>
                        </label>
                    </div>
                    <img :src="value.account_img" alt="">
                    <b>{{value.platform_name}}</b>
                </div>
            </div> 
        </div>
  </div>
</template>
<script>
import { Header } from 'mint-ui';
import souBar from './components/souBar.vue'
import bus from '@/eventJs/bus.js'
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters([
            'getAccountListData',
        ])
    },
    data(){
        return{
            //账号组数据
            state: 0, // /0 全部 1 正常 2。 groupId： 0 全部 1多少要多少。 
            groupId: 1,
            pageNo: 1,
            search: '',
            //移除账号
            delCount: 0,
            delArray:[],
            solist:{id:1},//搜索
        }
    },
    components:{
        Header,
        souBar,
    },
    created(){
        this.groupId = this.$route.query.id;
        this.getdata();
    },
    methods:{
        lastpage() {
            this.$router.replace('/s/account/accountList')
        },
        delCountNum(e){
            if(this.$(e.currentTarget)[0].checked){
                this.delCount++;
            }else{
                this.delCount--;
            }
            if(this.delCount == this.$('.del_box input').length){
                this.$('.changebox input').prop("checked", true);
            }else{
                this.$('.changebox input').prop("checked", false);
            }
        },
        removeAccount(){
            this.$('.alertremoveBox').show();
        },
        removeAccountbtn(){
            let self = this;
            this.groupId = this.$route.query.id;
            this.$('.del_account_list').each(function(i,v){
                if(self.$(v)[0].children[0].children[0].checked){
                    self.account_id = self.$(v)[0].children[0].children[0].dataset.listid;
                    let formDataDele = new FormData();
                    formDataDele.append('account_id', self.account_id);
                    formDataDele.append('group_id', self.groupId);
                    formDataDele.callback = (data)=>{
                        self.$('.alertremoveBox').hide()
                        self.getdata();
                    }
                    self.$store.dispatch('actionAccountListDel',formDataDele);    
                }
            })
        },
        //input的全选事件
        toggleallChecked(e){
            let self = this;
            setTimeout(function(){
                if(document.getElementById('delete-switchquan').checked){
                    self.$('.del_box input').each(function(i,v){
                        self.$(v).prop("checked", true);
                        self.delCount = self.$('.del_box input').length;
                    })
                }else{
                    self.$('.del_box input').each(function(i,v){
                        self.$(v).prop("checked", false);
                        self.delCount = 0;
                    })
                }
                
            },0);
        },
        getdata(){
            let self = this;
            let oneformDataDele = new FormData();
            oneformDataDele.append('state', this.state);
            oneformDataDele.append('groupId', this.groupId);
            oneformDataDele.append('pageNo', this.pageNo);
            oneformDataDele.append('search', this.search);
            this.$store.dispatch('actionAccountListData',oneformDataDele);

            this.$('.del_box input').each(function(i,v){
                self.$(v).prop("checked", false);
                self.delCount = 0;
            })
        }
    }, 
    updated(){
        let self = this;
        if(this.$route.name == 'setaccount'){
            if(this.delCount == this.$('.del_box input').length){
                this.$('.changebox input').prop("checked", true);
            }else{
                this.$('.changebox input').prop("checked", false);
            }
            //如果全选选中，其余选项全部选中
            if(document.getElementById('delete-switchquan').checked){
                this.$('.del_box input').each(function(i,v){
                    self.$(v).prop("checked", true);
                })
            }
        }
        //获取移除的账号个数
        let num = 0;
        this.$('.checkboxint').each(function(i,v){
            if(self.$(v)[0].checked){
                num++
            }
        })
        this.delCount = num;
    }
    
}
</script>
<style lang="less" scoped>
.changebox{
    display: flex;
    justify-content: space-between;
    margin: .15rem 0;
    font-size: 12px;
    color: #54606E;
    .check-box{
        flex: 2;
        text-align: center;
    }
    .quanbtn{
        flex: 4;
    }
    .delbtn{
        flex: 2;
        text-align: center;
    }
}
.deleteaccount{
    background: #EBF0F3;
}
.del_box{
    background: #fff;
}
.del_account_list{
    display: flex;
    height: .35rem;
    line-height: .35rem;
    padding: .1rem 0;
    .check-box{
        flex: 2;
        text-align: center;
    }
    img{
        width: .35rem;
        height: .35rem;
    }
    b{
        flex: 5;
        color: #54606E;
        padding-left: .15rem;
    }
}
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
//弹窗
.alertremoveBox, .alertdelBox{
    display: none;
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(10,10,10,0.2);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .alertContent{
        z-index: 9999;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 70%;
        border-radius: 3px;
        .atitle{
            padding: .2rem 0;
            text-align: center;
            color: #595E62;
        }
        .btns{
            display: flex;
            width: 70%;
            height: .25rem;
            line-height: .25rem;
            margin-left: 15%;
            margin-bottom: .2rem;
            .btn1{
                width: 45%;
                margin-right: 10%;
                background: #29B0E7;
                color: #fff;
                text-align: center;
                border-radius: 3px;
            }
            .btn2{
                width: 45%;
                text-align: center;
                border-radius: 3px;
                border: 1px solid #E8ECED;
                color: #595E62;
                &:hover{
                    background: #29B0E7;
                    color: #fff;
                }
            }
        }
    }
}
</style>


