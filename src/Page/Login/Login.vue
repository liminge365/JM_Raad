<template>
  <div>
    <div class="swiper-container banner-container">
      <div class="swiper-wrapper">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="slide1">
            <div class="userJianMei">
              <div class="topJianMei">
                <div class="logoJianMei"><img src="/static/image/login/jianmei.png" alt=""></div>
                <div class="infoJianMei">
                  <li class="reading"><a  @click='routeRead'>简媒阅读</a></li>
                  <li class='tologin' @click='tologin'>登录</li>
                  <li class='toregister' @click='toregister'>注册</li>
                </div>
              </div>
            </div>
            <div class="business">
              <div class="swiperbus businessText">
                <div class="businessText-left">
                  <div>
                    <h4>
                      <p>运营用简媒 </p>
                      <p> 又快又省心</p>
                    </h4>
                  </div>
                  <div class='onebtn'>
                    <p>3秒发布运维100+账号 </p>
                    <p> 一键发布全平台</p>
                  </div>
                  <ul class='mobileList'>
                    <div class='newset'>
                      <li><img src="/static/image/accountmsg/baijia.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/onenumber.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/qie.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/qu.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/wechat.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/sfox.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/mzl.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/fish.png" alt=""></li>
                    </div>
                    <div class='newset'>
                      <li><img src="/static/image/accountmsg/fengh.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/kch.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/toutiao.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/xinlang.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/wangyi.png" alt=""></li>
                      <li><img src="/static/image/accountmsg/bjtime.png" alt=""></li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="information">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>01/09</span></div>
              <div><img src="/static/image/login/wdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide9">
            <div class="business">
              <div class="businessText-right">
                <div class="scalebus">
                  <div class="login" @keyup.13='login'>
                    <div class="topLogin">
                      <span class='active loginIn' @click="$('.register').hide();$('.login').show()">登录</span>
                      <b></b>
                      <span class='registerIn' @click="$('.register').show();$('.login').hide()">注册</span>
                    </div>
                    <div class="input-one">
                      <i class='iconfont icon-msnui-tel'></i>
                      <input type="text" class="form-control top-ju" placeholder="请输入手机号" v-model='usertel'>
                    </div>
                    <div class="input-one">
                      <i class='iconfont icon-suoding'></i>
                      <input type="password" data-msg-required="密码不能为空" class="form-control" placeholder="请输入密码" v-model='password'>
                    </div>
                    <div class="message" v-show='errmsg_1'>{{tishi}}</div>
                    <div class="input-two">
                      <a class="form-control2" @click='login'>登录</a>
                    </div>
                    <div class="wenzi">
                      <p><span class='okuser'><a @click='forget'>忘记密码</a></span></p>
                    </div>
                  </div>
                  <div class="register" @keyup.13='register'>
                    <div class="topLogin">
                      <span class='loginIn' @click="$('.register').hide();$('.login').show()">登录</span>
                      <b></b>
                      <span class='active registerIn' @click="$('.register').show();$('.login').hide()">注册</span>
                    </div>
                    <div class="input-one">
                      <i class='iconfont icon-msnui-tel'></i>
                      <input type="text" class="form-control top-ju" placeholder="请输入手机号" v-model='usertel_2'>
                    </div>
                    <div class="input-one">
                      <i class='iconfont icon-suoding'></i>
                      <input type="password" data-msg-required="密码不能为空" class="form-control" placeholder="请输入密码" v-model='password_2'>
                    </div>
                    <div class="identifyingcode">
                      <p>
                        <i class="iconfont icon-msnui-msg-invert"></i>
                        <input type="text" placeholder="请输入验证码" v-model='imgyzm'>
                      </p>
                      <img class='yzcode' @click='getimgyzm' :src="src" alt="">
                    </div>
                    <div class="identifyingcode">
                      <p>
                        <i class="iconfont icon-xinfeng"></i>
                        <input type="text" placeholder="请输入短信验证码" v-model='infoyzm'>
                      </p>
                      <button class="btn" ref='btn' @click='getyzmTime'>{{getTime}}</button>
                    </div>
                    <div class="input-one">
                      <i class='iconfont icon-woyaoyaoqingicon'></i>
                      <input type="text" class="form-control top-ju" placeholder="邀请码" v-model.trim="invitedcode">
                    </div>
                    <div class="message" v-show='errmsg_2'>{{tishi_2}}</div>
                    <div class="input-two">
                      <a class="form-control2" @click='register'>注册</a>
                    </div>
                    <div class="wenzi">
                      <p><span class='okuser'>点击“注册”表明您同意遵守简媒<router-link to='/protocol'>用户协议</router-link>和<router-link to='/privacy'>隐私政策</router-link></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="information binformation infos">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>02/09</span></div>
              <div><img src="/static/image/login/bdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide2">
            <div class="title">
              <div><span>核心功能</span></div>
              <div class='English'><span>Core functions</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus core">
                <ul class='mobilecoreList'>
                  <li>
                    <p class="setImg">
                      <img src="/static/image/login/public.png" alt="" />
                    </p>
                    <p class="coreTitle">一键发布</p>
                    <p class="introduce">简媒一键发布工具，将内容一键分发至13个头部媒体平台。最大化提升内容曝光量和影响力，同时节省90%的运营时间，让自媒体人和运营人专心创作。</p>
                  </li>
                  <li>
                    <p class="setImg">
                      <img src="/static/image/login/order.png" alt="" />
                    </p>
                    <p class="coreTitle">订单任务</p>
                    <p class="introduce">简媒基于大数据和人工智能技术，为入驻账号匹配与账号相关的优质内容。自媒体人可选择分发内容，提升收益。</p>
                  </li>
                  <li>
                    <p class="setImg">
                      <img src="/static/image/login/zh.png" alt="" />
                    </p>
                    <p class="coreTitle">多账号管理</p>
                    <p class="introduce">多平台账号密码云级安全托管，无需重复登陆。用户可根据使用需求，对账号实行分类管理，轻松实现账户托管、运营发布、效果监控。</p>
                  </li>
                  <li>
                    <p class="setImg">
                      <img src="/static/image/login/data.png" alt="" />
                    </p>
                    <p class="coreTitle">即时数据</p>
                    <p class="introduce">文章发布后，数据实时回传，基础推荐量、阅读量、点赞量、评论量实时监控，同时动态分析内容传播效果、帐号传播价值。支持高级报告一键下载。</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="information">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>03/09</span></div>
              <div><img src="/static/image/login/wdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide3">
            <div class="title wtitle">
              <div><span>他们都在用</span></div>
              <div class='English'><span>They are all using</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus user">
                <ul>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_orange.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_bsbdqj.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_p2p.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_bjcsh.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_bdsh.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_cp.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_ctt.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_cyb.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_cyhm.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_dc.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_ggmt.png" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/partner_lyw.png" alt="" /></li>
                </ul>
              </div>
            </div>
            <div class="information">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>04/09</span></div>
              <div><img src="/static/image/login/wdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide4">
            <div class="title">
              <div><span>媒体评价</span></div>
              <div class='English'><span>Media evaluation</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus evaluate">
                <ul>
                  <li class='evaluate-image'><img src="http://www.ejianmedia.com/static/image/home/comment_cyhm.jpg" alt="" /></li>
                  <li class='evaluate-title'>
                    <div class="arrow"></div>
                    <h4>创业黑马</h4>
                    <p>简媒，成功解决自媒体人的痛点，让创作变得简单。这样相对完善的创新创业生态，为成为下一个独角兽奠定了极大的基础。</p>
                  </li>
                  <li class='evaluate-title'>
                    <div class="arrow1"></div>
                    <h4>CMO训练营</h4>
                    <p>如果想开通并运营全平台的自媒体账号，就用简媒吧。</p>
                  </li>
                  <li class='evaluate-image'><img src="http://www.ejianmedia.com/static/image/home/comment_cmo.jpg" alt="" /></li>
                </ul>
              </div>
            </div>
            <div class="information binformation">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>05/09</span></div>
              <div><img src="/static/image/login/bdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide5">
            <div class="title wtitle">
              <div><span>合作客户</span></div>
              <div class='English'><span>Partner</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus partner">
                <ul>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_cctv.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_fireball.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_fdzb.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_ivvi.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_htqc.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_hyzb.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_hllm.jpg" alt="" /></li>
                  <li><img src="http://www.ejianmedia.com/static/image/home/customer_jjhyl.jpg" alt="" /></li>
                </ul>
              </div>
            </div>
            <div class="information">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>06/09</span></div>
              <div><img src="/static/image/login/wdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide6">
            <div class="title">
              <div><span>关于我们</span></div>
              <div class='English'><span>About us</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus aboutus">
                <div class="aboutus-left">
                  北京简媒信息科技有限公司（以下简称：简媒），依托人工智能和大数据，致力于为新媒体人提供运营工具、数据工具和商业对接服务。简媒平台支持数十个头部图文、视频平台一键发布，实时生成智能数据报告，极大提升运营人员工作效率。为自媒体人提供版权保护、内容变现，对接投资服务。同时依托海量自媒体数据，为企业用户提供高效、透明的可视化公关运营、品牌推广、市场营销服务。
                </div>
              </div>
            </div>
            <div class="information binformation">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>07/09</span></div>
              <div><img src="/static/image/login/bdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide7">
            <div class="title wtitle">
              <div><span>联系我们</span></div>
              <div class='English'><span>Contact us</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus contant">
                <div class="contant-top">
                  <img src="/static/image/login/map.jpg" alt="">
                </div>
                <div class="contant-bottom">
                  <ul>
                    <li>
                      <span>简媒公众号</span>
                      <div><img src="/static/image/login/ewm1.jpg" alt=""></div>
                    </li>
                    <li>
                      <span>简媒客服</span>
                      <div><img src="/static/image/login/ewm2.jpg" alt=""></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="information">
              <div><span>READ MORE</span></div>
              <div class="nums"><span>08/09</span></div>
              <div><img src="/static/image/login/wdown.png" alt=""></div>
            </div>
          </swiper-slide>
          <swiper-slide class="slide8">
            <div class="title">
              <div><span>友情链接</span></div>
              <div class='English'><span>Links</span></div>
              <div><b></b></div>
            </div>
            <div class="business">
              <div class="swiperbus links">
                <ul>
                  <li><a href="http://zmt.yizhuan5.com" target="_blank">易撰大数据</a></li>
                  <li><a href="https://www.sxl.cn" target="_blank">小程序制作</a></li>
                  <li><a href="http://www.juweixin.com" target="_blank">公众号二维码</a></li>
                  <li><a href="http://www.rrxiu.net" target="_blank">人人秀</a></li>
                  <li><a href="http://www.chuangkit.com" target="_blank">创客贴</a></li>
                  <li><a href="http://www.egpic.cn/" target="_blank">易图</a></li>
                  <li><a href="http://www.iheima.com" target="_blank">i黑马</a></li>
                  <li><a href="http://www.lieyunwang.com" target="_blank">猎云网</a></li>
                  <li><a href="http://ipaiban.com/" target="_blank">i排版</a></li>
                  <li><a href="http://www.budejie.com/" target="_blank">百思不得姐</a></li>
                  <li><a href="http://www.bangtuike.com.cn" target="_blank">帮推客</a></li>
                  <li><a href="http://www.nuanshi100.com" target="_blank">暖石网</a></li>
                  <li><a href="https://www.joyowo.com/zixun/" target="_blank">金柚网</a></li>
                  <li><a href="https://rightknights.com/" target="_blank">维权骑士</a></li>
                  <li><a href="http://www.meijiexia.com" target="_blank">媒介匣</a></li>
                  <li><a href="https://www.myfans.cc" target="_blank">粉丝圈</a></li>
                  <li><a href="http://www.weixinhost.com/" target="_blank">侯斯特</a></li>
                  <li><a href="https://wx-data.com" target="_blank">群发宝</a></li>
                </ul>
              </div>
            </div>
            <div class="information">
              <div class="footerMsg">
                <div class="emailMag">
                  <span>北京简媒信息科技有限公司 </span>
                  <span> Market@ejianmedia.com</span>
                </div>
                <div class="addressMsg">
                  <span>© 2017-现在 BJ JianMedia 京ICP备17038799号-2</span>
                  <div class='police'>
                    <img src="/static/image/login/police.png" alt="" />
                    <span> 京公网安备 11010802024261号</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-next" @click="bordernone" id="aa" tabindex='-1' slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mobileLogin,
    mobileyzm,
    mobileregister
  } from '../../api/utils.js'
  import {
    baseUrl
  } from '../../config/env.js'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  import {
    statistics
  } from '../../plugins/statistics.js'
  require('swiper/dist/css/swiper.css')
  export default {
    name: 'login',
    data() {
      return {
        errmsg_1: false,
        tishi: '',
        usertel: '',
        password: '',
        errmsg_2: false,
        tishi_2: '',
        usertel_2: '',
        password_2: '',
        imgyzm: '',
        infoyzm: '',
        channel:'',
        getTime: '获取验证码',
        src: baseUrl + '/regKaptcha/img.pnggg',
        getsrc:baseUrl,
        swiperOption: {
          direction: 'vertical', // 竖向lun bo
          // loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
          },
          on: {
            slideChange: function () {
              
            }
          }
        },
        invitedcode:''
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
    },
    mounted(){
      this.invitedcode = this.$route.query.code;
      if(this.invitedcode){
        this.swiper.slideTo(1, 1000, false);
        this.$('.register').show();
        this.$('.login').hide();
      }
      this.$(".slide9 input").focus(()=>{
        this.$(".banner-container").css("height",this.$(document).height()+'px')
      });
      if(window.sessionStorage.getItem('num') == 1){
        this.tologin();
        window.sessionStorage.removeItem("num")
      }else if(window.sessionStorage.getItem('num') == 2){
        this.toregister();
        window.sessionStorage.removeItem("num")
      }
      statistics();
    },
    methods: {
      routeRead(){
        this.$router.push('/reading');
      },
      login() {
        this.loginUser();
      },
      forget() {
        this.$router.push("/forgetpwd")
      },
      register() {
        this.registeruser()
      },
      tologin(){
        this.swiper.slideTo(1, 1000, false)
        this.$('.register').hide();
        this.$('.login').show()
      },
      toregister(){
        this.swiper.slideTo(1, 1000, false);
        this.$('.register').show();
        this.$('.login').hide();
      },
      // 确认登录
      loginUser() {
        let tel = /^1\d{10}$/;
        if (this.usertel.trim() == '') {
          this.tishi = '手机号不能为空';
          this.errmsg_1 = true;
        } else if (isNaN(this.usertel.trim())) {
          this.tishi = '手机号必须是数字';
          this.errmsg_1 = true;
        } else if (!tel.test(this.usertel.trim())) {
          this.tishi = '手机号不合法';
          this.errmsg_1 = true;
        } else if (this.password.trim() == '') {
          this.tishi = '密码不能为空';
          this.errmsg_1 = true;
        } else {
          let data = {
            'login_name': this.usertel.trim(),
            'plain_password': this.password.trim()
          }
          mobileLogin(this.qs.stringify(data)).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/s/page/home")
              this.$store.dispatch('actionCategoryList', {})
              // var _self = this;
              // setTimeout(function(){
              //   _self.$router.push('/s/festival');
              // },5000)//跳转活动页
            } else {
              this.tishi = res.data.msg;
              this.errmsg_1 = true;
            }
          })
        }
      },
      //注册倒计时
      djTime() {
        var second = 120;
        var timer = null;
        let _this = this;
        this.$refs.btn.disabled = true;
        timer = setInterval(function () {
          second--;
          if (second > 0) {
            _this.getTime = second + '秒后重试';
          } else {
            clearInterval(timer);
            _this.getTime = "获取验证码";
            _this.$refs.btn.disabled = false;
          }
        }, 1000);
      },
      // 获取短信验证码
      getyzmTime() {
        this.tishi_2 = "";
        this.errmsg_2 = false;
        const usertel_2 = this.usertel_2.trim();
        const imgyzm = this.imgyzm.trim();
        let tel = /^1\d{10}$/;
        if (usertel_2 == '') {
          this.tishi_2 = '手机号不能为空';
          this.errmsg_2 = true;
        } else if (isNaN(usertel_2)) {
          this.tishi_2 = '手机号必须是数字';
          this.errmsg_2 = true;
        } else if (!tel.test(usertel_2)) {
          this.tishi_2 = '手机号不合法';
          this.errmsg_2 = true;
        } else if (imgyzm == '') {
          this.tishi_2 = '验证码不能为空';
          this.errmsg_2 = true;
        } else {
          var query = {
            'imgCode': imgyzm,
            'loginName': usertel_2
          }
          mobileyzm(query).then((res) => {
            if (res.data.code == 200) {
              this.djTime();
            } else {
              this.tishi_2 = res.data.msg;
              this.errmsg_2 = true;
            }
          })
        }
      },
      //获取图片验证码刷新
      getimgyzm() {
        this.tishi_2 = "";
        this.errmsg_2 = false;
        this.src = baseUrl + '/regKaptcha/img.pnggg?' + Math.random();
      },
      //注册
      registeruser() {
        const usertel_2 = this.usertel_2.trim();
        const password_2 = this.password_2.trim();
        const imgyzm = this.imgyzm.trim();
        const infoyzm = this.infoyzm.trim();
        const getKey = this.qs.parse(location.search.substr(1))
        if(getKey.channel == null){
           this.channel = ''
        }else{
           this.channel = getKey.channel
        }
        let tel = /^1\d{10}$/;;
        if (usertel_2 == '') {
          this.tishi_2 = '手机号不能为空';
          this.errmsg_2 = true;
        } else if (isNaN(usertel_2)) {
          this.tishi_2 = '手机号必须是数字';
          this.errmsg_2 = true;
        } else if (!tel.test(usertel_2)) {
          this.tishi_2 = '手机号不合法';
          this.errmsg_2 = true;
        } else if (password_2 == '') {
          this.tishi_2 = '密码不能为空';
          this.errmsg_2 = true;
        } else if (infoyzm == '') {
          this.tishi_2 = '短信验证码不能为空';
          this.errmsg_2 = true;
        } else {
          let data = {
            'loginName': usertel_2,
            'plainPassword':password_2,
            'smsCode': infoyzm,
            'channel':this.channel,
            'code':this.invitedcode
          }
          mobileregister(this.qs.stringify(data)).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/s/page/home")
            } else {
              this.tishi_2 = res.data.msg;
              this.errmsg_2 = true;
            }
          })
        }
      },
      bordernone() {
        document.getElementById('aa').removeAttribute('tabindex')
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../assets/style/vars.less';
  .swiper-container {
    width: 100%;
    position: relative;
  }

  .swiper-button-next {
    position: absolute;
    bottom: 0;
    top: 94%;
    right: 0;
    width: 100%;
    background-image: none;
    border: none;
  }

  html {
    -webkit-text-size-adjust: none;
  }

  .banner-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    font-family: 'Microsoft Yahei';
    .swiper-wrapper {
      .swiper-slide {
       .display-flex();
        .column();
        .title {
          text-align: center;
          padding-top: .2rem;
          z-index: 999;
          div {
            font-size: .3rem;
            b {
              width: .47rem;
              height: 2px;
              background-color: #171715;
              display: block;
              margin: .1rem auto 0;
            }
            span {
              font-size: .24rem;
            }
          }
          .English {
            margin-top: 0;
            color: #757367;
            font-size: .14rem;
            span {
              font-size: .12rem;
            }
          }
        }
        .wtitle {
          color: #fff;
          div {
            b {
              background-color: #fff;
            }
          }
          .English {
            color: #fff;
            span {
              font-size: .14rem!important;
            }
          }
        }
        .business {
          box-flex: 1;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          flex: 1;
          -webkit-flex: 1;
          position: relative;
          -webkit-transform: scale(0.8);
          -o-transform: scale(0.8);
          -moz-transform: scale(0.8);
          -ms-transform: scale(0.8);
          transform: scale(0.8);
          .swiperbus {
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .information {
          color: #fff;
          height: .9rem;
          text-align: center;
          z-index: 999;
          font-size: 12px;
          div {
            font-size: .12rem;
            img {
              width: .2rem;
              height: .2rem;
              margin-top: .06rem;
              cursor: pointer;
            }
          }
        }
        .binformation {
          color: #000 !important;
          .num {
            font-size: .14rem;
          }
        }
      }
      .slide1 {
        background: url("http://opf9zycia.bkt.clouddn.com/badd653644de4b0b8d8783668c09737c.jpg") no-repeat;
        background-size: 100% 100%;
        .userJianMei {
          width: 100%;
          height: .92rem;
          margin: auto;
          z-index: 999;
          .topJianMei {
            .display-flex();
            .align-item();
            .space-between();
            margin-top: .21rem;
            .logoJianMei {
              img {
                height: .5rem;
                margin-left: 20px;
              }
            }
            .infoJianMei {
              .display-flex();
              color: #fff;
              font-size: .18rem;
              li {
                margin-left: 0;
                a {
                  display: block;
                  width: 100%;
                  height: 100%;
                  color: #fff;
                }
              }
              .tologin,
              .toregister {
                display: block;
                font-size: 12px;
                padding-right: 20px;
                cursor: pointer;
              }
              .reading {
                padding-right: 20px;
                font-size: 12px;
              }
            }
          }
        }
        .business {
          position: relative;
          .businessText {
            .display-flex();
            .align-item();
            width: 100%;
            .column();
            .businessText-left {
              div {
                color: #fff;
                .display-flex();
                .align-item();
                .justify-content();
                font-size: .22rem;
                text-shadow: 2px 2px 8px #4d4b4c;
                filter: alpha(opacity=30);
                &:nth-child(1),
                &:nth-child(2) {
                  margin-bottom: 5px;
                }
                &:nth-child(3) {
                  margin-bottom: 25px;
                }
                &:nth-child(4),
                &:nth-child(5) {
                  margin-bottom: 5px;
                }
                h4 {
                  font-size: .5rem;
                  letter-spacing: 2px;
                  .display-flex();
                  .justify-content();
                  .flex-wrap();
                  padding-left: .08rem;
                  padding-right: .08rem;
                }
              }
              .onebtn {
                .flex-wrap();
                .justify-content();
                .align-item();
                .display-flex();
                p {
                  padding-left: .02rem;
                  padding-right: .03rem;
                  width: 100%;
                  font-weight: 800;
                  text-align: center;
                }
              }
              .mobileList {
                margin-top: 0px;
                .flex-wrap();
                div {
                  width: 100%;
                  margin-top: 5px;
                  li {
                    width: .3rem;
                    height: .3rem;
                    margin-left: .04rem;
                    margin-right: .04rem;
                  }
                }
              }
              ul {
                .display-flex();
                .justify-content();
                margin-top: .07rem;
                .newset {
                  li {
                    width: .36rem;
                    height: .36rem;
                    margin-left: .02rem;
                    margin-right: .02rem;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
              }
            }

          }
        }
        .infoscale {
          display: block !important;
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          color: #000;
          height: .84rem;
          text-align: center;
          z-index: 999;
          div {
            font-size: .12rem;
            img {
              width: .2rem;
              height: .2rem;
              margin-top: .06rem;
              cursor: pointer;
            }
          }
          .num {
            margin-top: .1rem;
            font-size: .12rem;
          }
        }
      }
      .slide2 {
        background: url("http://opf9zycia.bkt.clouddn.com/23cafcd62d53421888fd78d612d6590a.jpg") no-repeat;
        background-size: 100% 100%;
        .core {
          width: 100%;
          .mobilecoreList {
            width: 100%;
            li {
              width: 100%;
              min-height: 1rem;
              background-color: rgba(0, 0, 0, .4);
              .display-flex();
              .align-item();
              color: #fff;
              margin-top: 5px;
              .setImg {
                width: 14%;
                text-align: center;
                img {
                  height: 20px;
                }
              }
              .coreTitle {
                width: 26%;
                font-size: .16rem !important;
              }
              .introduce {
                width: 60%;
                text-align: justify;
                padding-right: 20px;
                box-sizing: border-box;
              }
            }
          }
        }
      }
      .slide3 {
        background: url("http://opf9zycia.bkt.clouddn.com/878d7738af6743bdaa9258eddc143dd2.jpg") no-repeat;
        background-size: 100% 100%;
        .user {
          width: 100%;
          ul {
           .display-flex();
            .flex-wrap();
            li {
              width: 33.3%;
              height: 100px;
              text-align: center;
              img {
                width: 80px;
                height: 80px;
                margin: 10px auto;
                border-radius: 50%;
                box-shadow: 1px 1px 15px 0px #000;
              }
            }
          }
        }
      }
      .slide4 {
        background: url("/static/image/login/slide4.png") no-repeat;
        background-size: 100% 100%;
        .evaluate {
          width: 100%;
          ul {
            .display-flex();
            .flex-wrap();
            li {
              width: 50%;
              height: 1.8rem;
              background-color: #ccc;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .evaluate-title {
              background-color: #fff;
              padding: .18rem;
              box-sizing: border-box;
              .display-flex();
              .column();
              .justify-content();
              position: relative;
              h4 {
                font-size: .16rem;
                font-weight: 400;
                color: #212121;
              }
              p {
                word-break: break-all;
                text-align: justify;
                line-height: .22rem;
                margin-top: 5px;
                display: -webkit-box;
                color: #7a7f81;
              }
              .arrow {
                position: absolute;
                left: -30px;
                top: .75rem;
                width: 0px;
                height: 0px;
                border-width: 15px;
                border-style: solid;
                border-color: transparent #fff transparent transparent;
              }
              .arrow1 {
                position: absolute;
                right: -30px;
                top: .75rem;
                width: 0px;
                height: 0px;
                border-width: 15px;
                border-style: solid;
                border-color: transparent transparent transparent #fff;
              }
            }
          }
        }
      }
      .slide5 {
        background: url("http://opf9zycia.bkt.clouddn.com/4b679d7a7c3044c7b2fef36942014242.jpg") no-repeat;
        background-size: 100% 100%;
        .partner {
          width: 100%;
          ul {
            .display-flex();
            .space-between();
            .flex-wrap();
            li {
              width: 45%;
              height: .7rem;
              margin: .18rem 0;
              box-shadow: 0 0 15px 0px #000;
              opacity: 0.8;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .slide6 {
        background: url("/static/image/login/slide6.png") no-repeat;
        background-size: 100% 100%;
        .aboutus {
          width: 85%;
          height: 100%;
          .aboutus-left {
            width: 100%;
            height: 4rem;
            text-align: justify;
            white-space: normal;
            word-break: break-all;
            line-height: 32px;
            overflow: hidden;
            font-size: 16px;
            display: flex;
            align-items: center;
            color: #212121;
            text-indent: 2em;
          }
        }
      }
      .slide7 {
        background: url("http://opf9zycia.bkt.clouddn.com/8fb2f08b87d44a7da0486184b8076d17.jpg") no-repeat;
        background-size: 100% 100%;
        .contant {
          width: 100%;
          .contant-top {
            width: 100%;
            height: 2.6rem;
            background-color: #ccc;
            overflow: hidden;
            img {
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
            }
          }
          .contant-bottom {
            height: 1.6rem;
            background-color: #FFF;
            padding-top: .12rem;
            box-sizing: border-box;
            ul {
              .display-flex();
              height: 100%;
              width: 80%;
              margin: auto;
              li {
                width: 50%;
                text-align: center;
                span {
                  font-size: .18rem;
                }
                img {
                  width: .38rem;
                  height: auto;
                }
                .address {
                  width: .36rem;
                  height: auto;
                }
                p {
                  height: .6rem;
                  padding-left: .25rem;
                  padding-right: .25rem;
                  box-sizing: border-box;
                  word-break: break-all;
                  text-align: center;
                  line-height: .2rem;
                  margin-top: .05rem;
                }
                .phone {
                  text-align: center;
                }
                div {
                  width: 1rem;
                  height: 1rem;
                  background-color: #ccc;
                  margin: .06rem auto 0;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
        }
      }
      .slide8 {
        background: url("/static/image/login/slide6.png") no-repeat;
        background-size: 100% 100%;
        .links {
          width: 100%;
          ul {
            .display-flex();
            width: 100%;
            .flex-wrap();
            padding-bottom: 20px;
            box-sizing: border-box;
            li {
              width: 50%;
              font-size: .16rem;
              color: #343434;
              padding-left: 12px;
              padding-right: 12px;
              box-sizing: border-box;
            }
          }
        }
        .information {
          height: .8rem !important;
          color: #000;
          .footerMsg {
            margin-top: 8px;
            .addressMsg {
              margin-top: .06rem;
              display: block;
              span {
                font-size: .12rem;
                display: block;
                margin-top: 5px;
              }
              .police {
               .display-flex();
                .justify-content();
                .align-item();
                img {
                  width: .15rem;
                  height: .15rem;
                  margin-right: .04rem;
                }
              }
            }
          }
        }
      }
      .slide9 {
        background: url("/static/image/login/slide4.png") no-repeat;
        background-size: 100% 100%;
        .business {
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          -moz-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          .businessText-right {
            width: 100%;
            border-radius: 5px;
            padding:43px 20px;
            box-sizing: border-box;
            .register {
              display: none;
            }
            .register,
            .login {
              width: 100%;
              height: 39px;
              margin: auto;
              .topLogin {
                width: 100%;
                text-align: center;
                font-size: 16px;
                color: #868686;
                height: 20px;
                line-height: 20px;
                span {
                  cursor: pointer;
                }
                b {
                  border: .5px solid #dfdcdc;
                  margin-left: .28rem;
                  margin-right: .28rem;
                }
                .active {
                  color: #2ab6e5;
                }
              }
              .input-one {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                border: 1.1px solid #dfdcdc;
                margin: .15rem auto;
                margin-bottom: 0;
                .display-flex();
                .align-item();
                i {
                  color: #868686;
                  font-size: .25rem;
                  padding-left: .05rem;
                  padding-right: 6px;
                }
                .icon-msnui-tel {
                  font-size: .23rem;
                }
                .form-control {
                  border: none;
                  width: 100%;
                  padding-right: 10px;
                  box-sizing: border-box;
                  background: none;
                }
              }
              .input-two {
                text-align: center;
                cursor: pointer;
                margin-top: .15rem;
                .form-control2 {
                  width: 100%;
                  height: .39rem;
                  line-height: .39rem;
                  border-radius: 2px;
                  font-size: .16rem;
                  border: none;
                  color: #fff;
                  background: #2ab6e5;
                  display: block;
                }
              }
              .identifyingcode {
                .display-flex();
                .align-item();
                .space-between();
                width: 100%;
                height: 100%;
                margin: .15rem auto 0;
                p {
                  width: 60%;
                  border: 1px solid #dfdcdc;
                  height: 100%;
                  border-radius: 5px;
                  .display-flex();
                  .align-item();
                  i {
                    color: #868686;
                    font-size: .2rem;
                    padding-left: .07rem;
                    padding-right: 8px;
                  }
                  input {
                    width: 100%;
                    height: 90%;
                    border: 0;
                    outline: none;
                    padding-right: .1rem;
                    background: none;
                  }
                }
                .yzcode {
                  width: 35%;
                  height: .39rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .btn {
                  width: 35%;
                  height: .39rem;
                  line-height: .39rem;
                  text-align: center;
                  color: #fff;
                  border-radius: 3px;
                  cursor: pointer;
                  background-color: #58B0E2;
                  border: 0;
                  outline: none;
                }
              }
              .message {
                color: #ff9a38;
                width: 100%;
                text-align: right;
                margin: .03rem auto 0px;
              }
              .wenzi {
                margin-top: 10px;
                display: fixed;
                text-align: center;
                p {
                  display: block;
                  width: 100%;
                  margin: auto;
                }
                .okuser {
                  color: #b6b6b6;
                  float: right;
                  a {
                    color: #2ab6e5;
                    cursor: pointer;
                  }
                }
                .forget {
                  color: #2ab6e5;
                  flood-color: left;
                  float: left;
                  font-size: .12rem;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
