Component({
    properties: {
        isHistory: Boolean
    },
    methods:{
        goHistory() {
            wx.navigateTo({
                url: '/pages/mycenter/Coupons/History/History',
            })
        },
    }
})