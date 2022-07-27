// pages/mycenter/Coupons/Coupons.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
     this.getList(1)
    },
     getList(page){
         if(this.data.hasload){return false}
        http.getCouponList({
            data:{
                pageNum:page,
                pageSize:8 
            },
            success: res => {
              console.log(res)
              if(res.data){
                  page++;
                  var list=this.data.list;
                  list=list.concat(res.data.returnList);
                  this.setData({
                      list,
                      page
                  })
              }else{
                  this.setData({
                      hasload:true
                  })
              }
            },
            fail: err => {
              console.log(err)
            }
      })  
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