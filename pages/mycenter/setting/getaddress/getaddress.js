
import http from '../../../../api/request';
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
        var token=wx.getStorageSync('token');
        var uid=token.uid;
        this.setData({
          uid
        })
    },

    getaddressList(){
        http.queryAddressList({
            data:{
               uid:this.data.uid 
            },
            success: res => {
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
        this.getaddressList()
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
        var obj=e.currentTarget.dataset.obj;
        if(obj && obj.name){
            obj=JSON.stringify(obj);
            wx.navigateTo({
              url: '/pages/mail/addAddress/addAddress?obj='+obj,
            })
        }else{
            wx.navigateTo({
                url: '/pages/mail/addAddress/addAddress',
              })
        }
    },
})