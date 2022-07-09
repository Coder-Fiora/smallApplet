// pages/mail/address/address.js
import http from '../../../api/request';
const App=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       this.getaddressList()
    },
    chooseAddress(e){
       var aid=e.currentTarget.dataset.id;
       http.queryDefaultaddress({
        data:{
           uid:App.globalData.uid,
           aid:aid
        },
        success: res => {
          if(res.code==200){
              setTimeout(function(){
                  wx.navigateBack({
                    delta: 1,
                  })
              },200)
          }
        },
        fail: err => {
          console.log(err)
        }
  })
    },
    getaddressList(){
        http.queryAddressList({
            data:{
               uid:App.globalData.uid 
            },
            success: res => {
              console.log('接口请求成功', res) 
              var newarr=res.data;
              var data=newarr.rewardAddressList;
              data.map(i=>{
                  i.province=i.oneadr.split(',').join('')
              })
              this.setData({
                  ...newarr,
              })
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
       this.onLoad() 
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

    },
    confirmRoom(e){
        var obj=e.currentTarget.dataset.obj || '';
        obj=JSON.stringify(obj);
        wx.navigateTo({
          url: '/pages/mail/addAddress/addAddress?obj='+obj,
        })
    },
})