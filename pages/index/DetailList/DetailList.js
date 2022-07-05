// pages/SpaList/SpaList.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showlist:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var type=options.type;
        if(type=='room'){
            this.getroomlist()
        }else if(type=='live'){
            this.getLivelist()
        }
        else if(type=='spa'){
            this.getSpalist()
        }
        this.setData({
            showlist:type
        })  
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    getroomlist(){
        http.queryRoom({
            data:{roid:1},
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
    getLivelist(){
        http.queryThree({
            data:{itid:1},
            success: res => {
              this.setData({
                roomList:res.data.indexThreeList,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getSpalist(){
        http.queryFour({
            data:{ifid:1},
            success: res => {
              this.setData({
                roomList:res.data.indexFourDesc,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
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
    godetail(e){
        var type=e.currentTarget.dataset.type;
        var obj=e.currentTarget.dataset.obj;
        obj=JSON.stringify(obj);
        wx.navigateTo({
          url: '/pages/index/Detail/Detail?type='+type+'&obj='+obj,
        })
    }
})