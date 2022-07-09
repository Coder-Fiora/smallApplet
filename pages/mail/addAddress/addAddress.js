// pages/mail/addAddress/addAddress.js
// let QQMapWX = require('./../../static/js/qqmap-wx-jssdk.js');
// let qqmapsdk;
const App=getApp();
import http from '../../../api/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    showmap:false,
    consigneeName: "", 
    phone: "",
    detailedAddress: "",
    ifchecked:false,
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  consigneeNameInput: function(e) {
    this.setData({
      consigneeName: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  detailedAddressInput: function (e) {
    this.setData({
      detailedAddress: e.detail.value
    })
  },
 submit: function() {
   var acceptName = this.data.consigneeName; 
   var mobile = this.data.phone; 
   var area=this.data.region;
   var address = this.data.detailedAddress;
 	
   if (acceptName == "") {
     wx.showToast({
       title: '请输入姓名',
 		icon: 'none'
     })
     return false
   }
   else if (mobile == "") {
     wx.showToast({
       title: '请输入手机号码',
 		icon: 'none'
     })
     return false
   }
   else if (area == "") {
     wx.showToast({
       title: '请选择所在地区',
 		icon: 'none'
     })
     return false
   }
   else if (address == "") {
     wx.showToast({
       title: '请输入详细地址',
 		icon: 'none'
     })
     return false
   }
   else {
       var oneadr=area[0]+','+area[1]+','+area[2];
       var ifchecked=this.data.ifchecked;
       var isdefault=ifchecked?2:1;
       var aid=this.data.id || '';
	  this.creatAdress(acceptName,mobile,oneadr,address,isdefault,aid)
   }
 },
 bindSetdefault(e){
    this.setData({
        ifchecked:!this.data.ifchecked
    })
 },
 creatAdress(name,phone,oneadr,twoadr,isdefault,aid){
     var data={
        aid:aid,
        uid:App.globalData.uid,
        name:name,
        phone:phone,
        oneadr:oneadr,
        twoadr:twoadr,
        isdefault:isdefault
     }
    if(aid){
        http.queryChangeaddress({
            data:data,
            success:res=>{
                if(res.code==200){
                    wx.showToast({
                      title: '保存成功',
                      duration:1000,
                    })
                    setTimeout(function(){
                       wx.navigateBack({
                         delta: 1,
                       })
                    },1000)
                }
            }
        })
    }else{
        http.queryAddaddress({
            data:data,
            success: res => {
              if(res.code==200){
                  wx.showToast({
                    title: '保存成功',
                    duration:1000,
                  })
                  setTimeout(function(){
                     wx.navigateBack({
                       delta: 1,
                     })
                  },1000)
              }
            },
            fail: err => {
              console.log(err)
            }
      })
    }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.obj){
          var obj=JSON.parse(options.obj);
          this.setData({
            consigneeName:obj.name,
            phone:obj.phone,
            region:obj.oneadr.split(','),
            detailedAddress:obj.twoadr,
            ifchecked:obj.isdefault==2?true:false,
            id:obj.aid
          })
      }
    //   qqmapsdk = new QQMapWX({
    //     key: 'key'
    //   });
    //   this.moveToLocation();
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        app.globalData.lat = res.latitude,
        app.globalData.lng = res.longitude
      
        //选择地点之后返回的结果
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
  deletAddress(){
    wx.showModal({
        title: '删除地址',
        content:'确定删除该地址吗?',
        showCancel:true,
        cancelColor:'#999999',
        confirmColor:'#fd2f0a',
        success:res=>{
            if(res.confirm){
                http.queryDeletaddress({
                    data:{
                       uid:App.globalData.uid,
                       aid:this.data.id
                    },
                    success: res => {
                      if(res.code==200){
                          wx.showToast({
                            title: '删除成功',
                            icon:'success'
                          })
                          setTimeout(function(){
                             wx.navigateBack({
                               delta: 1,
                             })
                          },1000)
                      }
                    },
                    fail: err => {
                      console.log(err)
                    }
              })
            }
        }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  },
  getLocation(){
      this.setData({
          showmap:true
      })
  }
})