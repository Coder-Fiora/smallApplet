// components/Swipper/Swipper.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       list:Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        topic_preview(e) {
            let that = this;
            let url = e.currentTarget.dataset.url;
            let previewImgArr = [];
            let data = that.properties.list;
            for (let i in data) {
                previewImgArr.push(data[i].src);
            }
            wx.previewImage({
                current: url, // 当前显⽰图⽚的http链接
                urls: previewImgArr // 需要预览的图⽚http链接列表
            })
        },
    }
})