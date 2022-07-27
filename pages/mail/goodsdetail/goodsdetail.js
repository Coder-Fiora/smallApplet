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
        ifload:true,
        slice:0
    },
    changeSlice(e){
        var slice=e.currentTarget.dataset.slice;
        wx.pageScrollTo({
            scrollTop: slice, // 滚动到的位置（距离顶部 px）
            duration: 200
        })
    },
    onPageScroll(e) {
        if(e.scrollTop > 1200){
          this.setData({
            slice:2
          });
        } else if(e.scrollTop > 400){
          this.setData({
            slice:1
          });
        }else{
            this.setData({
                slice:0
              });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token=wx.getStorageSync('token');
        var uid=token.uid;
      this.setData({
          cid:options.cid,
          tid:options.tid,
          uid
      })
    },
    getdata(options){
        http.queryMallDetail({
            data:{
               cid:options.cid,
               uid:this.data.uid
            },
            success: res => {
              var data=res.data;
              var speclist=data.specList;
              speclist && speclist.map(i=>{
                  i.newprice=(i.price * i.discount).toFixed(2)
              })
              var address=data.rewardAddress;
              if(address){
                  var addressarr=address.oneadr.split(',')
                  address.oneadr=addressarr[0]+' '+addressarr[1]+' '+addressarr[2];
              }
              this.setData({
                  ...data
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    goorder(){
      wx.navigateTo({
        url: '/pages/mycenter/ShopOrders/ShopOrders',
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
      this.getdata(options);
      var token=wx.getStorageSync('token');
      var uid=token.uid;
      this.setData({
        uid
      })
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
        var info=this.data.specList;
        var typeid=this.data.typeid;
        var cid=info[typeid].cid,sid=info[typeid].sid,quantity=this.data.number;
        http.queryAddshopping({
            data:{
              uid:this.data.uid,
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
                   this.onShow()
               }
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    gocar(){
        if(this.data.uid){
            wx.navigateTo({
              url: '/pages/mail/mycar/mycar',
            })
        }else{
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
        }
    },
    address(){
        if(this.data.uid){
            wx.navigateTo({
              url: '/pages/mail/address/address',
            })
        }else{
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
        }
    },
    callMe(){
        wx.makePhoneCall({
            phoneNumber:this.data.commodityDesc.phone
        })
    },
    goMap(){
        wx.openLocation({
            latitude: 24.560139,
            longitude: 102.841751,
            scale:8,
            name:'大知闲闲民宿',
            address:this.data.commodityDesc.address,
            success:(r)=>{
               console.log(r)
            }
          })
    },
    gopay(){
        if(this.data.uid){
            var number=this.data.number;
            var tid=this.data.tid;
            var typeid=this.data.typeid;
            var cid=this.data.cid;
            wx.navigateTo({
              url: `/pages/mail/goodsdetail/pay?number=${number}&tid=${tid}&typeid=${typeid}&cid=${cid}`,
            })
        }else{
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
        }
    }
})