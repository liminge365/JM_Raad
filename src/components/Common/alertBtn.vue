<template>
    <div class="alertBtn" >
        <!-- 遮罩层 -->
        <div class="mask" @click="hidebox"></div>
        <!-- 是否弹窗 -->
        <div class="kuang" >
            <i class="iconfont icon-bt_quxiao_b " @click="closeBox"></i>
            <div class="prompt_text">{{newalertObj.name}}</div>
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'alertBtn',
    props:{
        alertObj: Object
    },
    data(){
        return{
            newalertObj:{
                name: '',
                accountint: '',
                delCache: false,//是不是账号的页面
            },
            ulli_Id: 1,
            i: 0
        }
    },
    created(){
        this.newalertObj.name = this.alertObj.name
        this.newalertObj.accountint = this.alertObj.accountint
        this.newalertObj.delCache = this.alertObj.delCache
    },
    methods: {
        //点击遮罩层隐藏弹框
        hidebox(){
            this.$('.alertBtn').hide();
        },
        closeBox(e){
            let self = this;
            this.$('.alertBtn').hide();
            this.$('.message').text('');
            this.$('input').val('');
            //解决点击列表改变背景色，但是没点击完成。做到不缓存背景色。
            if(this.newalertObj.delCache){
                this.$(this.$(e.currentTarget).parent().find('.accountType')[0].children).each(function(i,v){
                    if(!self.$(v)[0].dataset.nocli){
                        self.$(v)[0].className = 'accountTypeli'
                    }
                })
            }
        },
    }
  }
</script>
<style lang="less" scoped>
.alertBtn{
    display: none;
}
// 遮罩层
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.2;
    -moz-opacity: 0.2;
    z-index: 8888;
}
.kuang{
      background: #fff;
      opacity: 1;
      -moz-opacity: 1;
      width: 80%;
      padding-bottom: .2rem;
      box-sizing: border-box;
      z-index: 9999;
      position: fixed;
      top: 50%;
      left:50%;
      -webkit-transform:translate(-50%, -50%);
      transform:translate(-50%, -50%);
      color: #969696;
      border-radius: .05rem;
      box-shadow: 0 0 .03rem .01rem #ececec;
}
.icon-bt_quxiao_b{
    float: right;
    margin: 5px 5px 0 0;
}
.prompt_text{
    text-align: left;
    font-size: 12px;
    width: 80%;
    margin: .2rem 0 .15rem 10%; 
}
.accountMoney{
    text-align: left;
    font-size: 12px;
    width: 80%;
    margin: 0 0 .15rem 10%; 
    span{
        color: #29B0E7;
    }
}
//input
.label_int{
    display: block;
    margin: auto;
    margin-bottom: .1rem;
    width: 80%;
    height: .3rem;
    line-height: .3rem;
    border: 1px solid #F2F2F0;
    border-radius: 3px;
    input{
        width: 90%;
        margin-left: 5%;
        border: none;
    }
}
.yzm{
    display: flex;
        width: 80%;
        height: .3rem;
        line-height: .3rem;
        margin: auto;
        margin-bottom: .2rem;
    .yzm_int{
        flex: 2;
        height: .28rem;
        line-height: .28rem;
        display: block;
        border: 1px solid #F2F2F0;
        border-radius: 3px;
        input{
            width: 80%;
            margin-left: 10%;
            border: none;
        }
    }
    .yzm_btn{
        flex: 2;
        background: #29B0E7;
        color: #fff;
        text-align: center;
        margin-left: .1rem;
        border-radius: 3px;
        border: none;
    }
}
//ul「
.accountType{
    margin: auto;
    padding-bottom: .2rem;
    li{
        width: 80%;
        margin-bottom: 1px;
        margin: auto;
    }
    .lis{
        width: 70%;
        height: .3rem;
        line-height: .3rem;
        border-bottom: 1px solid #F4F6F5;
        color: #ABAFB2;
        // background: red;
        margin: auto;
        .icon-xiayibu{
            float: right;
            font-size: 12px;
        }
    }
    .clicks{
        background: #29B0E7;
        .lis{
            border-color: #29B0E7;
            color: #fff;
        }
    }
}
//提示
.message{
    height: .3rem;
    line-height: .3rem;
    text-align: right;
    width: 70%;
    margin: auto;
    font-size: 12px;
    color: #CC1819;
}
.btn{
    width: 80%;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    background: #29B0E7;
    color: #fff;
    border-radius: 3px;
    margin:  auto;
}
//提现过的账户，更改账户
.dl{
		width: 80%;
    margin: 0 10%;
		height: .55rem;
		display: flex;
		.dt{
				width: 24%;
				height: .38rem;
				div{
						width: 100%;
						padding: 0 5px;
						height: .34rem;
						line-height: .34rem;
						margin-top: 0.02rem;
						background: #2ab3e7;
						color: #ffffff;
						text-align: center;
						border-radius: 3px;
				}
		}
		.dd{
				width: 72%;
				p{
						height: .20rem;
						line-height: .20rem;
						overflow: hidden;
						text-overflow: ellipsis;
                        white-space: nowrap;
                        .intaccount{
                            width: 26%;
                            display: inline-block;
                            cursor: default;
                            overflow-x: scroll;
                            position: absolute;
                        }
                        .intaccount::-webkit-scrollbar {
                            display:none
                        }
				}
		}
}
</style>