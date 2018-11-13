<template>
  <div class="HomePage">
    <readingLogin></readingLogin>
    <mt-header title="文章详情">
      <i class='iconfont icon-fanhui' slot="left" @click='lastpage'></i>
    </mt-header>
    <div class="reading">
      <div class="homepage">
        <div class="stationList">
          <div class="article">
            <h3 class='text-justify'>
              <button id='type'>{{getArticleDetail.content_type}}</button>
              <a id='title'>{{getArticleDetail.title}}</a>
            </h3>
          </div>
          <div class="userbox">
            <a class="user_name_box">
              <img class='img-circle' v-if='getArticleDetail.m_user_avatar' :src="getArticleDetail.m_user_avatar"
                   alt=""/>
              <img class='img-circle' v-else src="/static/image/home/head.png" alt=""/>
              <span class="user_name" v-if='getArticleDetail.m_user_name'>{{getArticleDetail.m_user_name}}</span>
              <span class="user_name" v-else>简媒用户</span>
            </a>
            <span class="user_count"
                  v-if="getArticleDetail.read_count_sum != 0"><b>{{getArticleDetail.read_count_sum}}</b>阅读</span>
            <span class="user_time">{{getArticleDetail.create_time}}</span>
          </div>
          <div class="publishplatform">
            <h3>本文已用简媒自媒体工具一键同步至以下平台</h3>
            <ul>
              <li v-for="(url,index) in getArticleDetail.account_logos" :key="index"><img :src="url" alt=""/></li>
            </ul>
          </div>
          <article id="content" class="text-justify" v-html="getArticleDetail.content"></article>
          <div class="bannerimg" @click="advertlog" style='display:none'>
                <div id="KP_SCRIPT"></div>
          </div>
        </div>
      </div>
      <!-- <div class="bannerimg" style="" @click="advertlog" v-if="contentAdvert.ads_id" >

              <p class="ba_title">{{contentAdvert.title}}:{{contentAdvert.slogan}}</p>
              <div class="ba_imgbox">
                  <img :src="contentAdvert.image_url" alt="">
                  <img :src="contentAdvert.image_3_2_url" alt="">
              </div>

      </div> -->

    </div>
    <!--<div class="shareimg" v-if='share'>-->
      <!--<p>-->
        <!--<span class="sharewz">分享文章领取红包</span>-->
        <!--<button @click="showreadingLogin">分享<i class="iconfont icon-xiayibu"></i></button>-->
      <!--</p>-->
    <!--</div>-->
  </div>
</template>
<script id="KP_SCRIPT" type="text/javascript" src="http://jm.test.wanmengjun.com/kp-media.min.js"></script>
<script>
  import $ from 'jquery'
  import {mapGetters} from 'vuex'
  import readingLogin from './components/readingLogin.vue'
  import {getCookie} from '../../plugins/cookie.js'
  import {AddAdvertLog, WXShareInit, GetContentAdvert, GetContentAdvertToken} from '../../api/utils'
  import {wxConfigInit, removeHTMLTag, wxReady} from '../../plugins/weixinshare.js'

  export default {
    data() {
      return {
        corpusId: 0,
        isLogin: '',
        advertId: '',
        spreadId: '',
        contentAdvert: {},
        advertLink: '',
        advert: false,
        share: false,
        revert: false,
        advertType: 1
      }
    },
    components: {
      readingLogin
    },
    computed: {
      ...mapGetters([
        'getArticleDetail'
      ])
    },
    watch: {
      //'$route': 'getPath'
    },
    created() {
      this.corpusId = this.$route.params.corpusId;
      this.spreadId = this.$route.params.preId;
      let u = navigator.userAgent;
      let ua = window.navigator.userAgent.toLowerCase();
      // if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
      //         if(!this.$route.query.ts){
      //             window.location.href=window.location.href+'?ts=un'
      //         }
      //         this.revert = true;
      // }
      //文章详情
      let _self = this.$data;
      let WXShare = this.WXShare;
      let _store = this.$store;
      var self = this;
      let detailParams = {
        corpusId: this.corpusId,
        callback: function () {
          WXShare(this.detail);
          document.title = this.detail.title;
          if (this.detail.advert > 1) {
            //广告
            // let advertParams = {corpusId:_self.corpusId};
            // GetContentAdvert(advertParams).then((res)=>{
            //         if(res.data.data){
            //             _self.contentAdvert =  res.data.data[0];
            //             _self.advertId = _self.contentAdvert.ads_id;
            //             _self.advertLink = _self.contentAdvert.link;

            //         }
            // })
            //广告开关在此处
            _self.advert = true;
            if (this.detail.advert == 3) {
              _self.share = true;
            }
            _self.vip = this.detail.m_user_vip;
          }
          //如果没有广告改变文章的margin-bottom
          if (self.$('.bannerimg').length === 0) {
            self.$('.homepage').css('margin-bottom', '60px');
          }
        }
      };
      this.$store.dispatch('actionArticleDetail', detailParams);
    },
    mounted: function () {
      // $(document).on('click', '.bannerimg', function () {
      //   advertlog();
      // });
    },
    updated: function () {
      let _self = this;
      // this.$nextTick(function () {
      //   if (!_self.advert) {
      //     return;
      //   }
      //     // 显示鲲鹏广告
      //     var params = {
      //       key: 'c864e603884e04d80ab516ece65efdf1',
      //       media_id: '',
      //       title: 'title',
      //       article_type: 'type',
      //       content: 'content',
      //       tags: 'type',
      //       geo_info: '',
      //       width: '100%',
      //       height: '158'
      //     };
      //     let advertParams = {corpusId: _self.corpusId};
      //     GetContentAdvertToken(advertParams).then((res) => {
      //       if (res.data.code == 200) {
      //         var data = res.data.data;
      //         _self.advertType = data.type;
      //         if (data.type == 1) {
      //           // 鲲鹏广告
      //           params.media_id = data.mediaId;
      //           params.key = data.key;
      //           window._kp_.init(params).then((res) => {
      //             if (res.code == 0) {
      //               _self.advertId = res.result[0].ads_id;
      //               _self.advertLink = res.result[0].link;
      //               $('.kp-media a').attr('href', 'javascript:void(0)');
      //               $('.bannerimg').show();
      //             }
      //           });
      //         } else {
      //           // 简媒广告
      //           _self.advertId = data.ads_id;
      //           _self.advertLink = data.link;
      //           var html = [];
      //           html.push('<a href="javascript:void(0)" style="display:block;width:100%;height:175px;background:url(');
      //           html.push(data.image_mp);
      //           html.push(') 50% 0 no-repeat;background-size:contain;"></a>');
      //           $('.bannerimg').html(html.join('')).show();
      //         }
      //       }
      //     });
      // })
      if(this.share == true){
          this.$('.homepage').css('margin-bottom','60px')
      }
    },
    methods: {
      getPath() {
        this.corpusId = this.$route.params.corpusId;
      },
      lastpage() {
        if ((document.referrer === '' || document.referrer === undefined) && this.$store.state.Readnum === '') {
          window.location.href = 'http://' + window.location.host + '/reading?id=-3'
        } else {
          if (this.revert) {
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        }
      },
      showreadingLogin() {
        this.$(".readingLogin").show()
        var userId = getCookie('userId');
        if (!userId) {
          this.$(".popup").show();
        } else {
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
            $(".popup_fen").show();
          } else {
            $(".popup_liu").show();
          }
        }
      },
      advertlog() {
        if (!this.advertId) {
          return;
        }
        let advertLink = this.advertLink;
        let type = this.advertType;
        let params = {adsId: this.advertId, corpusId: this.corpusId, spreadId: this.spreadId, type: this.advertType}
        AddAdvertLog(params).then(() => {
          if (type == 1) {
            location.href = advertLink + '&extra_param=' + this.corpusId;
          } else {
            location.href = advertLink;
          }
        });
      },
      WXShare(wxData) {
        let params = {
          title: wxData.title,
          desc: removeHTMLTag(wxData.content).substring(0, 100),
          imgUrl: wxData.img ? wxData.img : 'http://' + location.host + '/static/image/home/userhead_big.png',
          link: window.location.href.split('#')[0]
        };
        wxReady(params);
        //  alert(JSON.stringify(params));
        // WXShareInit(params).then((res)=>{
        //     if(res.data.code==200){
        //         // res.data.data.link = window.location.href.split('#')[0];
        //         // alert(JSON.stringify(res.data.data));
        //         wxConfigInit(res.data.data);

        //     }
        // });

      }
    },
  }
</script>
<style lang="less">
.homepage{
    width: 90%;
    margin: .2rem 5%;
    padding: .2rem;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #EDF1F0;
  }

  .bannerimg {
    margin-top: 20px;
  }

  .article {
    h3 {
      font-size: .16rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-word;
      a {
        color: #515151;
      }
      button {
        height: .2rem;
        line-height: .2rem;
        padding: 0 7px;
        border-radius: .15rem;
        border: none;
        background: #50C3AE;
        outline: none;
        color: #fff;
        display: inline;
        position: relative;
        top: -3px;
      }
    }
  }

  .userbox {
    height: .48rem;
    line-height: .48rem;
    border-top: 2px solid transparent;
    display: flex;
    align-items: center;
    position: relative;
    span {
      float: left;
      font-size: 14px;
      color: #787b80;
    }
    .user_name_box {
      display: flex;
      .user_name {
        width: 85px;
        overflow: hidden;
        white-space: nowrap;
        margin-left: .1rem;
      }
      img {
        width: .24rem;
        height: .24rem;
        border-radius: 50%;
        margin: auto;
      }
    }

    .user_count {
      margin-left: .1rem;
      b {
        font-weight: normal;
      }
    }
    .user_time {
      position: absolute;
      right: 0;
    }
  }

  .publishplatform {
    background: #f0f0f0;
    padding: .1rem;
    box-sizing: border-box;
    margin-bottom: .12rem;
    margin-top: .1rem;
    h3 {
      font-size: .12rem;
      color: #969696;
    }
    ul {
      font-size: 0;
      li {
        width: 12.5%;
        margin-top: .1rem;
        display: inline-block;
        img {
          width: 80%;
          height: auto;
          display: block;
          margin-left: 10%;
        }
      }
    }
  }

  article {
    font-size: .12rem;
    color: #9D9D9D;
    word-break: break-all;
    p {
      letter-spacing: 1px;
      img {
        max-width: 100% !important;
        margin: 0 !important;
        transform: translateX(0) !important;
      }
      span {
        left: 0 !important;
      }
    }
  }

  .bannerimg {
    .ba_title {
      color: #313131;
      line-height: .3rem;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ba_imgbox {
      display: flex;
      align-content: space-around;
      img {
        height: .5rem;
        flex: 1;
        margin-right: .1rem;
      }
    }
  }

  .shareimg {
    height: .4rem;
    line-height: .4rem;
    background: #0f0;
    background: url('/static/image/home/fenxiang.jpg') center no-repeat;
    background-size: 100% 100%;
    color: #FCFF8C;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .sharewz {
      margin-left: 34%;
      font-size: 16px;
    }
    button {
      position: absolute;
      right: 4%;
      width: 14%;
      height: .42rem;
      line-height: .42rem;
      border: none;
      background: none;
      color: #FF2658;
      i {
        font-size: 12px;
      }
    }
  }
</style>


