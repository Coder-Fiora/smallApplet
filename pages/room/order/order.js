// pages/room/order/order.js
import moment from 'moment'
import http from '../../../api/request';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
        dataRange: [moment().format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')],
        roomNum: 1,
        peopleNum: 1,
        childNum: 1,
        peoplenumber:[1,2],
        childnumber:[0,1,2,3,4,5],
        count:0,
        yuding_name:'',
        yuding_phone:'',
        beizhu:'',
        namearr:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var infoobj=JSON.parse(options.obj);
      var newprice=(infoobj.price-infoobj.unitprice)*infoobj.roomNum;
      newprice=newprice.toFixed(0);
      infoobj.newprice=newprice;
      infoobj.day=moment(infoobj.endDate).diff(infoobj.startDate, 'day');
      var dataRange=[moment(infoobj.startDate).format('YYYY-MM-DD'), moment(infoobj.endDate).format('YYYY-MM-DD')];
      var roomnumber=[];
      for(var i=1;i<=infoobj.hnum;i++){
        roomnumber.push(i)
      }
      var token=wx.getStorageSync('token');
      var uid=token.uid;
      this.setData({
        infoobj,
        roomnumber,
        uid,
        dataRange
      })
    },
    getYdname(e){
    this.setData({
        yuding_name:e.detail.value
    })
    },
    getYdphone(e){
        this.setData({
            yuding_phone:e.detail.value
        })
    },
    getRuzhuname(e){
       var idx=e.currentTarget.dataset.index;
       var value=e.detail.value;
       var namearr=this.data.namearr;
       namearr[idx]=value;
       this.setData({
         namearr
       })
    },
    getBeizhu(e){
       this.setData({
           beizhu:e.detail.value
       })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    showTime() {
        var obj=this.data.infoobj;
        this.setData({
            show: true,
            dataRange: [obj.startDate,obj.endDate]
        })
    },
    onConfirm(e) {
        const { detail } = e;
        var obj=this.data.infoobj;
        obj.startDate= moment(detail[0]).format('YYYY-MM-DD');
        obj.endDate= moment(detail[1]).format('YYYY-MM-DD');
        var day=moment(obj.endDate).diff(obj.startDate, 'day');
        obj.day=day;
        this.setData({
            show: false,
            infoobj:obj
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    handleNumber(e){
        var type=e.currentTarget.dataset.type;
        if(type=='reduceroom' || type=='addroom'){
            var number=this.data.infoobj.roomNum
        }else if(type=='reducepeople' || type=='addpeople'){
            var number=this.data.infoobj.peopleNum
        }else if(type=='reducechild' || type=='addchild'){
            var number=this.data.infoobj.childNum
        }
        if(type.indexOf('add')>-1){
            number++
        }else if(type.indexOf('reduce')>-1){
            number--
        }
        number=number<1?1:number;
        var infoobj=this.data.infoobj;
        if(type.indexOf('room')>-1){
            number=number>infoobj.hnum?infoobj.hnum:number;
            infoobj.roomNum=number*1;
        }
        if(type.indexOf('people')>-1){
            number=number>2?2:number;
            infoobj.peopleNum=number*1;
        }
        if(type.indexOf('child')>-1){
            infoobj.childNum=number*1;
        }
        this.setData({
            infoobj
        })
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
    bindPickerChange(event) {
        var value=event.detail.value;
        var infoobj=this.data.infoobj;
        infoobj.roomNum=this.data.roomnumber[value]
        this.setData({
            room_idx: value,
            infoobj
        })
    },
    bindPickerChange2(event) {
        var value=event.detail.value;
        var infoobj=this.data.infoobj;
        infoobj.peopleNum=this.data.peoplenumber[value]
        this.setData({
            people_idx: value,
            infoobj
        })
    },
    bindPickerChange3(event) {
        var value=event.detail.value;
        var infoobj=this.data.infoobj;
        infoobj.childNum=this.data.childnumber[value]
        this.setData({
            child_idx: value,
            infoobj
        })
    },
    chooseyouhui(){
        this.setData({
            showCoupon:true
        })
    },
    closecoupon(){
        this.setData({
            showCoupon:false
        })
    },
    closeDetail(){
        this.setData({
            showDetail:false
        })
    },
    lookDetail(){
        this.setData({
            showDetail:true
        })
    },
    onClose() {
        this.setData({
            show: false
        })
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
    addOrder(orderid){
        wx.showLoading({
            title: "正在创建订单..."
          })
        var alldata=this.data;
        var infoobj=alldata.infoobj;
        return new Promise(resolve=>{      
            http.saveRoomOrd({
                data: {
                    uid:alldata.uid,
                    oid:orderid,
                    type:1,
                    pname:infoobj.pname,
                    cmid:infoobj.cmid,
                    amount:infoobj.unitprice * infoobj.roomNum,
                    hpid:infoobj.hpid,
                    checkdate:infoobj.startDate.split('-').join('/')+'-'+infoobj.endDate.split('-').join('/'),
                    unitprice:infoobj.unitprice,
                    quantity:infoobj.roomNum,
                    reserve:alldata.yuding_name,
                    phone:alldata.yuding_phone,
                    iscou:'2',
                    checkList:alldata.namearr.join(','),
                    cuid:''
                },
                success: (res) => {
                    wx.hideLoading({
                      success: (res) => {},
                    })
                    resolve(res);
                }
            })
        });
    },
    //此处可以是点击事件
    async createOrder(e) {
        if(this.data.hasPay){return false}
        var that = this;
        var outTradeNo = "";  //订单号
        var jiaqian = 1;  // 开发阶段先设置交易金额为0.01元
        var infoobj=this.data.infoobj;
        var filesM=infoobj.unitprice * infoobj.roomNum;
        // var jiaqian = parseInt(filesM * 100);  //获取真实付款金额
      
        if(!this.data.yuding_name || !this.data.yuding_phone){
            wx.showToast({
              title: '请填写姓名和手机号',
              icon:'none'
            })
            return false
        }
        if (!(/^1[34578]\d{9}$/.test(this.data.yuding_phone))) {
            wx.showToast({
                title: '手机号码有误,请重新输入',
                icon:'none'
              })
              return false
        }
        if(this.data.namearr){
            var arr1 = this.data.namearr.filter(d => d);
        }

        if(!this.data.namearr || arr1.length!=this.data.namearr.length || this.data.namearr.length<infoobj.roomNum){
            wx.showToast({
              title: '请填写入住人姓名',
              icon:'none'
            })
            return false
        }
        outTradeNo = "O" + new Date().getTime(); //生成订单号
        var res=await that.addOrder(outTradeNo);
        if(res.code!=200){
           wx.showToast({
             title: res.msg,
             icon:'none'
           }) 
           return false
        }
        that.setData({
          outTradeNo: outTradeNo
        })
        
        //准备支付（先获取必要参数）
        wx.cloud.callFunction({
          name: 'pay',   //调用微信得pay云函数
          data: {
            goodName: infoobj.pname,   // 商品名称 或 商品描述
            totalFee: jiaqian,                   // 需要支付的金额
            outTradeNoTo: outTradeNo             // 生成的订单号
          },
          success: res => {
 // 此处是通过pay微信云函数，有微信给我们生成支付前的必要参数
            const payment = res.result.payment    // 微信会返回支付需要的必备数据
            wx.hideLoading()
             
            //调起支付（获取必要参数后，开始真实调用微信支付窗口）
            wx.requestPayment({
              ...payment,
              success(res) {   //如果支付成功了，进入success函数回调（成功后具体操作看实际业务需求）
                that.setData({
                    hasPay:true
                })
                wx.showLoading({
                  title: "付款成功"
                })
                setTimeout(function () {
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/mycenter/RoomOrders/RoomOrders',
                  })
                }, 800)
     
              },
              fail(res) {
                that.setData({
                    hasPay:true
                })
                wx.showLoading({
                  title: "支付失败"
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 1600)
              }
            })
     
          },
          fail(res) {
            console.log("获取支付参数失败", res);
          }
        })
      },
})