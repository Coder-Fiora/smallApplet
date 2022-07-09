// pages/room/search/search.js
import http from '../../../api/request'
import moment from 'moment'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false, //日历
        roomShow: false, //房间
        startDate: moment().format('MM-DD'),
        endDate: moment().add(1, 'days').format('MM-DD'),
        dataRange: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],
        roomNum: 1,
        peopleNum: 1,
        childNum: 1,
        picList: [], //轮播
        roomInfo: {}, //房间信息
        roomList: [], // 房间列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        http.guestRoomIndexLoad({
            data: {},
            success: (res) => {
                const { guestroomInfo, pictureList, roomTypePriceList } = res.data || {}
                this.setData({
                    picList: pictureList,
                    roomInfo: guestroomInfo,
                    roomList: roomTypePriceList,
                })
            }
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    showTime() {
        const { startDate, endDate } = this.data
        const year = moment().format('YYYY')
        this.setData({
            show: true,
            dataRange: [year + '-' + startDate, year + '-' + endDate]
        })
    },
    onConfirm(e) {
        const { detail } = e
        this.setData({
            startDate: moment(detail[0]).format('MM-DD'),
            endDate: moment(detail[1]).format('MM-DD'),
            show: false
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
        const { currentTarget: { dataset: { type } }, detail } = event
        this.setData({
            [type]: detail
        })
    },
    confirmRoom() {
        this.onCloseRoom()
    },
})