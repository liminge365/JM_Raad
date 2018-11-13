function cmp (path) {
  // var cmp = require('@/components'+path);
  var cmp = resolve => require(['../Page' + path], resolve)
  return cmp.default || cmp
}
const Order = {
    path: '/s/order',
    name: 'Order',
    component: cmp('/Order/Order.vue'),
    redirect: '/s/order/orderSet',
    children:[
      {
        path: 'news',
        name: 'Ordernews',
        component: cmp('/HomePage/news/news.vue'),
      },
      {
        path: 'orderSet',
        name: 'orderSet',
        component: cmp('/Order/orderSet.vue'),
        meta: {
          keepAlive: true // 需要缓存
        },
      }
    ]
}
const OrderTaskDtail = {
  path: '/s/OrdertTaskDtail',
  name: 'OrdertTaskDtail',
  component: cmp('/Order/OrdertTaskDtail.vue')
}
const orderDtail ={
  path: '/s/orderDtail',
  name: 'orderDtail',
  component: cmp('/Order/orderDtail.vue'),
  redirect: '/s/orderDtail/moneyDetails',
  children:[
    {
      path: 'moneyDetails',
      name: 'moneyDetails',
      component: cmp('/Order/Components/moneyDetails.vue'),
      meta: {
        keepAlive: true // 需要缓存
      },
    },
    {
      path: 'PresentRecord',
      name: 'PresentRecord',
      component: cmp('/Order/Components/PresentRecord.vue'),
      meta: {
        keepAlive: true // 需要缓存
      },
    },
    {
      path: 'Settlement',
      name: 'Settlement',
      component: cmp('/Order/Components/Settlement.vue'),
      meta: {
        keepAlive: true // 需要缓存
      },
    },
  ]
}
const replaceTax = {
  path: '/s/replaceTax',
  name: 'replaceTax',
  component: cmp('/Order/Components/replaceTax.vue')
}
const deleBill = {
  path: '/s/deleBill',
  name: 'deleBill',
  component: cmp('/Order/Components/deleBill.vue')
}
const endBill = {
  path: '/s/endBill',
  name: 'endBill',
  component: cmp('/Order/Components/endBill.vue')
}
const pullBill = {
  path: '/s/pullBill',
  name: 'pullBill',
  component: cmp('/Order/Components/pullBill.vue')
}
const waitEndBill = {
  path: '/s/waitEndBill',
  name: 'waitEndBill',
  component: cmp('/Order/Components/waitEndBill.vue')
}
const settlementBill = {
  path: '/s/settlementBill',
  name: 'settlementBill',
  component: cmp('/Order/Components/settlementBill.vue')
}
const flowDtails = {
  path: '/s/flowDtails',
  name: 'flowDtails',
  component: cmp('/Order/Components/flowDtails.vue')
}
export { Order, OrderTaskDtail, orderDtail, replaceTax, deleBill, endBill, pullBill, waitEndBill, flowDtails, settlementBill }
