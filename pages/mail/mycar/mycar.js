// pages/mail/mycar/mycar.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       list:[{name:'阳朔糖舍周边',content:'阳朔糖舍周边:胸针',price:'70',number:3,status:false},{name:'阳朔糖舍周边22',content:'阳朔糖舍周边:胸针22',price:'50',number:2,status:false}],
       array:[1,2,3,4,5,6,7,8,9],
       index:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    bindPickerChange(e) {
        var number=this.data.array[e.detail.value]
        this.setData({
            index:e.detail.value,
            number
        })
    },
    handleNumber(e){
        var type=e.currentTarget.dataset.type;
        var number=e.currentTarget.dataset.obj;
        var idx=e.currentTarget.dataset.index;
        if(type=='add'){
            number++
        }else{
            number--
        }
        number=number<1?1:number;
        this.setData({
            ["list["+idx+"].number"]:number
        })
    },
})