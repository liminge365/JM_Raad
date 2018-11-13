// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import plugins from '../src/plugins'
import store from './store'
import 'babel-polyfill'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { getCookie } from './plugins/cookie'
import * as types from './api/quantity'
import {WXShareInit} from './api/utils'
import { wxConfigInit } from './plugins/weixinshare';
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(plugins)
Vue.use(VueAwesomeSwiper)
// && geturl != types.LOGIN && geturl != types.FORGETSUBMIT

const exp = /^\/s\//;
const geturl = window.location.pathname;
const arrurl = ['/','/forgetpwd'];

router.afterEach((to,from)=>{
      let u = navigator.userAgent;  
      let ua = window.navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ 
      }else{ 
        let params ={link:"http://"+location.host+to.fullPath.split('#')[0]};
        // alert("an"+params.link.split('#')[0]);
        WXShareInit(params).then((res)=>{
          wxConfigInit(res.data.data);
        })
      }
  
});

router.beforeEach((to, from, next) => {
  let u = navigator.userAgent;  
  let ua = window.navigator.userAgent.toLowerCase(); 
  if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ 
    if(!store.state.firstUrl){
      store.state.firstUrl=to.fullPath;   
      }
    // alert("ios"+ store.state.firstUrl.split('#')[0]);
    let params ={link:"http://"+location.host+store.state.firstUrl.split('#')[0]};
    WXShareInit(params).then((res)=>{
      wxConfigInit(res.data.data);
      if (exp.test(to.path)) {   // 判断是否以/s开头
          const userId = getCookie('userId');
          if(!userId){
            next('/'); 
          }else{
            next();
          }
      }else{
         const userId = getCookie('userId');
         if(userId && arrurl.includes(to.path)){
            next('/s/page/home');
          }else{
            next();
          }
      }
    })
  }else{
      if (exp.test(to.path)) {   // 判断是否以/s开头
        const userId = getCookie('userId');
        if(!userId){
          next('/'); 
        }else{
          next();
        }
    }else{
        const userId = getCookie('userId');
        if(userId && arrurl.includes(to.path)){
          next('/s/page/home');
        }else{
          next();
        }
    }
  }
})






/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
