// pages/mycenter/RoomOrders/orderDetail.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav_title:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        http.getRoomOrderDetail({
            data: { oid:options.oid },
            success: (res) => {
                const orderList = res?.data?.returnList[0] || {};
                this.setData({
                    orderList
                })
            }
        })
    },
    onPageScroll(e) {
        if(e.scrollTop > 75){
          this.setData({
            nav_title:'订单详情'
          });
        }else{
            this.setData({
                nav_title:true
            });
        }
    },
    deletOrder(){
        var oid=this.data.orderList.oid;
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
                        wx.navigateBack({
                          delta: 1,
                        })
                    }
                })
              }  
            }
        })
    },
    gopay(){
        var item=this.data.orderList;
        //准备支付（先获取必要参数）
         wx.cloud.callFunction({
         name: 'pay',   //调用微信得pay云函数
         data: {
           goodName: item.name,   // 商品名称 或 商品描述
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
         }
        })
    },
    changestate(){
          this.setData({
            ifshou:!this.data.ifshou
          })
    },
    cancelOrder(e){
        var oid=this.data.orderList.oid;
        http.CancelMallOrder({
            data: {oid:oid,status:7},
            success: (res) => {
                wx.navigateBack({
                  delta: 1,
                }) 
            }
        })
    },
    callme(){
       wx.makePhoneCall({
         phoneNumber: this.data.orderList.phone,
       })
    },
    copy_btn(){

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})