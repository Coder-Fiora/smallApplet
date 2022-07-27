// components/GoodsCard/GoodsCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       url:String,
       obj:Object
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
            var token=wx.getStorageSync('token');
            var url=this.properties.url;
            if(token && token.uid){
                 wx.navigateTo({
                   url: url,
                 })
            }else{
                wx.navigateTo({
                    url: '/pages/Login/Login',
                })
            }
           
        }
    }
})