// pages/room/room.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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
    goLogin() {
        wx.navigateTo({
            url: '/pages/Login/Login'
        })
    },
    onConfirm() {

    },
    onClose() {
        this.setData({
            show: false
        })
    },
    showTime() {
        this.setData({
            show: true
        })
    }
})