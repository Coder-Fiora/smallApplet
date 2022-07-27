// pages/room/room.js
import http from '../../api/request'
import moment from 'moment'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false, //日历
        roomShow: false, //房间
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
        dataRange: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],
        roomNum: 1,
        peopleNum: 1,
        childNum: 0,
        day:1,
        ifload:true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        http.guestRoomIndex({
            data: {},
            success: (res) => {
                this.setData({
                    ...res.data
                })
            }
        })
    },
    goMainpage(){
      wx.navigateTo({
        url: '/pages/room/Main/main',
      })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var token=wx.getStorageSync('token');
        if(token && token.uid){
            this.setData({
              ifload:false
            })
        }
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
    onConfirm(e) {
        const { detail } = e;
        if(detail[0]!='Invalid Date'){
            var startDate=moment(detail[0]).format('YYYY-MM-DD');
            var endDate=moment(detail[1]).format('YYYY-MM-DD');
            var day= moment(endDate).diff(startDate, 'day')
            this.setData({
                startDate: startDate,
                endDate: endDate,
                day,
                show: false
            })
        }else{
            this.setData({
                show: false
            })
        }
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    showTime() {
        const { startDate, endDate } = this.data
        this.setData({
            show: true,
            dataRange: [ startDate, endDate]
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
    },
    bindgosearch(){
        var startDate=this.data.startDate;
        var endDate=this.data.endDate;
        wx.navigateTo({
          url: `/pages/room/search/search?roomNum=${this.data.roomNum}&&peopleNum=${this.data.peopleNum}&&childNum=${this.data.childNum}&&startDate=${startDate}&&endDate=${endDate}`,
        })
    }
})