// pages/components/TopBar/TopBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       tabs:String,
       prevurl:String,
       notitle:String
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
        bindprev(){
            if(this.properties.prevurl){
                wx.switchTab({
                  url: this.properties.prevurl,
                })
            }else{
                wx.navigateBack({
                  delta: 1,
                })
            }
        }
    }
})