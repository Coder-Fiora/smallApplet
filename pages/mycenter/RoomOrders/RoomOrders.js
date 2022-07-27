// pages/mycenter/ShopOrders/ShopOrders.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        pageSize: 10,
        status: '0',
        tabs:[{
            title:'全部',
            key:'0'
        },
        {
            title:'待确认',
            key:'5'
        },
        {
            title:'已确认',
            key:'10'
        },
        {
            title:'已完成',
            key:'11'
        }
    ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { pageSize, pageNum, status } = this.data
        this.getList({ pageSize, pageNum, status })
    },
    gomail(){
        wx.reLaunch({
          url: '/pages/mail/mail',
        })
      },
      getList(data) {
        var token=wx.getStorageSync('token');
        var uid=token.uid;
        http.getRoomOrderList({
            data: { ...data, uid: uid },
            success: (res) => {
                const orderList = res?.data || {};
                this.setData({
                    orderList,
                    uid
                })
            }
        })
    },
    onChange(e) {
        const { index } = e.detail
        const obj = {
            status: String(index),
            pageNum: 1,
            pageSize: 10
        }
        this.setData({ ...obj })
        this.getList({ ...obj })
    },

    onReachBottom() {
        if(this.data.hasload){return false}
        const { status, pageNum, pageSize, orderList } = this.data
        const newPageNumber = pageNum + 1
        http.getRoomOrderList({
            data: { status, pageNum: newPageNumber, pageSize, uid: this.data.uid },
            success: (res) => {
                var newOrderList= res.data.newOrderList;
                if(newOrderList && newOrderList.length>0){
                    this.setData({
                        orderList: [...orderList, ...newOrderList],
                        pageNum: newPageNumber
                    })
                }else{
                    this.setData({
                        hasload:true
                    })
                }
            }
        })
    },
    onPullDownRefresh: function () {
        this.onRefresh();
    },
    onRefresh(){ 
        wx.showNavigationBarLoading();
        wx.stopPullDownRefresh();
        this.setData({ pageSize: 10, pageNum: 1 })
        const { pageSize, pageNum, status } = this.data
        this.getList({ pageSize, pageNum, status })
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