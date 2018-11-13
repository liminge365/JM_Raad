<template>
  <div class="HomePage">
        <netease v-if="typeId==1" :logo='logo' ></netease>
        <qie v-if="typeId==2" :logo='logo' ></qie>
        <sohu v-if="typeId==3" :logo='logo' ></sohu>
        <yidianzixun v-if="typeId==4" :logo='logo' ></yidianzixun>
        <ucdy v-if="typeId==5" :logo='logo' ></ucdy>
        <kandian v-if="typeId==9" :logo='logo'></kandian>
        <fenghh v-if="typeId==10" :logo='logo' ></fenghh>
        <btime v-if="typeId==12" :logo='logo' ></btime>
        <east v-if="typeId==22" :logo='logo' ></east>
        <qutoutiao v-if="typeId==23" :logo='logo' ></qutoutiao>
        <kuaichuan v-if="typeId==25" :logo='logo' ></kuaichuan>
  </div>
</template>
<script>
import netease from './netease';
import qie from './qie';
import sohu from './sohu';
import yidianzixun from './yidianzixun';
import ucdy from './ucdy';
import kandian from './kandian';
import fenghh from './fenghh';
import btime from './btime';
import east from './east';
import qutoutiao from './qutoutiao';
import kuaichuan from './kuaichuan';

import {getAccountSingleType} from '../../../api/utils'
export default {
  components:{
    netease,
    qie,
    sohu,
    yidianzixun,
    ucdy,
    kandian,
    fenghh,
    btime,
    east,
    qutoutiao,
    kuaichuan
  },
  data(){
    return{
      typeId: '',
      logo:''
    }
  },
  created(){
    this.typeId = this.$route.params.typeId;
    console.log(this.typeId);
    let _self = this;
    let form = new FormData();
    form.append('account_type',this.typeId);
    getAccountSingleType(form).then((res)=>{
      if(res.data.code!=200){
        _self.$router.go(-1)
      }else{
        _self.logo = res.data.data;
      }
    })

  }
}
</script>

<style lang="less">
//输入验证啊弹出框
    // 遮罩层
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        background-color: #000;
        opacity: 0.2;
        -moz-opacity: 0.2;
        z-index: 8888;
    }
    .acgivePopup{
        display: block;
        width: 3.3rem;
        background: #ffffff;
        opacity: 1;
        -moz-opacity: 1;
        z-index: 9999;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        color: #7a7f81;
        line-height: .3rem;
        padding: .3rem .2rem;
        .p-title{
            font-size: .16rem;
            color: #282828;
            line-height: .4rem;
        }
        .times{
            color: #2ab2e7;
        }
        input{
            width: 91%;
            height: .44rem;
            border: 1px solid #ecefef;
            padding-left: .2rem;
            border-radius: .03rem;
            margin: .15rem 0;
        }
        ::-webkit-input-placeholder{
            color: #b5b5b5;
        }
        .dele{
            display: block;
            width: 100%;
            font-size: 14px;
            height: .5rem;
            line-height: .5rem;
            background: #29B0E7;
            border: none;
            text-align: center;
            color: #fff;
            cursor: pointer;
        }
    }
//账号授权
    .gr-content{
        width: 100%;
        .cont-top{
            width: 62%;
            margin: .6rem 19% 0;
            p{
                color: #7a7f81;
                font-size: .14rem;
                font-weight: normal;
            }
            .errorcont{
                width: 80%;
                margin-left: 15%;
                padding-top: 5px;
                text-align: right;
                font-size: .12rem;
                margin-bottom: .1rem;
                color: #ff9a38;
                padding-right: .2rem;
                text-align: right;
                span{
                    display: inline-block; text-align: left;
                }
            }
            .wechat{
                width: 100%;
                height: .46rem;
                position: relative;
                dt{
                    width: .46rem;
                    height: .47rem;
                    position: absolute;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                dd{
                    height: .46rem;
                    padding-left: .6rem;
                    .tp{
                        font-size: .16rem;
                    }
                    .cp{
                        font-size: .14rem;
                    }
                }
            }
            .xinlang{
                width: 100%;
                dt{
                    width: 100%;
                    height: .47rem;
                    img{
                        height: 100%;
                    }
                }
                dd{
                    width: 100%;
                    height: .37rem;
                    line-height: .37rem;
                }
            }
            .int{
                height: .46rem;
                line-height: .46rem;
                font-size: .14rem;
                margin-top: .13rem;
                .text-input{
                    display: inline-block;
                    width: 80%;
                    height: .47rem;
                    padding : 0 .14rem;
                    box-sizing: border-box;
                    border-radius: .05rem;
                    border: 1px solid #dae0e1;
                    -webkit-box-shadow: 0 0 0px 1000px white inset; 
                    input{
                        width: 100%;
                        border: none;
                    }
                    input::-webkit-input-placeholder {
                        color: #7a7f81;
                        font-size: .12rem;
                    }

                    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
                        -webkit-box-shadow: 0 0 0 1000px white inset; 
                    } 
                    input[type=text]:focus, input[type=password]:focus, textarea:focus {
                        -webkit-box-shadow: 0 0 0 1000px white inset; 
                    }

                }
                
            }
            .btn-box{
                margin-left: .35rem;
                width: 80%;
                height: .6rem;
                display: flex;
                align-content: space-between;
                .btn{
                    flex: 1;
                    height: .41rem;
                    text-align: center;
                    line-height: .41rem;
                    font-size: 16px;
                    font-weight: bold;
                    color: #696969;
                    border-radius: .03rem;
                    border: 0.5px solid #f3f3f3;
                    font-weight: normal;
                    cursor: pointer;
                    &:hover{
                        background: #29B0E7;
                        color: #fff;
                        border-color: #fff;
                    }
                }
                .hover{
                    background:#29B0E7;
                    color: #fff;
                    border-color: #fff;
                    margin-right: .1rem;
                }
            }
            .another{
                // display: none;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                color: #7a7f81;
                font-size: .12rem;
                line-height: .5rem;
                span{
                    display: block;
                    width: .8rem;
                    height: .5rem;
                    line-height: .5rem;
                }
                i{
                    color: #2ab2e7;
                    font-size: .3rem;
                    margin: 0 .1rem .1rem .1rem;
                    width: 10%;
                }
                .icon-weibo1{
                    color: #e30e24;
                }
            }
        }
        .cont-bottom{
            border-top: 1px solid #f3f3f3;
            padding: .2rem 19% 0;
            h3{
                color: #676b6d;
                font-size: .16rem;
                padding-bottom: .1rem;
                font-weight: normal;
            }
            p{
                color: #7a7f81;
                font-size: .14rem;
                line-height: .24rem;
                font-weight: normal;
                a{
                    color: #2ab2e7;
                }
            }
        }
    }
</style>
