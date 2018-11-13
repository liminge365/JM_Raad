<template>
  <div>
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
												<p>支付宝名称：<span  v-if="getAccount.alipayAccount != undefined" class="intaccount">{{getAccount.alipayAccount.realName}}</span></p>
												<p>支付宝账号：<span  v-if="getAccount.alipayAccount != undefined" class="intaccount">{{getAccount.alipayAccount.alipayName}}</span></p>
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
		<!-- 订单类型 -->
        <alertBtn class="alertOrderTypebox" :alertObj="alertOrderType" >
						<ul class="accountType">
								<li v-for="(value,index) in alertOrderTypelist" :key="index"
									@click="fnaddAzu"
									:id="value.id"
									class="aTli" >
										<div class="lis">
												<span>{{value.name}}</span>
												<!-- <i class="iconfont icon-xiayibu"></i>  -->
										</div>
								</li>
						</ul>
            <div class="btn" @click="fnAccountZuSet">完成</div>
        </alertBtn>
		<!-- 内容 -->
				<mt-loadmore
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				:autoFill = false
				ref="loadmore"
				class="loadmore">
						<div class="order_top">
								<div class="getMoney_box">
										<p class="o_p" v-if="getAccountAmount.availableAmount == 0">￥0.00</p>
										<p class="o_p" v-else>￥{{getAccountAmount.availableAmount/100}}</p>
										<div class="o_div">账户余额</div>
										<button class="button"  @click="changeAlert">提现</button>
								</div>
								<div class="getMoney_box orderDtail_box">
										<div class="getMoney_box_x">
										<p class="o_p" v-if="getAccountAmount.delayAmount == 0">￥0.00</p>
										<p class="o_p" v-else>￥{{getAccountAmount.delayAmount/100}}</p>
										<div class="o_div">待结算</div>
										<router-link to="/s/orderDtail" class="button">账户详情</router-link>
										</div>
								</div>
						</div>
						<div class="order_content">
								<div class="cont_title">
								<span class="ct_left">订单数量<b>{{getOrder.counts}}</b></span>
								<a class="ct_right"  @click="alertOrderTypeboxshow"><span v-text="orderName">全部订单</span><i class="iconfont  icon-xiayibu"></i></a>
								</div>
								<!-- 订单列表 -->
									<div class="order_list" v-for="(value,index) in getOrder" :key="index">
										<!-- 过期订单 -->
										<div class="list_toDtail" v-if="value.type === 1 &&  value.state === 2 ">
											<img src="/static/image/home/tu2.png" alt="">
											<div class="ol_cont">
													<p class="ol_name"> {{value.order_name}}</p>
													<p class="ol_num">订单号：<span>{{value.code}}</span></p>
													<p class="ol_money" v-if="value.amount != -1"><span>￥{{value.amount}}</span></p>
													<p class="ol_time" >{{value.order_desc}}</p>
											</div>
										</div>
										<!-- 未接单 -->
										<router-link class="list_toDtail" v-if="value.type === 1 &&  value.state === 1"  :to="{path:'/s/OrdertTaskDtail',query:{rk:value.rk}}">
											<img v-if="value.type === 1 && value.state == 1" src="/static/image/home/tu1.png" alt="">
											<img v-if="value.type === 1 && value.state != 1" src="/static/image/home/tu2.png" alt="">
											<div class="ol_cont">
													<p class="ol_name"> {{value.order_name}}</p>
													<p class="ol_num">订单号：<span>{{value.code}}</span></p>
													<p class="ol_money" v-if="value.amount != -1"><span>￥{{value.amount}}</span></p>
													<p v-if="value.desc_num != ''"    class="ol_time" >离任务结束还有<span>{{value.desc_num}}{{value.order_desc}}</span>,去发文>></p>
											</div>
										</router-link>
										<!-- 执行中订单 -->
										<router-link class="list_toDtail" v-if="value.type === 1 &&  value.state !=1 &&  value.state !=2 " :to="{path:'/s/waitEndBill',query:{rk:value.rk}}">
											<img v-if="value.type === 1 && value.state == 1" src="/static/image/home/tu1.png" alt="">
											<img v-if="value.type === 1 && value.state != 1" src="/static/image/home/tu2.png" alt="">
											<div class="ol_cont">
													<p class="ol_name"> {{value.order_name}}</p>
													<p class="ol_num">订单号：<span>{{value.code}}</span></p>
													<p class="ol_money" v-if="value.amount != -1"><span>￥{{value.amount}}</span></p>
													<p  v-if="value.order_desc  != '' " class="ol_time" >{{value.desc_num}}{{value.order_desc}}</p>
											</div>
										</router-link>
										<!-- 广告/传 -->
										<router-link  class="list_toDtail" v-if="value.type != 1"  :to="{path:'/s/waitEndBill',query:{rk:value.rk}}" >
											<img v-if="value.type === 2 && value.state == 4" src="/static/image/home/guang.png" alt="">
											<img v-if="value.type === 2 && value.state != 4" src="/static/image/home/guangh.png" alt="">
											<img v-if="value.type === 3 && value.state == 4" src="/static/image/home/chuan.png" alt="">
											<img v-if="value.type === 3 && value.state != 4" src="/static/image/home/chuanh.png" alt="">
											<div class="ol_cont">
													<p class="ol_name"> {{value.order_name}}</p>
													<p class="ol_num">订单号：<span>{{value.code}}</span></p>
													<p class="ol_money" v-if="value.type == 1"><span>￥{{value.amount}}</span></p>
                        <p class="ol_money" v-if="value.type == 2"><span>￥{{value.amount}} 广告收益</span></p>
                        <p class="ol_money" v-if="value.type == 3"><span>￥{{value.amount}} 传播收益</span></p>
													<p  v-if="value.order_desc  != '' &&  value.state != 1 &&  value.state != 2 " class="ol_time" >{{value.desc_num}}{{value.order_desc}}</p>
											</div>
										</router-link>

									</div>
								<Nodate v-if="orderList === true"></Nodate>
						</div>
				</mt-loadmore>
  </div>
</template>
<script>
import alertBtn from '@/components/Common/alertBtn.vue'
import {mapGetters} from 'vuex'
import Nodate from '@/components/Common/Nodate.vue'
export default {
	data(){
		return{
			//订单
			alertOrderType:{
				name: "订单类型",
				accountTypeshow: true,
			},
			alertOrderTypelist:[
				{name:"全部订单",id:0},
				{name:"最新订单",id:1},
				{name:"执行中订单",id:2},
				{name:"已完成订单",id:3},
			],
			orderList: false,
			page: 1,
			type: 0,
			orderName: '全部订单',
			allLoaded: false,//是否显示加载中
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

		}
	},
	computed:{
		...mapGetters([
			'getOrder',//订单数据
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
	created(){
		//订单数据
			// let formData = new FormData();
			// formData.append('page', this.page);
			// formData.append('type', this.type);
			// formData.append('qq', this.page);
			let self = this;
			let queryData = {
            'page': this.page,
            'type': this.type
					}
			let params = {data:this.qs.stringify(queryData),page:this.page};
			params.callback= function(orders){
				if(orders.length === 0 ){
					self.orderList = true;
				}
			}
			this.$store.dispatch('actionOrder',params)
		//支付宝账户数据
			let formDataAccount = new FormData();
			this.$store.dispatch('actionAccount',formDataAccount)
		//待结算数据/账户余额
			let formDataAmount = new FormData();
			this.$store.dispatch('actionAccountAmount', formDataAmount)
	},
	methods:{
		//订单类型
		alertOrderTypeboxshow(){
			this.$('.alertOrderTypebox').show();
			// this.$('.aTli')[0].addClass('clicks');
			if(this.type == 0){
				this.$('.aTli')[0].className = 'aTli clicks'
			}
		},
		// 订单类型
		fnaddAzu(e){
			if(this.$(this.$(e.currentTarget)[0])[0].className.indexOf('clicks') == -1){
					this.$(this.$(e.currentTarget)[0]).addClass('clicks')
					this.$(e.currentTarget).siblings('.aTli').removeClass('clicks');
					this.type = parseInt(this.$(e.currentTarget)[0].id);

			}else{
					this.$(this.$(e.currentTarget)[0]).removeClass('clicks')
			}
		},
		fnAccountZuSet(){
			//按全部订单/最新订单///获取数据
			let self = this;
			this.page = 1
			this.orderName = this.alertOrderTypelist[this.type].name
			let queryData = {
            'page': this.page,
            'type': this.type
					}
			let params = {data:this.qs.stringify(queryData),page:this.page};
			params.callback= function(orders){
				// console.log(orders)
				if(orders.length === 0 ){
					self.orderList = true;
				}else{
					self.orderList = false;
				}
				self.$('.alertOrderTypebox').hide();
			}
			this.$store.dispatch('actionOrder',params);
		},
		loadBottom(){
			let self = this;
			this.page += 1;
			let queryData = {
            'page': this.page,
            'type': this.type
					}
			let params = {data:this.qs.stringify(queryData),page:this.page};
			params.callback= function(orders){
				// console.log(orders)
					if(orders.length === 0){
						self.allLoaded = true;// 若数据已全部获取完毕
					}
					self.$refs.loadmore.onBottomLoaded();
			}
			this.$store.dispatch('actionOrder',params);
		},
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
						self.$store.dispatch('actionAccountAmount', formDataAmount);
					}
					//发送提现数据
					this.$store.dispatch('actionAccountWithdraw',formDataWithdraw)
				}
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
}
</script>

<style lang="less" scoped>
.order_top, .order_content{
  width: 90%;
  margin: .2rem 5%;
  padding: .2rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px #EAEEF1;
}
.order_content{
	margin-top: 0;
}
.order_top::after{content:'';display:block;height:0;visibility:hidden;clear:both;}
.order_top{
  // display: flex;
  .getMoney_box{
    float: left;
    width: 50%;
    padding-left: 17%;
    box-sizing: border-box;
    .o_p{
      color: #29B0E7;
    }
    .o_div{
      color: #595E62;
    }
    .button{
      padding: 1px 3px;
      border-radius: 3px;
      background: #29B0E7;
      color: #fff;
      border: none;
      font-size: 12px;
    }
  }
  .orderDtail_box{
    border-left: 1px solid #EAEAE8;
  }
}
.cont_title{
  height: .2rem;
  .ct_left{
    float: left;
    font-size: 14px;
    color: #4E5862;
    b{
      font-weight: normal;
      font-size: 12px;
      color: #29B0E7;
    }
  }
  .ct_right{
    float: right;
    color: #29B0E7;
    i{
      font-size: 12px;
    }
  }
}
//订单列表
.order_list{
  display: flex;
	.list_toDtail{
		display: block;
		display: -webkit-box;
    display: flex;
		margin-top: .2rem;
		width: 100%;
	}
  img{
    width: .35rem;
    height: .35rem;
    margin-top: .1rem;
  }
  .ol_cont{
		margin-left: .1rem;
		width: 75%;
    .ol_name{
			color: #4E5862;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
    }
    .ol_num{
      color: #595E62;
    }
    .ol_money{
      color: #4E5862;
    }
    .ol_time{
      color: #29B0E7;
    }
  }
}
</style>
