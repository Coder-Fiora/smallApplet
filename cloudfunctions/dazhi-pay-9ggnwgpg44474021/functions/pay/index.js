// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
 
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body": event.goodName, //商品名称 或 商品描述
    "outTradeNo": event.outTradeNoTo, //订单号
    "spbillCreateIp": "127.0.0.1", //回调地址
    "subMchId": "1628868223", // 微信支付商户号 
    "totalFee": event.totalFee, //商品支付金额 单位（分） 100代表一块钱
    "envId": "dazhi-pay-9ggnwgpg44474021", //云开发环境ID
    "functionName": "pay_cb" //回调的云函数
  })
  return res
}