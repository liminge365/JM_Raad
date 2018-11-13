import $ from 'jquery'
import axios from 'axios'
import BScroll from 'better-scroll'
import laydate from '../../static/laydate/laydate'
import '../../static/laydate/theme/default/laydate.css'
import qs from 'qs'
axios.defaults.withCredentials=true;

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$', {
      value: $
    })
    Object.defineProperty(Vue.prototype, 'axios', {
      value: axios
    })
    Object.defineProperty(Vue.prototype, 'BScroll', {
      value: BScroll
    })
    Object.defineProperty(Vue.prototype, 'laydate', {
      value: laydate
    })
    Object.defineProperty(Vue.prototype, 'qs', {
      value: qs
    })
  }
}
