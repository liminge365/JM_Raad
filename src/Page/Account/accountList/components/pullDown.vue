<template>
    <div class="pullDown">
        <!-- 确定移除账号 -->
        <div class="alertremoveBox">
            <div class="mask"></div>
            <div class="alertContent">
                <p class="atitle">确定移除账号</p>
                <div class="btns">
                    <div class="btn1" @click="removeAccount">确定</div>
                    <div class="btn2" @click="$('.alertremoveBox').hide()">取消</div>
                </div>
            </div>
        </div>
        <!-- 确定删除账号 -->
        <div class="alertdelBox">
            <div class="mask"></div>
            <div class="alertContent">
                <p class="atitle">确定删除账号</p>
                <div class="btns">
                    <div class="btn1" @click="delAccount">确定</div>
                    <div class="btn2" @click="$('.alertdelBox').hide()">取消</div>
                </div>
            </div>
        </div>
         <!-- 确定刷新账号 -->
        <div class="alertRefreshBox">
            <div class="mask"></div>
            <div class="alertContent">
                <p class="atitle">确定刷新账号</p>
                <div class="btns">
                    <div class="btn1" @click="Refresh">确定</div>
                    <div class="btn2" @click="$('.alertRefreshBox').hide()">取消</div>
                </div>
            </div>
        </div>
        <!-- 无账号组确定添加账号组 -->
        <alertBtn class="alertzuBox" :alertObj="{name: ''}">
            <p class="alertzuBox_p">温馨提示：</p>
            <p class="alertzuBox_p2" >暂无账号组，请添加账号组</p>
            <div class="btn" @click="$('.alertzuBox').hide()">确定</div>
        </alertBtn>
        <!-- 修改账号组名称 -->
        <alertBtn class="alertSetaccountname" :alertObj="accountNameobj">
            <label class="label_int" for=""><input type="text" v-model="accountName" placeholder="请输入账号组名称"></label>
            <div class="btn" @click="setAccountName">完成</div>
            <div class="message"></div>
        </alertBtn>
        <!--指标选择 账号组设置弹出框 -->
        <alertBtn class="alertaccountZuSet" :alertObj="accountZuSet" >
            <div id="scroll-1">
                <ul class="accountType">
                    <li v-for="(value,index) in dataList" :key="index" 
                     @click="fnaddAzu"
                     :id="value.id" 
                     :data-nocli="value.cli" 
                     :class="value.cli?'accountTypeli zuclicks' : 'accountTypeli'">
                        <div class="lis">
                            <span>{{value.name}}</span>
                            <!-- <i class="iconfont icon-xiayibu"></i>  -->
                        </div>
                    </li>
                </ul>
             </div>
            <div class="btn" @click="fnAccountZuSet">完成</div>
        </alertBtn>
        <!-- 搜索 -->
        <souBar :datalist="solist"></souBar>
        <!-- 账户列表 -->
        <div class="plistbox">
            <div class="plist" v-for="(value,index) in getAccountListGroup" :key="index">
                <!-- 账号组民称 -->
                    <div class="p_title" :id="value.id" :data-name="value.name" @click="openList">
                        <i class="iconfont icon-xiayibu "></i>
                        <span class="p_name">{{value.name}}</span>
                        (<span>{{value.count}}</span>)
                        <span class="p_setbtn" @click="showaccountzu">设置</span>
                    </div>
                    <!-- {{getAccountListData}} -->
                
                <!-- 账号列表 -->
                    <ul class="p_list">
                        <li class="p_userList"  v-for="(v,i) in getAccountListData" :key="i" :id="v.id" 
                        :data-accounttype="v.account_type"  
                        :data-Refreshstate="v.state"  >
                            <img class="p_img" :src="v.account_img" alt="">
                            <b v-if='v.platform_name'>{{v.platform_name}}</b>
                            <b v-else>{{v.account_name}}</b>
                            <span v-if="v.state == 1" class="p_message"></span>
                            <span v-if="v.state != 1" class="p_message">{{v.state_reason}}</span>
                            <i class="iconfont icon-qunfengshangjiaxiangqing1"  @click="showaccount"></i>
                        </li>
                    </ul>
            </div> 
            <!-- 账号/组，管理，底部弹出框 -->
                    <mt-actionsheet
                    id="actionsheet"
                    :actions="actions"
                    v-model="sheetVisible">
                    </mt-actionsheet>
        </div>
    </div>
</template>
<script>
import {getAccountListMobilereset} from '@/api/utils.js'
import alertBtn from '@/components/Common/alertBtn.vue'
import axios from 'axios'
import { Actionsheet, Indicator } from 'mint-ui';
import souBar from './souBar.vue'
import {mapGetters} from 'vuex'
import bus from '@/eventJs/bus.js'
export default {
    name: 'pullDown',
    computed:{
        ...mapGetters([
            'getAccountListGroup',
            'getAccountListData',
            'getAccountListDel',
            'getAccountListAccountAddgroup',
            'getAccountListAccountUpacgroup',
        ])
    },
    components:{
        alertBtn,
        souBar,
        Actionsheet,
    },
    data(){
        return{          
            // 账号组设置弹出框
            accountZuSet:{
                name: "账号组设置",
                delCache: true,
            },
            dataList:[],
            i: 1,
            // 修改账号组名称
            accountNameobj:{
                name: "修改账号组名称",
            },
            accountName:"",
            
            //账号组管理底部框
            sheetVisible: false,
            actions:[],
            //删除账号
            deleteaccount: false,
            isShow: true,
            urlnames: '',
            accountZuId: '',
            //账号组数据
            state: 0, 
            groupId: 0,
            pageNo: 1,
            search: '',
            toggleZuid: '',//删除账号的id
            toggleid: '',//删除账号的id
            accounttype: '',//刷新类型7
            solist: {id:0},
        }
    },
    created(){
        let self = this;
        //获取所有账号组
        let formDataAccountListGroup = new FormData();
        this.$store.dispatch('actionAccountListGroup',formDataAccountListGroup);
    },
    methods:{
        changeIphone(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            if (isAndroid) {
                return true
            }else{
                return false
            }
        },
        //指标选择多选
        fnaddAzu(e){
            this.$(e.currentTarget).toggleClass('zuclicks');
        },
        //账号组管理底部框
        showaccountzu: function(e){
            if(!this.changeIphone()){
                document.getElementById('actionsheet').style.bottom = "45px";
            }else{
                document.getElementById('actionsheet').style.bottom = "0px";
            }

            this.sheetVisible = true;
            this.accountZuId = this.$(e.currentTarget).parent('.p_title')[0].id;
            this.urlnames =  this.$(e.currentTarget).parent('.p_title')[0].dataset.name; 
            if(this.accountZuId > 0){
                this.actions =[
                    {name:'账号组管理',},
                    {name:'修改账号组',method:()=>{  
                        this.accountName = this.urlnames;
                        this.$('.alertSetaccountname').show();
                    }},
                    {name:'设置账号',method:()=>{  
                        this.$router.replace({path:'/s/writeaccount', query:{names:this.urlnames,id:this.accountZuId} })       
                    }},
                ]
            }
            if(this.accountZuId < 0 ||this.accountZuId == 0){
                this.actions =[
                    {name:'账号组管理',},
                    {name:'设置账号',method:()=>{   
                        this.$router.replace({path:'/s/setaccount', query:{names:this.urlnames,id:this.accountZuId} })                        
                    }},
                ]
            }
        },
        //账号管理底部框
        showaccount: function(e){
            if(!this.changeIphone()){
                document.getElementById('actionsheet').style.bottom = "45px";
            }else{
                document.getElementById('actionsheet').style.bottom = "0px";
            }

            let self = this;
            this.toggleid = this.$(e.currentTarget).parent('.p_userList')[0].id;
            this.toggleZuid =this.$(e.currentTarget).parents('.p_list')[0].previousElementSibling.id;
            this.accounttype =this.$(e.currentTarget).parents('.p_userList')[0].dataset.accounttype;
            let Refreshstate =this.$(e.currentTarget).parents('.p_userList')[0].dataset.Refreshstate;
            this.sheetVisible = true
            this.actions =[
                    // {name:'账号设置',},
                    {name:'账号组设置',method:()=>{ 
                        let formData = new FormData();
                        formData.append('id', this.toggleid);
                        formData.callback = function(data){
                            self.dataList = data.allgroup;
                           if(data.allgroup.length>0){
                            self.$('.alertaccountZuSet').show();
                           }else{
                               self.$('.alertzuBox').show();
                           }
                        }
                        this.$store.dispatch('actionAccountListAccountgroup',formData);
                    }},
                    // {name:'重新授权',method:()=>{
                    //     // this.$router.push({name:'accountGive',params:{corpusId:this.toggleid}});
                    //     // console.log(this.$router)
                    // }},
                    // {name:'刷新状态',method:()=>{
                    //     if(this.accounttype  != 7 && this.state == 2){
                    //         this.$('.alertRefreshBox').show();
                    //     }
                    // }},
                ]
            if(this.accounttype!=7&&this.accounttype!=6&&this.accounttype!=8&&this.accounttype!=11){
                this.actions.unshift({
                    name:'账号修改',
                    method:()=>{
                        self.$router.push('/s/accountupdate/'+this.accounttype+'/'+this.toggleid);
                    }
                })
            }
            this.actions.unshift({name:'账号设置'});
            if(this.accounttype  != 7 && Refreshstate == 2){
                this.actions.push({name:'刷新状态',method:()=>{
                            this.$('.alertRefreshBox').show();
                    }})
            }
            if(this.toggleZuid>0){
                this.actions.push({name:'移除账号',method:()=>{
                    this.$('.alertremoveBox').show();
                }})
            }
             if(this.toggleZuid<0 || this.toggleZuid==0){
                this.actions.push({name:'删除账号',method:()=>{
                    this.$('.alertdelBox').show();
                }})
             }
        },
        //手风琴
        openList: function(e){
            let self = this;
            //点击每个账号组时，将搜索框和多选按钮清空。
            this.$('.l-selectbox input').each((i,v)=>{
                this.$(v).prop('checked',true);
            })
            this.$('.l-input input').val('');
            this.solist.id = this.$(e.currentTarget)[0].id;
            if(this.$(this.$(e.currentTarget)[0].parentElement)[0].className.indexOf('fold') == -1){
                this.$(this.$(e.currentTarget)[0].parentElement).addClass('fold')
                this.$(e.currentTarget).parent().siblings('.plist').removeClass('fold');
                this.groupId = parseInt(this.$(e.currentTarget)[0].id);
                this.getdata();
            }else{
                this.$(this.$(e.currentTarget)[0].parentElement).removeClass('fold')
            }
        },
        //加载账号组数据
        getdata(){
            // console.log(this.$store)
            let formDataDele = new FormData();
            formDataDele.append('state', this.state);
            formDataDele.append('groupId', this.groupId);
            formDataDele.append('pageNo', this.pageNo);
            formDataDele.append('search', this.search);
            formDataDele.callback = (data)=>{
                this.list = data;
            }
            this.$store.dispatch('actionAccountListData',formDataDele);
        },
        //确定删除账号
        delAccount(){
            this.account_id = this.toggleid;
            let formDataDele = new FormData();
            formDataDele.append('account_id', this.account_id);      
            formDataDele.callback = ()=>{
                this.getdata();
                //获取所有账号组
                let formDataAccountListGroup = new FormData();
                this.$store.dispatch('actionAccountListGroup',formDataAccountListGroup);

                this.$('.alertdelBox').hide();
            }
            this.$store.dispatch('actionAccountListDel',formDataDele);
        },
        //确定移除账号
        removeAccount(){
            this.groupId = this.toggleZuid;
            this.account_id = this.toggleid;
            let formDataDele = new FormData();
            formDataDele.append('account_id', this.account_id);
            formDataDele.append('group_id', this.groupId);
            formDataDele.callback = ()=>{
                this.getdata();
                //获取所有账号组
                let formDataAccountListGroup = new FormData();
                this.$store.dispatch('actionAccountListGroup',formDataAccountListGroup);
                this.$('.alertremoveBox').hide();
            }
            this.$store.dispatch('actionAccountListRemove',formDataDele);
        },
        //确认刷新账号
        Refresh(){
            let params = new FormData();
            params.append("account_id",this.toggleid);
            getAccountListMobilereset(params).then((res)=>{
                if(res.data.code == 200){
                    this.getdata();
                    this.$('.alertRefreshBox').hide();
                }
            })
        },
        //修改账号组名称
        setAccountName(){
            let self = this;
            if(this.isEmpty(this.accountName)){
                this.$('.message').text('名称不能为空');
                return false
            }else if(this.accountName.length>8){
                this.$('.message').text('名称不能超过8个字');
                return false
            }else{
                let formData = new FormData();
                formData.append('gid', this.accountZuId);
                formData.append('name', this.accountName);
                formData.callback = function(data){
                    console.log(data)
                    if(data.code == -1){
                        self.$('.message').text(data.msg);
                    }else{
                        self.$('.message').text('');
                        self.$('.alertSetaccountname').hide();
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
        //账号设置账号组
        fnAccountZuSet(){
            let self = this;
            let addName = '';
            let addNameid = '';
            this.state = 0;
            this.$('.alertaccountZuSet li').each(function(i,v){
                addNameid = self.$(v)[0].id;
                self.$(v)[0].classList.forEach(function(val,ins){
                    if(val == 'zuclicks'){
                        addName+=addNameid+',';
                    }
                })
            })
            let formData = new FormData();
            formData.append('account_id', this.toggleid);
            formData.append('group_id', addName);
            formData.callback = function(data){
                //再次获取所有账号组
                let formDataAccountListGroup = new FormData();
                self.$store.dispatch('actionAccountListGroup',formDataAccountListGroup);
                self.getdata();
                self.$('.alertaccountZuSet').hide();
            }
            this.$store.dispatch('actionAccountListUpacgroup',formData);
        }
    }
}
</script>
<style lang="less" scoped>
//添加滚动条
    #scroll-1{
        margin-bottom: .1rem;
        max-height: 2.4rem;
        overflow: auto;
        .zuclicks{
            span{
                color: #29B0E7;
            }
        }
    }
    #scroll-1::-webkit-scrollbar {
        width: .05rem;
        height: .05rem;
    }
    #scroll-1::-webkit-scrollbar-button    {
        background-color: #f3f3f3;
    }
    #scroll-1::-webkit-scrollbar-track     {
        background:#f3f3f3;
    }
    #scroll-1::-webkit-scrollbar-thumb{
        background:#969696;
        border-radius: .05rem;
    }
//弹窗
.alertzuBox_p{
    line-height: 30px;
    padding-left: 30px;
}
.alertzuBox_p2{
    line-height: 30px;
    margin-bottom: 20px;
    text-align: center;
}
.alertremoveBox, .alertdelBox,.alertRefreshBox, {
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
        z-index: 9999;
    }
    .alertContent{
        z-index: 9999;
        background: #fff;
        position: fixed;
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
.p_title{
    height: .4rem;
    line-height: .4rem;
    margin-bottom: .1rem;
    background: #fff;
    padding: 0 4%;
    color: #595E62;
    i{
        color: #29B0E7;
        font-size: 12px;
        margin-left: .1rem;
        display: inline-block;
    }
    .p_setbtn{
        float: right;
    }
}
.p_list{
    display: none;
    // max-height:0;
	// overflow:hidden;
	// transition:max-height 0.2s ease-out;
    .p_userList{
        width: 90%;
        margin: .1rem 5%;
        display: flex;
        height: .35rem;
        line-height: .35rem;
        .p_img{
            width: .35rem;
            height: .35rem;
        }
        b{
            flex: 2;
            margin-left: .1rem;
            color: #555F69;
            overflow: hidden;
        }
        .p_message{
            flex: 2;
            color: #CF1719;
            overflow: hidden;
        }
        .icon-qunfengshangjiaxiangqing1{
            float: right;
            color: #AFAFAF;
            font-size: 16px;
        }
        .icon-xiayibu{
            transform: rotate(0deg);
        }

    }
}

.fold{
    .p_list{
        display: block;
    }
    .icon-xiayibu{
        transform: rotate(90deg);
    }
}
</style>


     