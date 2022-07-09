// components/RoomCard/RoomDetail/RoomDetail.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        visible: Boolean,
        data: Object
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
        close(){
            console.log('1111111111')
            this.triggerEvent('onClose')
        }
    }
})
