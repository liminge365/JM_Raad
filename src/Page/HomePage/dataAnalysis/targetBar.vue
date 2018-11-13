<template>
    <div class="targetBar" >
        <!-- 遮罩层 -->
        <div class="mask" @click="hidebox"></div>
        <!-- 是否弹窗 -->
        <div class="kuang" >
            <i class="iconfont icon-bt_quxiao_b " @click="closeBox"></i>
            <div class="prompt_text">指标选择</div>
            <div id="scroll-1">
            <ul class="accountType">
                <li @click="addClicks" class="accountTypeli" v-for="(value,index) in data.list" :key="index"  :id="value.id">
                    <div class="lis">
                        <span>{{value.name}}</span>
                        <!-- <i class="iconfont icon-xiayibu"></i>  -->
                    </div>
                </li>
            </ul>
            </div>
            <div class="btn" @click="emitObj">完成</div>
        </div>
    </div>
</template>
<script>
import bus from '@/eventJs/bus.js'
export default {
    name: 'targetBar',
    props:{
        targetBar: Object
    },
    data () {
        return {
            data: this.targetBar,
            ulli_Id: 1,
            ulli_name: '',
            i: 0,
        }
    },
    created(){
        //指标选择
        this.$nextTick(()=>{
            let self = this;
            this.$('.accountType').each(function(i,v){
                self.$(v)[0].children[0].className='accountTypeli clicks';
            })
            this.$(document).on('click','.accountTypeli',(e)=>{
                if(this.i==0){
                    this.$(e.currentTarget).addClass("clicks");
                }else{
                    this.$(e.currentTarget).removeClass("clicks");
                    this.i=0;
                }
            })
        })
    },
    methods:{
        //点击遮罩层隐藏弹框
        hidebox(){
            this.$('.targetBar').hide();
        },
        closeBox(){
            this.$('.targetBar').hide();
        },
        //获取点击的选项id
        addClicks(e){
            let lis = document.getElementsByClassName('accountTypeli')
            for(let i=0;i<lis.length;i++){
                lis[i].className = 'accountTypeli';
            }
            this.ulli_Id = this.$(e.currentTarget)[0].id;
            this.ulli_name = this.$(e.currentTarget)[0].innerText;
        },
        //将选中id发送给页面
        emitObj(){
            console.log(this.data)
            this.hidebox();
            this.closeBox();
            if(this.$route.name == 'OneDataBar'){
                bus.$emit('OneDataBar',{zuId:this.data.zuId,ulli_Id:parseInt(this.ulli_Id),ulli_name:this.ulli_name})
            };
            if(this.$route.name == 'Whole'){
                bus.$emit('Whole',{zuId:this.data.zuId,ulli_Id:parseInt(this.ulli_Id),ulli_name:this.ulli_name})
            };
            if(this.$route.name == 'Rank'){
                bus.$emit('Rank',{zuId:this.data.zuId,ulli_Id:parseInt(this.ulli_Id),ulli_name:this.ulli_name})
            }
        },
        
    }
}
</script>

<style lang="less" scoped>
.targetBar{
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
      // 添加滚动条
      #scroll-1{
          margin-bottom: .1rem;
          max-height: 2.4rem;
          overflow: auto;
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
.accountType{
    margin: auto;
    padding-bottom: .2rem;
    li{
        width: 80%;
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
</style>

