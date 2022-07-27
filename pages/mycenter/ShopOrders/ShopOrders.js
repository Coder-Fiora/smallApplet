// pages/mycenter/ShopOrders/ShopOrders.js
import http from '../../../api/request'
Page({
    data: {
        pageNum: 1,
        pageSize: 10,
        status: '0',
        orderList: [],
        tabs: [{
            title: '全部',
            key: '0'
        },
        {
            title: '待发货',
            key: '12'
        },
        {
            title: '待收货',
            key: '13'
        },
        {
            title: '待使用',
            key: '14'
        },
        {
            title: '已完成',
            key: '11'
        },
        ]
    },
    onLoad() {
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
        http.getMallOrderList({
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
        http.getMallOrderList({
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
})