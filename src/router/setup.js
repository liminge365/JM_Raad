function cmp (path) {
  // var cmp = require('@/components'+path);
  var cmp = resolve => require(['@/Page' + path], resolve)
  return cmp.default || cmp
}
const Setup = {
    path: '/s/setup',
    name: 'setup',
    component: cmp('/Setup/Setup.vue'),
    redirect:'/s/setup/reset',
    children:[{
      path: 'reset',
      name: 'reset',
      component: cmp('/Setup/reset/Reset.vue')
    },
    {
      path: 'news',
      name: 'resetnews',
      component: cmp('/HomePage/news/news.vue'),
    },
    {
      path: 'accountdetails',
      name: 'AccountDetails',
      component: cmp('/Setup/reset/AccountDetails.vue'),
    },
    {
      path: 'setpwd',
      name: 'SetPwd',
      component: cmp('/Setup/reset/SetPwd.vue'),
    },
    {
      path: 'shareinvite',
      name: 'ShareInvite',
      component: cmp('/Setup/reset/ShareInvite.vue'),
    },
    {
      path: 'sharedetail/:cardId',
      name: 'ShareDetail',
      component: cmp('/Setup/reset/ShareDetail.vue'),
    },
     {
      path: 'sharerules',
      name: 'ShareRules',
      component: cmp('/Setup/reset/ShareRules.vue')
    }]
}
const Contact = {
  path: '/s/contact',
  name: 'contact',
  component: cmp('/Setup/reset/ContactUs.vue')
}
const About = {
  path: '/s/about',
  name: 'about',
  component: cmp('/Setup/reset/AboutJM.vue')
}
const ShareLogo = {
  path: '/s/shareInvitationCard',
  name: 'sharelogo',
  component: cmp('/Setup/reset/ShareLogo.vue')
}
const screenshot = {
  path: '/screenshot',
  name: 'screenshot',
  component: cmp('/Setup/reset/Screenshot.vue')
}
// 中秋节活动
const Festival = {
  path: '/s/festival',
  name: 'Festival',
  component: cmp('/Setup/reset/Festival.vue')
}
export { Setup, Contact, About, ShareLogo,screenshot,Festival }
