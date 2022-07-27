// pages/food/food.js
import http from '../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        page:1,
        foodInfolist:[]
    },
    onChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none',
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList(1)
    },
     getList(page){
        if(this.data.hasload){return false}
        http.guestFoodlist({
            data:{
                pageSize:5,
                pageNum:page
            },
            success: res => {
              var list=this.data.foodInfolist;
              var newlist=res.data.foodInfolist;
              if(newlist && newlist.length>0){
                  list=list.concat(newlist);
                  page++;
                  this.setData({
                    foodInfolist:list,
                    pictureList:res.data.pictureList,
                    page
                  })
              }else{
                  this.setData({
                      hasload:true
                  })
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
       var page=this.data.page;
       this.getList(page)   
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    godetail(e){
      var fid=e.currentTarget.dataset.id;
      var name=e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/food/detail?fid='+fid+'&name='+name,
      })
    }
})