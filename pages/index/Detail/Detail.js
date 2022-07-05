// pages/SpaDetail/SpaDetail.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        detailpage:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var type=options.type;
        var obj=JSON.parse(options.obj) ;
        this.setData({
            detailinfo:obj,
            detailpage:type
        })
        if(type=='main'){
            this.getControditon()
        }else if(type=='canting'){
            this.getCanting(obj.fdid);
        }else if(type=='roomdetail'){
            this.getRoomdetail(obj.rdid);
        }else if(type=='live'){
            this.getThreedetail(obj.tdid);
        }else if(type=='room'){
            this.getfourdetail(obj.fdid);
        }
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
        return {
            title: '官方资讯优惠，尽在小程序',
            path: '/pages/index/Detail/Detail',
        }
    },
    
    bindcallphone(){
        wx.makePhoneCall({
          phoneNumber: '0773-8883999',
        })
    },
    getControditon(){
        http.queryControdition({
            success: res => {
              this.setData({
                  ...res.data,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getCanting(id){
        http.queryCanting({
            data:{fdid:id},
            success: res => {
              this.setData({
                pictureList:res.data.foodPictureList,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getRoomdetail(id){
        http.queryRoomdetail({
            data:{rdid:id},
            success: res => {
              console.log('接口请求成功', res) 
              this.setData({
                pictureList:res.data.roomPictureList,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getThreedetail(id){
        http.queryThreedetail({
            data:{tdid:id},
            success: res => {
              console.log('接口请求成功', res) 
              this.setData({
                pictureList:res.data.indexThreeList,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getfourdetail(id){
        http.queryFourDetail({
            data:{fdid:id},
            success: res => {
              console.log('接口请求成功', res) 
              this.setData({
                pictureList:res.data.indexFourList,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    }
})