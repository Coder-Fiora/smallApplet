// components/RoomCard/RoomCard.js
import http from '../../api/request'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        open: true,
        visilbe: false,
        roomInfo: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeOpen(e) {
            e.stop
            this.setData({
                open: !this.data.open
            })
        },
        onClose() {
            this.setData({
                visilbe: false
            })
        },
        openDetail(e) {
            const { info } = e.currentTarget.dataset
            const { riid } = info.housePriceList[0]
            http.guestRoomTypeDetails({
                data: {
                    riid
                },
                success: (res) => {
                    this.setData({
                        visilbe: true,
                        roomInfo: res.data
                    })
                }
            })
        }
    }
})
