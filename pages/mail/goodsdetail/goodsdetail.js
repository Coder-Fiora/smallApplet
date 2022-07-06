// pages/mail/goodsdetail/goodsdetail.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array:[1,2,3,4,5,6,7,8,9],
        index:0,
        typeid:0,
        number:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        http.queryMallDetail({
            data:{
               cid:options.cid
            },
            success: res => {
              console.log('接口请求成功', res) 
              var data=res.data;
              var speclist=data.specList;
              speclist && speclist.map(i=>{
                  i.newprice=(i.price * i.discount).toFixed(2)
              })
              this.setData({
                  ...data,
                  tid:options.tid
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

    }
})