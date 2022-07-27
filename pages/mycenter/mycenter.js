// pages/mycenter/mycenter.js
import http from '../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    goPage(e){
      const type =  e.currentTarget.dataset.type;
      var token=this.data.token;
      if(token && token.uid){
          wx.navigateTo({
            url: `/pages/mycenter/${type}/${type}`
          })
      }else{
          wx.navigateTo({
            url: '/pages/Login/Login',
          })
      }
    },
    gosetting(){
        var token=this.data.token;
        if(token && token.uid){
            wx.navigateTo({
              url: '/pages/mycenter/setting/setting',
            })
        }else{
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      
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
      var token=wx.getStorageSync('token');
      var that=this;
        this.setData({
            token
        })
        http.guestPerson({
            data:{
               uid:token.uid 
            },
            success: res => {
                if(res.data){
                    that.setData({
                     userInfo:res.data.userInfo,
                     mid:res.data.mid,
                     vipNo:res.data.vipNo
                   })
                }
            },
            fail: err => {
              console.log(err)
            }
      })  
      
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
    gologin(){
        if(this.data.token){return false}
        wx.navigateTo({
          url: '/pages/Login/Login',
        })
    }
})