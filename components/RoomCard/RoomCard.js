// components/RoomCard/RoomCard.js
import http from '../../api/request'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object,
        startDate:String,
        endDate:String,
        roomNum:Number,
        peopleNum:Number,
        childNum:Number
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
        },
        goorder(e){
            var obj=e.currentTarget.dataset.obj;
            if(obj.hnum==0){return false}
            var proty=this.properties;
            var pname= proty.data.name;
            var cmid=obj.riid;
            var hpid=obj.hpid;
            var newobj={
                cmid:cmid,
                hpid:hpid,
                pname:pname,
                name:obj.name,
                iscancel:obj.iscancel,
                startDate:proty.startDate,
                endDate:proty.endDate,
                roomNum:proty.roomNum,
                peopleNum:proty.peopleNum,
                childNum:proty.childNum,
                unitprice:obj.nowprice,
                price:obj.price,
                hnum:obj.hnum
            }
            newobj=JSON.stringify(newobj)
            wx.navigateTo({
              url: '/pages/room/order/order?obj='+newobj,
            })
        }
    }
})
