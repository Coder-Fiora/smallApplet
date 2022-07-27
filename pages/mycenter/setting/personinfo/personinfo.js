// pages/mycenter/setting/personinfo/personinfo.js
import http from '../../../../api/request'
const App=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex_index:0,
        sex:['先生','女士'],
        date:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token=wx.getStorageSync('token');
        var uid=token.uid;
        http.guestPerson({
            data:{
               uid:uid 
            },
            success: res => {
              this.setData({
                  ...res.data,
                  uid
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    changepeosoninfo(){
        var newobj=this.data;
        var headurl='',
        nickname=newobj.nickname || '',
        email=newobj.email || '',
        name=newobj.name || '',
        phone=newobj.phone || '',
        sex=newobj.sex_index*1+1,
        birthday=newobj.date;
        http.changePerson({
            data:{
               uid:newobj.uid,
               avatarurl: headurl,
               nikename:nickname,
               email:email,
               phone:phone,
               name:name,
               title:sex,
               birthday:birthday
            },
            success: res => {
               if(res.code==200){
                   wx.showToast({
                     title: '修改成功!',
                     icon:'none'
                   })
                   setTimeout(function(){
                       wx.navigateBack({
                         delta: 1,
                       })   
                   },600)
               }
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    getNickname(e){
      this.setData({
          nickname:e.detail.value
      })
    },
    getphone(){
        this.setData({
            phone:e.detail.value
        })
    },
    getEmail(e){
        this.setData({
            email:e.detail.value
        })
      },
      getname(e){
        this.setData({
            name:e.detail.value
        })
      },
    bindPickerChange: function(e) {
        this.setData({
            sex_index: e.detail.value
        })
      },
      bindDateChange: function(e) {
        this.setData({
          date: e.detail.value
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

    }
})