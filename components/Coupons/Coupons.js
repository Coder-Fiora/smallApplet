Component({
    properties: {
        isHistory: Boolean,
        list:Array
    },
    methods:{
        goHistory() {
            wx.navigateTo({
                url: '/pages/mycenter/Coupons/History/History',
            })
        },
    }
})