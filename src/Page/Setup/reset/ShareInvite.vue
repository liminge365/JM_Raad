<template>
  <div class="share">
    <div class="shareInvite">
        <content-top title='分享邀请'></content-top>
        <div class="regulations">
           <div class="shareService"><i class='iconfont icon-guize'></i><span @click='shareRule'>使用规则</span></div>
           <ul class='shareList' v-if='shareCards.length != 0'>
               <li v-for="(value,index) in shareCards" :key="index">
                  <div @click='shareDetails(value.id)'>
                    <p class='invitations' v-if="value.type==1||value.type==2">简媒<span>{{getNum(value.descr.name)}}</span>天高级会员邀请卷
                    <!--<a>共<span>1</span>张</a>-->
                    </p>
                    <p class='shareData' v-if="value.state==2">有效期至:{{value.endtime}}（剩余<span>{{value.time_left}}</span>天）</p>
                    <p class='shareData' v-else>有效期至:{{value.endtime}}（{{value.time_left}}）</p>
                    <p class='viewDetails' >{{value.descr.desc}}<span>查看详情>></span></p>
                  </div>
                  <div class='deprecated' v-if="value.state!=2"><p>{{value.time_left}}</p></div>
               </li>
           </ul>
           <div class="noDateBox" v-else>
               <Nodate></Nodate>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import { updatepwd,GetAllCard } from '../../../api/utils.js'
import {wxReady} from '../../../plugins/weixinshare.js'
import ContentTop from '@/components/Common/ContentTop.vue'
import Nodate from '@/components/Common/Nodate.vue'
export default {
  name: 'setup',
  data () {
    return {
        shareCards:[]
    }
  },
  computed:{

  },
  created(){
      let _this = this;
      GetAllCard().then((res)=>{
          _this.shareCards = res.data.data;
          _this.WXShare(res.data.data);
      });
  },
  methods:{
    shareDetails(id){
        this.$router.push("/s/setup/sharedetail/"+id);
    },
    shareRule(){
        this.$router.push("/s/setup/sharerules");
    },
    getNum(text){
         return text.replace(/[^0-9]/ig,""); 
    }
    },
  components:{
      ContentTop,
      Nodate
  }
}
</script>

<style lang='less' scoped>
@import '../../../assets/style/vars.less';
.share{
  .flex();
  position:relative;
  .shareInvite{
    position:absolute;
    width: 100%;
    height:100%;
    .display-flex();
    .column();
     background-color:#eaf2f2;
    .regulations{
        .flex();
        overflow-y:auto;
        box-sizing:border-box;
        padding: 0 20px 10px;
        box-sizing:border-box;
        .shareService{
            color: @primary-color;
            height:40px;
            .display-flex();
            .flex-end();
            .align-item();
            i{
                padding-right: 5px;
                cursor: pointer;
            }
            span{
                cursor: pointer;
            }
        }
        .shareList{
            li{
                background-color:#fff;
                border-radius:5px;
                padding:20px;
                box-sizing:border-box;
                margin-bottom:10px;
                cursor:pointer;
                position:relative;
                .invitations{
                    font-size: 14px;
                    color:@blue-text-color;
                    a{
                        float: right;
                        position:relative;
                        right:20px;
                    }
                    span{
                        color:@primary-color;
                    }
                }
                .shareData{
                    color:#7a7f81;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    box-sizing: border-box;
                    span{
                       color:#ff0000; 
                    }
                }
                .viewDetails{
                    color: @primary-color;
                     span{
                        float: right;
                        position:relative;
                        right:0;
                        cursor: pointer;
                    }
                }
                .deprecated{
                    position:absolute;
                    left: 0;
                    top:0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .5);
                    border-radius:5px;
                    p{
                        position:absolute;
                        left: 50%;
                        top:50%;
                        .translate();
                        width:76px;
                        height:76px;
                        line-height:76px;
                        text-align:center;
                        border-radius:50%;
                        background-color:@primary-color;
                        color:#fff;
                        font-size:14px;
                    }
                }
            }
        }
        .noDateBox{
          background:#fff;
          border-radius: 5px;
          padding: 20px;
          box-sizing: border-box;
        }
    }
  }
}
</style>
