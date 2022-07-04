// index.js
import http from '../../api/request'
Page({
    data: {
        clientHeight: 0,
        currentTab: 0,
        statusHeight: 0,
    },
    onLoad: function (options) {
        var that = this;
        // 动态获取设备屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                let custom = wx.getMenuButtonBoundingClientRect();
                let height = custom.height + (custom.top - res.statusBarHeight) * 2 + res.statusBarHeight;
                that.setData({
                    clientHeight: res.windowHeight,
                    statusHeight: height
                });
            }
        });
        http.queryIndex({
              success: res => {
                console.log('接口请求成功', res) 
                var newcarousel=res.data.carouselList.slice(1)
                this.setData({
                    ...res.data,
                    newcarousel:newcarousel
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
    onShareAppMessage: function (options) {
        return {
            title: '官方资讯优惠，尽在小程序',
            path: '/pages/index/index',
        }
    },
    topic_preview(e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        let url = e.currentTarget.dataset.url;
        let previewImgArr = [];
        let data = that.data.newcarousel;
        for (let i in data) {
            previewImgArr.push(data[i].icurl);
        }
        wx.previewImage({
            current: url, // 当前显⽰图⽚的http链接
            urls: previewImgArr // 需要预览的图⽚http链接列表
        })
    },
    goDetailList(e){
        var type=e.currentTarget.dataset.type;
        wx.navigateTo({
          url: '/pages/index/DetailList/DetailList?type='+type
        })
    },
    goDetail(e){
        var type=e.currentTarget.dataset.type;
        wx.navigateTo({
          url: '/pages/index/Detail/Detail?type='+type
        })
    },
    goFoodDetail(){
        wx.navigateTo({
          url: '/pages/index/FoodDetail/FoodDetail'
        })
    }
})