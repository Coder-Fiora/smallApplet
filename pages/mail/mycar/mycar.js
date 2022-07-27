// pages/mail/mycar/mycar.js
import http from '../../../api/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mapList:[],
       array:[1,2,3,4,5,6,7,8,9],
       index:0,
       Goods:[],
       isAllselected:false,
       totalPrice:0,
       rid:'',
       selectedList:[],
       goodsCarts:[],
       showmaneger:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token=wx.getStorageSync('token');
        var uid=token.uid;
        this.lookcart(uid);
        this.setData({
          uid
        })
    },
    gomail(){
      wx.reLaunch({
        url: '/pages/mail/mail',
      })
    },
    radioChange(e){
       var that=this;
       var index=e.currentTarget.dataset.index;
       var rid=e.currentTarget.dataset.id;
       var goods=that.data.mapList.find(item=>{
           return item.mcid===rid
       })
       let i=that.data.selectedList.indexOf(that.data.mapList[index].mcid);
       if(i>-1){
           that.data.selectedList.splice(i,1)
       }else{
           that.data.selectedList.push(that.data.mapList[index].mcid)
       }
       goods.checked=!goods.checked;
       let isAllselected=that.data.mapList.every(r=>r.checked);
       that.setData({
           mapList:that.data.mapList,
           isAllselected,
           index:index,
           selectedList:that.data.selectedList,
           rid
       })
       that.total()
    },
    total(){
      let totalPrice=0;
      let goods=this.data.mapList;
      goods.map(i=>{
          if(i.checked){
            totalPrice+=((i.price*i.discount*i.quantity).toFixed(2)*1)
          }
      })
      this.setData({
          mapList:goods,
          totalPrice:totalPrice.toFixed(2)
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    goDetail(){
      var list=this.data.mapList;
      var arr=[];
      list.map(i=>{
          if(i.checked){
              var obj={
                  number:i.quantity,
                  tid:i.type,
                  gname:i.gname,
                  sname:i.sname,
                  cid:i.cid,
                  curl:i.curl,
                  price:i.newprice,
                  sid:i.sid
              }
              arr.push(obj)
          }
      })
      wx.navigateTo({
        url: '/pages/mail/mycar/Carpay?data='+JSON.stringify(arr),
      })
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
        var number=this.data.array[e.detail.value];
        var index=e.currentTarget.dataset.index;
        this.setData({
            index:e.detail.value,
            ["mapList["+index+"].quantity"]:number
        })
        if(this.data.mapList[index].checked){
            this.total()
        }
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
       
        if(number<1){
            wx.showToast({
              title: '最后一件,不能再减了~',
              icon:'none'
            })
            return false
        }
        number=number<1?1:number;
        this.setData({
            ["mapList["+idx+"].quantity"]:number
        })
        var list=this.data.mapList;
        if(list[idx].checked){
            this.total()
        }
        this.changeCar(list[idx].mcid,type)
    },
    selectall(){
        let newgoods=this.data.mapList;
        let ridList=[];
        let isAllselected=this.data.isAllselected;
        newgoods.forEach(element=>{
            if(isAllselected){
                element.checked=false
            }else{
                element.checked=true;
                ridList.push(element.id)
            }
        })
        isAllselected=!isAllselected;
        this.setData({
            isAllselected:isAllselected,
            mapList:newgoods,
            selectedList:ridList
        })
        this.total()
    },
    changemaneger(){
        this.setData({
            showmaneger:!this.data.showmaneger
        })
    },
    delet(){
       var list=this.data.mapList;
       var that=this;
       list.map(i=>{
           if(i.checked){
             that.changeCar(i.mcid,'del')
           }
       })
    },
    lookcart(uid){
        http.queryLookshopping({
            data:{
              uid:uid
            },
            success: res => {
              if(res.data){
                  let isAllselected=res.data.mapList.every(r=>r.checked);
                  var data=res.data.mapList;
    
                  data.map(i=>{
                      i.newprice=(i.price * i.discount).toFixed(2)
                  })
                  this.setData({
                      mapList:data,
                      isAllselected
                  })
                  this.total()
              }  
            },
            fail: err => {
              console.log(err)
            }
      })
    },
    changeCar(mcid,type){
        http.queryChangeshopping({
            data:{
              mcid:mcid,
              type:type
            },
            success: res => {
               if(res.code==200 && type=='del'){
                   wx.showToast({
                     title: '删除成功!',
                     icon:'none'
                   })
                   var list=this.data.mapList;
                   list.map(i=>{
                       if(i.mcid==mcid){
                           list.splice(i,1)
                       }
                   })
                   this.onLoad()
               }  
            },
            fail: err => {
              console.log(err)
            }
      })
    }
})