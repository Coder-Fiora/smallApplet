// pages/mycenter/cardManerger/addBill.js
const App=getApp();
import http from '../../../api/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    consigneeName:'',
    phone:'',
    shuinum:'',
    bankname:'',
    banknumber:'',
    detailedAddress:'',
    type:1
  },
  changetype(e){
     var type=e.currentTarget.dataset.type;
     this.setData({
         type
     })
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
  shuiInput: function (e) {
    this.setData({
        shuinum: e.detail.value
    })
  },
  bankInput: function (e) {
    this.setData({
        bankname: e.detail.value
    })
  },
  banknumberInput: function (e) {
    this.setData({
        banknumber: e.detail.value
    })
  },
 submit: function() {
   var acceptName = this.data.consigneeName; 
   var shuinum=this.data.shuinum;
   var type=this.data.type;
   var mobile = this.data.phone; 
   var bankname=this.data.bankname;
   var address = this.data.detailedAddress;
   var banknumber=this.data.banknumber
 	
   if (acceptName == "") {
     wx.showToast({
       title: '请输入单位名称',
 		icon: 'none'
     })
     return false
   }
   else if (shuinum == "" && type==2) {
     wx.showToast({
       title: '请输入正确的税号',
 		icon: 'none'
     })
     return false
   }
   else {
      var aid=this.data.iid || '';
	  this.creatAdress(type,shuinum,acceptName,mobile,bankname,address,banknumber,aid)
   }
 },

 creatAdress(type,shuinum,acceptName,mobile,bankname,address,banknumber,aid){
         var data={
            uid:this.data.uid,
            iid:aid,
            type:type,
            name:acceptName,
            taxid:shuinum,
            address:address,
            phone:mobile,
            bank:bankname,
            account:banknumber
         }
     
    if(aid){
        http.guestUpdateBill({
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
        http.guestAddBill({
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
            shuinum:obj.taxid,
            bankname:obj.bank,
            banknumber:obj.account,
            detailedAddress:obj.address,
            type:obj.type,
            iid:obj.iid
          })
      }
      var token=wx.getStorageSync('token');
      var uid=token.uid;
      this.setData({
        uid
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  },

})