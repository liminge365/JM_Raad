function cmp(path) {
  // var cmp = require('@/components'+path);
  var cmp = resolve => require(['../Page' + path], resolve)
  return cmp.default || cmp
}
const login = {
  path: '/',
  name: 'Login',
  component: cmp('/Login/Login.vue'),
}
const page = {
  path: '/s/page',
  name: 'page',
  component: cmp('/HomePage/Page.vue'),
  redirect:'/s/page/home',
  children: [{
     path: 'home',
     name: 'HomeCon',
     component: cmp('/HomePage/HomeCon.vue')
   },
   {
    path: 'content',
    name: 'content',
    component: cmp('/HomePage/ConManagement/Publish.vue'),
    redirect:'content/lauched',
    children: [{
        path: 'unpublished',
        name: 'Unpublished',
        component: cmp('/HomePage/ConManagement/Unpublished.vue')
      },
      {
        path: 'lauched',
        name: 'Lauched',
        component: cmp('/HomePage/ConManagement/Lauched.vue')
      },
      {
        path: 'timerelease',
        name: 'TimeRelease',
        component: cmp('/HomePage/ConManagement/TimeRelease.vue')
      }
    ]
   },
   {
    path: 'news',
    name: 'news',
    component: cmp('/HomePage/news/news.vue'),
   }]
}
const articleDetails = {
  path: '/s/articleDetails',
  name: 'articleDetails',
  component: cmp('/HomePage/ConManagement/articleDetails.vue')
}

const account = {
  path: '/s/accounts',
  name: 'account',
  component: cmp('/HomePage/Account.vue'),
}
const dataAnalysis = {
  path: '/s/dataAnalysis',
  name: 'dataAnalysis',
  component: cmp('/HomePage/dataAnalysis/DataAnalysis.vue'),
  redirect:'/s/dataAnalysis/whole',
  children:[
    {
      path: 'oneshot',
      name: 'Oneshot',
      component: cmp('/HomePage/dataAnalysis/Oneshot.vue'),
    },
    {
      path: 'rank',
      name: 'Rank',
      component: cmp('/HomePage/dataAnalysis/Rank.vue'),
    },
    {
      path: 'whole',
      name: 'Whole',
      component: cmp('/HomePage/dataAnalysis/Whole.vue'),
    },
  ]
}
const OneDataBar = {
  path: '/s/OneDataBar',
  name: 'OneDataBar',
  component: cmp('/HomePage/dataAnalysis/OneDataBar.vue')
}
const forgetpwd = {
  path: '/forgetpwd',
  name: 'ForgetPwd',
  component: cmp('/Login/ForgetPwd.vue'),
}
const protocol = {
  path: '/protocol',
  name: 'Protocol',
  component: cmp('/Login/Protocol.vue'),
}
const privacy = {
  path: '/privacy',
  name: 'Privacy',
  component: cmp('/Login/Privacy.vue'),
}
export {
  account,
  page,
  dataAnalysis,
  OneDataBar,
  login,
  forgetpwd,
  articleDetails,
  protocol,
  privacy
}
