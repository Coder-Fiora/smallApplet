// pages/mail/mail.js
import http from '../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        tid:0,
        ifload:true
    },
    getkeyword(e){
      var keyword=e.detail.value;
      this.setData({
        keyword
      })
    },
    goLogin(){
      wx.navigateTo({
        url: '/pages/Login/Login',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getMalldata(1)
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
        var token=wx.getStorageSync('token');
        if(token && token.uid){
            this.setData({
              ifload:false
            })
        }
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
       var page=this.data.page;
       var tid=this.data.tid;
       var keyword=this.data.keyword;
       page++;
       this.getMallList(tid,page,keyword)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    getMalldata(page){
        http.queryMall({
            data:{
                pageNum:page?page:1,
                pageSize:4,
            },
            success: res => {
              var data=res.data;
              var nowprice=data.commodList;
              var typelist=data.mallTypeList;
              var arr=[{tid:'0',name:'全部',curl:'/image/all.jpg'}];
              typelist=arr.concat(typelist);
              data.mallTypeList=typelist;
              nowprice.map(i=>{
                 i.newprice=(i.price * i.dis).toFixed(2)
              })
              this.setData({
                  ...data,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    getMallList(tid,page,name){
        if(this.data.hasload){return false};
        var that=this;
        http.queryMallList({
            data:{
                tid:tid+'',
                pageNum:page?page:1,
                pageSize:4,
                name:name?name:''
            },
            success: res => {
              var data=res.data;
              var nowprice=data.commodList;
              var list=that.data.commodList;
              if(nowprice && nowprice.length>0){
                  nowprice.map(i=>{
                     i.newprice=(i.price * i.dis).toFixed(2)
                  })
                  list=list.concat(nowprice);
                  that.setData({
                      page:page,
                      commodList:list
                  })
              }else{
                that.setData({
                     hasload:true
                 })
              }
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    checkType(e){
        var tid=e.currentTarget.dataset.id || this.data.tid;
        var name=this.data.keyword;
        this.setData({
            tid:tid,
            page:1,
            commodList:[],
            hasload:false
        },()=>{
            this.getMallList(tid,1,name)
        })
    }
})