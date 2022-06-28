// index.js
Page({
    data: {
        clientHeight: 0,
        currentTab: 0,
        statusHeight: 0,
        banner_arr: [{
                src: '/image/test3.jpg',
                id: 0
            },
            {
                src: '/image/test5.jpg',
                id: 1
            },
            {
                src: '/image/test6.jpg',
                id: 2
            },
            {
                src: '/image/test7.jpg',
                id: 3
            }
        ]
    },
    onLoad: function (options) {
        var that = this;
        // 动态获取设备屏幕高度
        wx.getSystemInfo({
            success: function (res) {
                let custom = wx.getMenuButtonBoundingClientRect();
                console.log('custom', custom)
                console.log('res', res)
                let height = custom.height + (custom.top - res.statusBarHeight) * 2 + res.statusBarHeight;
                that.setData({
                    clientHeight: res.windowHeight,
                    statusHeight: height
                });
            }
        });
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
        let data = that.data.banner_arr;
        for (let i in data) {
            previewImgArr.push(data[i].src);
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