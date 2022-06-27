// index.js
Page({
    data: {
        clientHeight: 0,
        currentTab: 0,
        statusHeight: 0,
        banner_arr: [{
                src: '/image/banner3.jpg',
                id: 0
            },
            {
                src: '/image/banner4.jpg',
                id: 1
            },
            {
                src: '/image/banner5.jpg',
                id: 2
            },
            {
                src: '/image/banner1.jpg',
                id: 3
            },
            {
                src: '/image/baner2.jpg',
                id: 4
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
        var that = this;
        var id = e.currentTarget.dataset.id;
        var url = e.currentTarget.dataset.url;
        var previewImgArr = [];

        var data = that.data.banner_arr;
        for (var i in data) {
            previewImgArr.push(data[i].src);
        }
        console.log(previewImgArr)
        wx.previewImage({
            current: url, // 当前显⽰图⽚的http链接
            urls: previewImgArr // 需要预览的图⽚http链接列表
        })
    },
    gospalist(){
        wx.navigateTo({
          url: '/pages/SpaList/SpaList'
        })
    }
})