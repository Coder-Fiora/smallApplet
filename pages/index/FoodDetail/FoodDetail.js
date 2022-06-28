// index.js
Page({
    data: {
        currentTab: 0,
        banner_arr: [{
            src: '/image/test10.jpg',
            id: 0,
            title:'1969吧'
        },
        {
            src: '/image/test6.jpg',
            id: 1,
            title:'糖舍餐厅'
        },
        {
            src: '/image/test8.jpg',
            id: 2,
            title:'1969吧'
        },
        {
            src: '/image/test11.jpg',
            id: 3,
            title:'糖舍餐厅'
        }
    ]
    },
    onLoad: function (options) {
       
    },

    bindTouch: function (e) {
        var that = this;
        var id = e.detail.current;
        that.setData({
            currentTab: id
        });
    }
})