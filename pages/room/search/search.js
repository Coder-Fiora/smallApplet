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
        day:1,
        picList: [], //轮播
        roomInfo: {}, //房间信息
        roomList: [], // 房间列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            roomNum:options.roomNum*1,
            peopleNum:options.peopleNum*1,
            childNum:options.childNum*1,
            startDate:moment(options.startDate).format('MM-DD'),
            endDate:moment(options.endDate).format('MM-DD'),
            startYDate:options.startDate,
            endYDate:options.endDate,
            day:moment(options.endDate).diff(options.startDate, 'day')
        })
        this.getIndexdata(options)
    },
    openmap(){
        wx.openLocation({
            latitude: 24.560139,
            longitude: 102.841751,
            scale:8,
            name:'大知闲闲民宿',
            address:this.data.roomInfo.address,
            success:(r)=>{
               console.log(r)
            }
          })
    },
    getIndexdata(options){
        http.guestRoomIndexLoad({
            data: {
                roomNum:options.roomNum,
                peopleNum:options.peopleNum,
                childNum:options.childNum
            },
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
        const { detail } = e;
        var startDate=moment(detail[0]).format('YYYY-MM-DD');
        var endDate=moment(detail[1]).format('YYYY-MM-DD');
        var day= moment(endDate).diff(startDate, 'day')
        this.setData({
            startDate: moment(detail[0]).format('MM-DD'),
            endDate: moment(detail[1]).format('MM-DD'),
            day,
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
        this.onCloseRoom();
        var options={
            roomNum:this.data.roomNum,
            peopleNum:this.data.peopleNum,
            childNum:this.data.childNum
        }
        this.getIndexdata(options)
    },
})