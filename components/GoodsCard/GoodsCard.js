// components/GoodsCard/GoodsCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       url:String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        godetail(){
            var url=this.properties.url
            wx.navigateTo({
              url: url,
            })
        }
    }
})