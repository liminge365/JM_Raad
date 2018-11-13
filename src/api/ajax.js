import axios from 'axios'
import {baseUrl} from '../config/env.js'
import {getCookie} from '../plugins/cookie'

let service = {
  url: baseUrl
};
const _this = this;
const geturladdress = window.location.pathname;
const arrurl = ['/','/forgetpwd'];
service.ajaxReuqest = (url, options, type, fileFlag) => {
  console.log("请求地址:"+url);
  const exp = /^\/s\//;
  //去掉api
  const urls = url.split("/apis")[1];
  let flag = true;
  if (exp.test(urls)) {  // 判断是否以/s开头
        var userId = getCookie('userId');
        if(!userId && arrurl.includes(geturladdress)){
          location.href = '/'
          flag = false;
        }
  }
  if(!flag){
    return;
  }
  let promise = new Promise((resolve, reject) => {
    if (fileFlag == 'true') {
      axios.post(url, options, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }).then((res) => {
        resolve(res)
      })
    }else if(fileFlag == 'false') {
      axios.get(url, {params: options},{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }).then((res) => {
        resolve(res)
      })
    } else if (type === 'GET') {
      axios.get(url, {params: options}).then((res) => {
        resolve(res)
      }).then((err) => {
        reject(err)
      })
    } else {
      axios.post(url, options).then((res) => {
        resolve(res)
      }).then((err) => {
        reject(err)
      })
    }
  })
  return promise
}
export default service
