// pages/mail/goodsdetail/goodsdetail.js
import http from '../../../api/request';
const App=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array:[1,2,3,4,5,6,7,8,9],
        index:0,
        typeid:0,
        number:1,
        ifload:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
          cid:options.cid,
          tid:options.tid
      })
    },
    getdata(options){
        http.queryMallDetail({
            data:{
               cid:options.cid,
               uid:App.globalData.uid
            },
            success: res => {
              var data=res.data;
              var speclist=data.specList;
              speclist && speclist.map(i=>{
                  i.newprice=(i.price * i.discount).toFixed(2)
              })
              var address=data.rewardAddress;
              var addressarr=address.oneadr.split(',')
              address.oneadr=addressarr[0]+' '+addressarr[1]+' '+addressarr[2];
              this.setData({
                  ...data
              })
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
     var options={
         cid:this.data.cid,
         tid:this.data.tid
     }
      this.getdata(options)
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
    bindPickerChange(e) {
        var number=this.data.array[e.detail.value]
        this.setData({
            index:e.detail.value,
            number
        })
    },
    chooseType(e){
       var type=e.currentTarget.dataset.type;
       this.setData({
        typeid:type
       })
    },
    handleNumber(e){
        var type=e.currentTarget.dataset.type;
        var number=this.data.number;
        if(type=='add'){
            number++
        }else{
            number--
        }
        number=number<1?1:number;
        this.setData({
            number
        })
    },
    addBuyCar(){
        var info=this.data.commodityDesc;
        var cid=info.cid,sid=info.sid,quantity=this.data.number;
        http.queryAddshopping({
            data:{
              uid:'u001',
              cid:cid,
              sid:sid,
              quantity:quantity
            },
            success: res => {
               if(res.code==200){
                   wx.showToast({
                     title: '添加成功',
                     icon:'success'
                   })
               }
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    gocar(){
        wx.navigateTo({
          url: '/pages/mail/mycar/mycar',
        })
    },
    address(){
        wx.navigateTo({
          url: '/pages/mail/address/address',
        })
    },
    callMe(){
        wx.makePhoneCall({
            phoneNumber:this.data.commodityDesc.phone
        })
    },
    goMap(){
        wx.getLocation({
            type: 'gcj02',
            success:(res)=>{
                wx.openLocation({
                  latitude: res.latitude,
                  longitude: res.longitude,
                  scale:8,
                  name:'大知闲闲民宿',
                  address:this.data.commodityDesc.address,
                  success:(r)=>{
                     console.log(r)
                  }
                })
            }
          })
    }
})