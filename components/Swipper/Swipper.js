// components/Swipper/Swipper.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        banner_arr: [{
                src: '/image/test3.jpg',
                id: 0
            },
            {
                src: '/image/test5.jpg',
                id: 1
            },
            {
                src: '/image/test6.jpg',
                id: 2
            },
            {
                src: '/image/test7.jpg',
                id: 3
            }
        ]
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
    topic_preview(e) {
        let that = this;
        let url = e.currentTarget.dataset.url;
        let previewImgArr = [];
        let data = that.data.banner_arr;
        for (let i in data) {
            previewImgArr.push(data[i].src);
        }
        wx.previewImage({
            current: url, // 当前显⽰图⽚的http链接
            urls: previewImgArr // 需要预览的图⽚http链接列表
        })
    },
})