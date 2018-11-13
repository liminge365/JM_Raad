<template>
  <div class="page-loadmore">
    <!-- 提现过 -->
				<alertBtn class="alertBtnbox" :alertObj="accountTx">
            <div class="accountMoney"  v-if="getAccountAmount.availableAmount == 0">账户余额：<span class="allMoney">￥0.00</span>元</div>
            <div class="accountMoney"  v-else>账户余额：<span class="allMoney">￥{{getAccountAmount.availableAmount/100}}</span>元</div>
            <div class="orderaccount" >
                <label class="label_int" for=""><input  
								type="text"
								placeholder="提现金额" 
								class="withdrawAmountTx" ></label>
								<div class='dl'>
										<div class='dd'>
												<p>支付宝名称：<span  v-if="getAccount.alipayAccount != undefined"  class="intaccount">{{getAccount.alipayAccount.realName}}</span></p>
												<p>支付宝账号：<span  v-if="getAccount.alipayAccount != undefined"  class="intaccount">{{getAccount.alipayAccount.alipayName}}</span></p>
										</div>
										<dt class='dt'>
												<div @click="changeAccount">更改账号</div>
										</dt>
								</div>
                <div class="btn" @click="emitdata">提现</div>
                <div class="message"></div>
			     </div>
        </alertBtn>
		<!-- 弹出框 没有提现过-->
        <alertBtn class="alertBtnboxWtx" :alertObj="accountTx">
            <div class="accountMoney"  v-if="getAccountAmount.availableAmount == 0">账户余额：<span >￥0.00</span>元</div>
            <div class="accountMoney"  v-else>账户余额：<span >￥{{getAccountAmount.availableAmount/100}}</span>元</div>
            <div class="orderaccount" >
								<label class="label_int" for=""><input	type="text" placeholder="提现金额" 	class="withdrawAmount" ></label>
								<label class="label_int" for=""><input  type="text" placeholder="真实姓名" class="realName"></label>
								<label class="label_int" for=""><input type="text" 	placeholder="支付宝账号" 	class="realAccount" ></label>
						<!-- 发送手机验证码 -->
								<div class="yzm">
										<label class="yzm_int" for=""><input  type="text" placeholder="验证码" class="smsCode"></label>
										<button class="yzm_btn" @click="accountSend">发送手机验证码</button>
								</div>
								<div class="btn" @click="emitdata">提现</div>
								<div class="message"></div>
						</div>
        </alertBtn>


    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" 
      :bottom-all-loaded="allLoaded" 
      :autoFill="false"
      ref="loadmore">
        <div class="order_top_box">
          <div class="o_div">账户余额</div>
          <p class="o_p" v-if="getAccountAmount.availableAmount == 0">￥0.00</p>
          <p class="o_p" v-else>￥{{getAccountAmount.availableAmount/100}}</p>
          <button class="button" @click="changeAlert">提现</button>
        </div>
        <div class="orderListbox page-loadmore-list">
          <Nodate v-if='list.length == 0'></Nodate>
          <div v-else class="orderRecord page-loadmore-listitem" v-for="(item,index) in list"
            :key="index"
            @click='handleClick(item.type,item.id)'>
            <p>{{item.typeName}}</p>
            <p class="oRnumber">订单号：<span>{{item.encodeId}}</span>
               <b class="orderMoney" v-if='item.type == 1'>+￥{{item.amount}}</b>
               <b class="orderMoney" v-else='item.type == 2'>-￥{{item.amount}}</b>
               <b class="orderMoney" v-else='item.type == 3'>-￥{{item.amount}}</b>
            </p>
            <p><span>{{item.time}}</span></p>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import {availableList} from '../../../api/utils.js'
import Nodate from '@/components/Common/Nodate.vue'
import alertBtn from '@/components/Common/alertBtn.vue'
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        list: [],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        num: 1,
        pageSize: 10,
        allnumber: 0,
        //提现
        accountTx:{
          name: "提现申请",
          messageshow: false,
          btnshow: false,
        },
        realAccount: '',

        amount: '',
        edit: true, //true使用新账户; false使用历史账户
        payAccountId: '', // 历史账户id
        payName: '', // 新账户名
        realName: '', // 新账户真实姓名
        withdrawAmount: '', //提现金额(11.11)
        smsCode: '' // 短信码
      };
    },
    computed:{
      ...mapGetters([
        'getAccount',//账户信息
        'getAccountSend',//发送短信
        'getAccountAmount',//待结算
        'getAccountWithdraw',//提现
      ])
    },
    components:{
      alertBtn,
      Nodate
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        setTimeout(() => {
          this.num += 1;
          let lastValue = this.list.length;
          if (lastValue < this.allnumber) {
            this.loadDate();
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
      loadDate() {
        const data = {
          'page':this.num,
          'size': this.pageSize
        }
        availableList(this.qs.stringify(data)).then(res => {
          if (res.data.code == 200) {
            res.data.data.availables.map((i, v) => {
              this.list.push(i)
            })
            this.allnumber = res.data.data.count
          }
        })
      },
      handleClick(index,id){
        if(index === 1){
          this.$router.push({path:"/s/endBill",query:{id:id}})
        }else if(index === 2){
          this.$router.push({path:"/s/deleBill",query:{id:id}})
        }else if(index === 3){
          this.$router.push({path:"/s/pullBill",query:{id:id}})
        }
      },
      //提现功能区
      //判断是否进行过提现
      changeAlert(){
          //待结算数据/账户余额
          let formDataAmount = new FormData();
          this.$store.dispatch('actionAccountAmount', formDataAmount)
          var alipayAccount = this.$store.state.OrderModule.account.alipayAccount
          console.log()
          this.amount = this.$store.state.OrderModule.account.amount/100
          //  console.log(alipayAccount)
          if(this.isEmpty(alipayAccount)){
            this.edit = true
            this.$('.alertBtnboxWtx').show()
          }else{
            this.edit = false
            this.$('.alertBtnbox').show()
          }
      },
      //更改账号
      changeAccount(){
        this.edit = true;
        this.$('.withdrawAmount').text(' ')
        this.$('.alertBtnboxWtx').show();
        this.$('.alertBtnbox').hide()
      },
      //提交提现数据
      emitdata(){
          let self = this;
          if(this.validate()){
            let formDataWithdraw = new FormData();
            formDataWithdraw.append('edit', this.edit);
            formDataWithdraw.append('payAccountId', this.payAccountId);
            formDataWithdraw.append('payName', this.realAccount);
            formDataWithdraw.append('realName', this.realName);
            formDataWithdraw.append('withdrawAmount', this.withdrawAmount);
            formDataWithdraw.append('smsCode', this.smsCode);
            formDataWithdraw.callback = function(msg){

              if(!self.isEmpty(msg)){
                self.$('.message').text(msg)
              }
              self.$('.alertBtnbox').hide();
						  self.$('.alertBtnboxWtx').hide();
              //待结算数据/账户余额
              let formDataAmount = new FormData();
              self.$store.dispatch('actionAccountAmount', formDataAmount)
            }
            //发送提现数据
            this.$store.dispatch('actionAccountWithdraw',formDataWithdraw)
            
          }
            // console.log(this.withdrawAmount)
      },
      //发送验证码
      accountSend(){
        if(this.validate()){
          this.$(".yzm_btn").attr('disabled',true);
          let time = 120;
          let self = this;
          let Times = null;
          if(time>0){
            Times = setInterval(function(){
              if(time > 0){
                self.$('.yzm_btn').text(time+'秒重新发送');
                time--;
              }else{
                clearInterval(Times);
                self.$('.yzm_btn').text('发送手机验证码')
                self.$(".yzm_btn").attr('disabled',false)
              }
            },1000)
          }else{
            clearInterval(Times)
          }
          this.$store.dispatch('actionAccountSend');
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
      //input判断
      validate() {
        //数据校验
        // console.log(this.edit)
          if (this.edit) {
              this.withdrawAmount = this.$('.withdrawAmount').val();					
              this.realName = this.$('.realName ').val();
              this.realAccount = this.$('.realAccount').val();
              this.smsCode = this.$('.smsCode').val();
              
              if (!/^(1\d{10})$/.test(this.realAccount) && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.realAccount)) {
                  this.$('.message').text('邮箱或手机号格式错误');
                  console.info('邮箱或手机号格式错误');
                  return false;
              }
              if (this.realAccount.length >= 100) {
                  this.$('.message').text('账号名称过长');
                  console.info('姓名为空');
                  return false;
              }
              if (this.isEmpty(this.realName)) {
                  this.$('.message').text('姓名为空');
                  console.info('姓名为空');
                  return false;
              }
              if (this.realName.length >= 100) {
                  this.$('.message').text('姓名过长');
                  console.info('姓名为空');
                  return false;
              }
              if (this.isEmpty(this.smsCode)) {
                  this.$('.message').text('请输入验证码');
                  console.info('请输入验证码');
                  return false;
              }
          } else {
              this.payAccountId = this.$store.state.OrderModule.account.alipayAccount.id					
              this.withdrawAmount = this.$('.withdrawAmountTx').val();
          }
          // console.log(this.withdrawAmount)
          // console.log(this.amount)
          if (this.isEmpty(this.withdrawAmount) || !/^([0-9]+(.[0-9]{1,2})?)$/.test(this.withdrawAmount) || this.withdrawAmount*100 == 0) {
              this.$('.message').text('输入金额无效');
              console.info('输入金额无效');
              return false;
          }
          if (this.withdrawAmount*1 > this.amount*1) {
              this.$('.message').text('金额已超过可提现余额');
              console.info('金额已超过可提现余额');
              return false;
          }
          if (this.withdrawAmount*1 < 0.1) {
              this.$('.message').text('提现金额不能小于0.1元');
              console.info('输入金额无效');
              return false;
          }
          return true;
      }
    },
    created() {
        this.loadDate();
      //支付宝账户数据
        let formDataAccount = new FormData();
        this.$store.dispatch('actionAccount',formDataAccount)
      //待结算数据/账户余额
        let formDataAmount = new FormData();
        this.$store.dispatch('actionAccountAmount', formDataAmount)
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };

</script>
