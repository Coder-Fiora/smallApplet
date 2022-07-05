// index.js
import http from '../../../api/request'
Page({
    data: {
        currentTab: 0,
    },
    onLoad: function (options) {
        http.queryIndexFood({
            data:{fid:"1"},
            success: res => {
              console.log('接口请求成功', res) 
              this.setData({
                  ...res.data,
              })
            },
            fail: err => {
              console.log(err)
            }
      })
    },

    bindTouch: function (e) {
        var that = this;
        var id = e.detail.current;
        that.setData({
            currentTab: id
        });
    },
    godetail(e){
       var obj=e.currentTarget.dataset.obj;
       obj=JSON.stringify(obj);
       wx.navigateTo({
         url: '/pages/index/Detail/Detail?type=canting&obj='+obj,
       })
    }
})