<template>
  <div class="shareRules">
    <div class="shareInvite">
      <content-top title='分享邀请'></content-top>
      <div class="regulations">
        <p class="serviceSmTitle">使用规则:</p>
        <p class="rulesTitle">1. 邀请券描述</p>
        <p>高级会员VIP30天</p>
        <p>高级会员VIP60天</p>
        <p class="rulesTitle">2. 邀请券使用资格</p>
        <p>仅限高级会员</p>
        <p class="rulesTitle">3. 邀请券有效期</p>
        <p>邀请券上显示有效期剩余时间，请在邀请券规定有效期内使用，过期失效；</p>
        <p>高级会员在邀请券有效期内，未邀请新用户，或邀请的新用户在有效期内未注册，邀请券自动过期；</p>
        <p class="rulesTitle">4. 邀请券使用对象</p>
        <p>仅限未注册的新用户</p>
        <p class="rulesTitle">5. 邀请券获赠方式</p>
        <p>新用户通过高级会员邀请获得邀请券，注册成功后即可获得高级会员使用权益；</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    updatepwd
  } from '../../../api/utils.js'
  import ContentTop from '@/components/Common/ContentTop.vue'
  export default {
    name: 'setup',
    data() {
      return {}
    },
    methods: {
      shareDetails() {
        this.$router.push("/s/setup/sharedetail")
      }
    },
    components: {
      ContentTop
    }
  }

</script>

<style lang='less' scoped>
  @import '../../../assets/style/vars.less';
  .shareRules {
    .flex();
    position: relative;
    .shareInvite {
      position: absolute;
      width: 100%;
      height: 100%;
      .display-flex();
      .column();
      background-color: #eaf2f2;
      .regulations {
        .flex();
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 20px 10px;
        box-sizing: border-box;
        p {
          text-align: justify;
          font-size: 14px;
          letter-spacing: 0.2px;
          color: #666;
          margin: 0;
          line-height: 22px;
        }
        .rulesTitle{
            margin-top: 10px;
            font-weight: 800;
        }
        .serviceSmTitle {
          font-size: 18px;
          color: #333;
          margin: 20px 0 10px;
          font-weight: 800;
        }
      }
    }
  }

</style>
