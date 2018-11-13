function cmp (path) {
  // var cmp = require('@/components'+path);
  var cmp = resolve => require(['../Page' + path], resolve)
  return cmp.default || cmp
}
const Account = {
    path: '/s/account',
    name: 'Account',
    component: cmp('/Account/Account.vue'),
    redirect: '/s/account/accountBind',
    children:[
      {
        path: 'accountBind',
        name: 'accountBind',
        component: cmp('/Account/accountBind/accountBind.vue'),
        meta: {
          keepAlive: true // 需要缓存
        },
      },
      {
        path: 'accountList',
        name: 'accountList',
        component: cmp('/Account/accountList/accountList.vue'),
        meta: {
          keepAlive: true // 需要缓存
        },
      },
      {
        path: 's/news',
        name: 'Accountnews',
        component: cmp('/HomePage/news/news.vue'),
       }
    ]
}
const writeaccount =
{
  path: '/s/writeaccount',
  name: 'writeaccount',
  component: cmp('/Account/accountList/writeaccount.vue')
}
const setaccount =
{
  path: '/s/setaccount',
  name: 'setaccount',
  component: cmp('/Account/accountList/setaccount.vue')
}
const accountGive =
{
  path: '/s/accountgive/:typeId',
  name: 'accountGive',
  component: cmp('/Account/accountGive/accountGive.vue'),
}
const accountUpdate = 
{
  path: '/s/accountupdate/:typeId/:accountId',
  name: 'accountupdate',
  component: cmp('/Account/accountGive/accountGive.vue'),
}

export { Account, writeaccount, setaccount, accountGive ,accountUpdate}
