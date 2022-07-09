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
            title: '待付款',
            key: '1'
        },
        {
            title: '待发货',
            key: '2'
        },
        {
            title: '待收货',
            key: '3'
        },
        {
            title: '待使用',
            key: '4'
        },
        {
            title: '已完成',
            key: '5'
        },
        ]
    },
    onLoad() {
        const { pageSize, pageNum, status } = this.data
        this.getList({ pageSize, pageNum, status })
    },
    getList(data) {
        http.getMallOrderList({
            data: { ...data, uid: '1' },
            success: (res) => {
                const { orderList } = res?.data || {}
                this.setData({
                    orderList
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
    onPullDownRefresh() {
        const { status } = this.data
        this.setData({ pageSize: 10, pageNum: 1 })
        this.getList({ pageSize: 10, pageNum: 1, status })
    },
    onReachBottom() {
        const { status, pageNum, pageSize, orderList } = this.data
        const newPageNumber = pageNum + 1
        http.getMallOrderList({
            data: { status, pageNum: newPageNumber, pageSize, uid: '1' },
            success: (res) => {
                const { orderList: newOrderList } = res?.data || {}
                this.setData({
                    orderList: [...orderList, ...newOrderList],
                    pageNum: newPageNumber
                })
            }
        })
    },
})