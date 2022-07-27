// components/OrderCard/OrderCard.js
import http from '../../api/request'
Component({
    properties: {
        orderList: Array,
    },
    data(){
        orderList:this.properties.orderList
    },
    methods: {
        deletOrder(e){
            var oid=e.currentTarget.dataset.oid;
            var that=this;
            wx.showModal({
                content: '确定删除该订单吗？',
                showCancel: true,//是否显示取消按钮
                cancelColor: '#999999',
                confirmColor: '#ee352b',
                success: function (res) {
                  if (res.confirm) {
                    http.deleteOrder({
                        data: {oid: oid },
                        success: (res) => {
                            wx.showToast({
                              title: '删除成功!',
                              icon:'none'
                            })
                            var data=that.data.orderList;
                            data.map((i,idx)=>{
                                if(i.oid==oid){
                                    data.splice(idx,1);
                                    that.setData({
                                        orderList:data
                                    })
                                }
                            })
                        }
                    })
                  }  
                }
            })
        },
        buyNow(e){
        var item=e.currentTarget.dataset.item;
       //准备支付（先获取必要参数）
        wx.cloud.callFunction({
        name: 'pay',   //调用微信得pay云函数
        data: {
          goodName: item.listMap[0].pname,   // 商品名称 或 商品描述
        //   totalFee: item.amount,   
          totalFee: 1,                  // 需要支付的金额
          outTradeNoTo: item.oid             // 生成的订单号
        },
        success: res => {
          console.log("获取字符参数成功", res);   // 此处是通过pay微信云函数，有微信给我们生成支付前的必要参数
          const payment = res.result.payment    // 微信会返回支付需要的必备数据
          wx.hideLoading()
           
          //调起支付（获取必要参数后，开始真实调用微信支付窗口）
          wx.requestPayment({
            ...payment,
            success(res) {   //如果支付成功了，进入success函数回调（成功后具体操作看实际业务需求）
              wx.showLoading({
                title: "付款成功"
              })
              const page = getCurrentPages().pop(); //当前页面
              if (page == undefined || page == null) return; 
              page.onLoad(); 
              setTimeout(function () {
                wx.hideLoading()
              }, 700)
   
            },
            fail(res) {
              console.error('支付失败', res)
              wx.showLoading({
                title: "支付失败"
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 1600)
            }
          })
   
        },
        fail(res) {
          console.log("获取支付参数失败", res);
        }
      })
    },
    addCar(e){
        var item=e.currentTarget.dataset.item;
        var token=wx.getStorageSync('token');
        http.queryAddshopping({
            data: {uid: token.uid,cid:item.cid,sid:item.listMap[0].sid,quantity:1},
            success: (res) => {
               wx.navigateTo({
                 url: '/pages/mail/mycar/mycar',
               })
            }
        })
    },
    cancelOrder(e){
        var oid=e.currentTarget.dataset.oid;
        http.CancelMallOrder({
            data: {oid:oid,status:7},
            success: (res) => {
                const page = getCurrentPages().pop(); //当前页面
                if (page == undefined || page == null) return; 
                page.onLoad(); 
            }
        })
    }
    }
})