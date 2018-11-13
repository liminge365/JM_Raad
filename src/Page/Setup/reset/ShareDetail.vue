<template>
  <div class="shareDatail">
    <div class="shareDatailInvite">
      <!--<content-top title='分享邀请'></content-top>-->
      <mt-header title="分享邀请">
         <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
      </mt-header>
      <div class="regulationsDatail">
        <ul class='shareList'>
          <li>
             <p class='invitations' v-if="card.type==1||card.type==2">简媒<span>{{getNum(card.descr.name)}}</span>天高级会员邀请券
                  <!--<a>共<span>1</span>张</a>-->
             </p>
             <p class='shareData' v-if="card.state==2">有效期至:{{card.endtime}}（剩余<span>{{card.time_left}}</span>天）</p>
             <p class='shareData' v-else>有效期至:{{formatDate(card.endtime,'yyyy-MM-dd')}}（{{card.time_left}}）</p>
             <p class='viewDetails'>{{card.descr.desc}}</p>
          </li>
        </ul>
        <ol class='shareDatailList' v-for="(value,index) in card.descr.type" :key="index">
          <li><span>{{value.k}}</span><a>{{value.v}}</a></li>
          <!-- <li><span>邀请用户</span><a>未注册过简媒的用户</a></li>
          <li><span>邀请卷数量</span><a>1张</a></li>
          <li><span>邀请人数</span><a>1人</a></li>
          <li><span>奖励条件</span><a>邀请新用户注册成功新用户注册成功</a></li>
          <li><span>邀请码</span><a>JMYQ1234567896446312548</a></li> -->
        </ol>
        <button class='invitePage' @click='makeInvitePage'>生成邀请页</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    updatepwd,
    GetCardMessage
  } from '../../../api/utils.js'
  // import ContentTop from '@/components/Common/ContentTop.vue'
  import {formatDate} from '../../../plugins/utils.js'
  export default {
    name: 'setup',
    data() {
      return {
        card:{descr:{}},
        formatDate:formatDate
      }
    },
    created(){
        let _this = this;
        let f = {id:this.$route.params.cardId};
        GetCardMessage(this.qs.stringify(f)).then(res=>{
           _this.card = res.data.data;
           _this.card.descr.type.push({'k':'邀请码','v':this.card.code});
        })
    },
    methods: {
      makeInvitePage(){
        this.$router.push("/shareInvitationCard?code="+this.card.code);
      },
      getNum(text){
         return text.replace(/[^0-9]/ig,""); 
      },
      lastpage(){
        this.$router.push("/s/setup/shareinvite");
      }
    },
    components: {
      // ContentTop
    }
  }

</script>

<style lang='less' scoped>
  @import '../../../assets/style/vars.less';
  .shareDatail {
    .flex();
    position: relative;
    .shareDatailInvite {
      position: absolute;
      width: 100%;
      height: 100%;
      .display-flex();
      .column();
      background-color: #eaf2f2;
      .regulationsDatail {
        .flex();
        overflow-y: auto;
        box-sizing: border-box;
        .shareList {
          padding: 10px 20px 0;
          box-sizing: border-box;
          li {
            background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            box-sizing: border-box;
            margin-bottom: 10px;
            .invitations {
              font-size: 14px;
              color: @blue-text-color;
              a {
                float: right;
                position: relative;
                right: 20px;
              }
              span {
                color: @primary-color;
              }
            }
            .shareData {
              color: #7a7f81;
              padding-top: 10px;
              padding-bottom: 10px;
              box-sizing: border-box;
              span {
                color: #ff0000;
              }
            }
            .viewDetails {
              color: @primary-color;
              span {
                float: right;
                position: relative;
                right: 0;
                cursor: pointer;
              }
            }
          }
        }
        .shareDatailList {
          li {
            height: 30px;
            background-color: #fff;
            border-bottom: 1px solid #ecf0f3;
            .display-flex();
            .align-item();
            span {
              padding-left: 20px;
              box-sizing: border-box;
              font-size: 14px;
              width: 35%;
              display: block;
              color: @blue-text-color;
            }
            a {
              color: #7a7f81;
              padding-right: 20px;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .invitePage {
          width: 90%;
          margin-left: 5%;
          margin-top: 20px;
          margin-bottom: 20px;
          height: 40px;
          line-height: 40px;
          background-color: #29b1e6;
          color: #fff;
          outline: none;
          border: 0;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }

</style>
