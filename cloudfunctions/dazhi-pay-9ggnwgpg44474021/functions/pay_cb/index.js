// 云函数入口文件
const rp = require('request-promise');
const cloud = require('wx-server-sdk')
 
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
 
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('payment callback!', event)
 
  if(event.resultCode == 'SUCCESS'){  //根据result_code查看业务结果成功进行提交数据告诉服务器
    // const urlTmp = getApp().data.baseUrl ;
    const urlTmp = "https://www.dazhixianxian.com.cn";
    rp({
        url:urlTmp + '/order/updateOrderStatus',
        method: "POST",
        form:{
            oid:event.outTradeNo,
            status:5
        },
        function (e) {
            console.log("响应数据：" + e)
            const res = {errcode:0,errmsg:''}//需要返回的字段，不返回该字段则一直回调
            return res
        }
    })
  }
  
}