import {DetailRightUrl} from '../api/utils'

function cmp(path) {
  // var cmp = require('@/components'+path);
  var cmp = resolve => require(['../Page' + path], resolve)
  return cmp.default || cmp
}

const Reading = {
  path: '/reading',
  name: 'Reading',
  component: cmp('/Reading/Reading.vue'),
  meta: {
    keepAlive: true // 需要缓存
  },
  children: [
    {
      path: 'news',
      name: 'Readingnews',
      component: cmp('/HomePage/news/news.vue'),
    }
  ]
};
//设置导航
const setnavBar = {
  path: '/setnavBar',
  name: 'setnavBar',
  component: cmp('/Reading/setnavBar.vue')
};
//个人主页
const readPersnal = {
  path: '/readPersnal',
  name: 'readPersnal',
  component: cmp('/Reading/readPersnal.vue'),
  children: [
    {
      path: 'news',
      name: 'Persnalnews',
      component: cmp('/HomePage/news/news.vue'),
    }
  ]
};
//文章详情
const readDtail = {
  path: '/readDtail/:corpusId/:curId/:preId',
  name: 'readDtail',
  component: cmp('/Reading/readDtail.vue'),
  beforeEnter: (to, from, next) => {
    if (to.name === 'readDtail') {
      let oldParams = {
        corpusId: to.params.corpusId,
        curId: to.params.curId,
        preId: to.params.preId
      };
      let newParams = {};
      DetailRightUrl(oldParams).then((res) => {
        newParams = res.data.data;
        if (oldParams.curId === newParams.curId && oldParams.preId === newParams.preId) {
          next();
        } else {
          next({
            name: 'readDtail',
            params: {
              corpusId: newParams.corpusId,
              curId: newParams.curId,
              preId: newParams.preId
            },
            // query:{
            //   pre:to.fullPath
            // }
          });
        }
      })
    } else {
      next()
    }
  }
};
export {Reading, setnavBar, readPersnal, readDtail}
