// pages/room/room.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false, //日历
        roomShow: false, //房间
        roomNum: 1,
        peopleNum: 1,
        childNum: 1,
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
    },
    showRoomConfig() {
        this.setData({
            roomShow: true
        })
    },
    onCloseRoom() {
        this.setData({
            roomShow: false
        })
    },
    onChange(event) {
        const {
            currentTarget: {
                dataset: {
                    type
                }
            },
            detail
        } = event
        this.setData({
            [type]: detail
        })
    },
    confirmRoom(){
        this.onCloseRoom()
    }
})