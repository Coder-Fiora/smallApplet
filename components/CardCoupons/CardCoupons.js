Component({
    properties: {
        isHistory: Boolean
    },
    methods:{
        goHistory() {
            wx.navigateTo({
                url: '/pages/mycenter/CardCoupons/History/History',
            })
        },
    }
})