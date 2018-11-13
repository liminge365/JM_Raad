<template>
  <div class="reset">
    <!--<div class='dialog'>
        <div class="htmleaf-container" >
          <p class="wenzi">头像裁剪 <i class="iconfont icon-guanbi"></i></p>
          <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
            <input class="sr-only" id="inputImage" name="file" type="file" accept="image/*">
            <span  data-toggle="tooltip" >
              点击上传
            </span>
          </label> 
          <div class="box">
            <div class="img-container">
              <img id="idimg" src="/static/image/home/nodata.png" alt="Picture">
            </div>
          </div>
          <div class="btn-group">
            <button class="bigbtn" data-method="zoom" data-option="0.1" type="button" >
                <i class="iconfont icon-jiahao"></i>
            </button>
            <button class="bigbtn smallbtn" data-method="zoom" data-option="-0.1" type="button" >
                <i class="iconfont icon-jianhao"></i>
            </button>
            <button  class="rightbtn right-i" data-method="rotate" data-option="-45" type="button" >
                <i class="iconfont icon-icon_rotate"></i>
            </button>
            <button class="rightbtn" data-method="rotate" data-option="45" type="button" >
                <i class="iconfont icon-icon_rotate"></i>
            </button>
          </div>
          <div class="btnbox">
            <button class="showimg"  data-method="getCroppedCanvas" type="button">
              <span id='okbtn' data-toggle="tooltip" >
                确认
              </span>
            </button>
            <button class="nobtn">取消</button>
          </div>
      </div>
    </div>-->
    <div class="setHeight">
        <content-top title='资料管理'></content-top> 
        <div class="newReset">
            <ul>
                <li>
                    <b>头像</b>
                    <p>
                      <img v-if='getUserInfo.avatar' class='userhead' :src="getUserInfo.avatar" alt="">
                      <img v-else class='userhead' src="/static/image/home/userhead_big.png" alt="">
                    </p>
                </li>
                <li>
                    <b>等级</b>
                    <p v-if='getUserInfo.vip == 1'><img src="/static/image/home/vips.png" alt=""><span>普通会员</span></p>
                    <p v-else><img src="/static/image/home/vip.png" alt=""><span class='higher'>高级会员</span></p>
                </li>
                <li>
                    <b>用户名</b>
                    <p>{{getUserInfo.name}}</p>
                </li>
                <li>
                    <b>手机号</b>
                    <p>{{getUserInfo.loginName}}</p>
                </li>
                <li>
                    <b>个人介绍</b>
                    <p></p>
                </li>
            </ul>
        </div>
         <!--<div class='quit'>
            <span>保存设置</span>
        </div>-->
    </div>
  </div>
</template>

<script>
// import '../../../assets/cropper/js/jquery.min.js'
// import '../../../assets/cropper/js/bootstrap.min.js'
// import '../../../assets/cropper/js/cropper.js'
// import '../../../assets/cropper/js/main.js'
import ContentTop from '@/components/Common/ContentTop.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'setup',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  mounted () {
    this.$store.dispatch('actionUserInfo', {});
  },
  components:{
      ContentTop
  }
}
</script>

<style lang='less' scoped>
@import '../../../assets/cropper/css/cropper.css';
@import '../../../assets/cropper/css/default.css';
@import '../../../assets/cropper/css/main.css';
@import '../../../assets/cropper/css/newcss.css';
@import '../../../assets/style/vars.less';
.reset{
  .flex();
  position:relative;
  .setHeight{
    position:absolute;
    width: 100%;
    height:100%;
    .display-flex();
    .column();
     background-color:#eaf2f2;
    .newReset{
        .flex();
        overflow-y:auto;
        padding-top:15px;
        box-sizing:border-box;
        ul{
            li{
                background-color:#fff;
                margin-bottom:7px;
                color:@blue-text-color;
                padding:14px 16px 14px 28px;
                box-sizing:border-box;
                .display-flex();
                .space-between();
                .align-item();
                font-size:12px;
                p{
                  .display-flex();
                  .align-item();
                  .userhead{
                      width:70px;
                      height:70px;
                      border-radius:50%;
                  }
                  span{
                      color:#ccc;
                      padding-left:3px;
                  }
                  .higher{
                      padding-left:3px;
                      color:#f68c1c;
                  }
                }
            }
        }
    }
    .quit{
        text-align:center;
        height:.4rem;
        line-height:.4rem;
        background-color:#fff;
        color:@blue-text-color;
        cursor:pointer;
        margin-bottom:10px;
    }
  }
}
</style>
