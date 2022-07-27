// pages/mail/goodsdetail/pay.js
import http from '../../../api/request';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sdtype:1,
        childnumber:[1,2,3,4,5,6,7,8,9],
        child_idx:0,
        detail_tab:0,
        yuding_name:'',
        yuding_phone:'',
        yuding_time:''
    },
    changetype(e){
      var type=e.currentTarget.dataset.type;
      this.setData({
          sdtype:type
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token=wx.getStorageSync('token');
        var uid=token.uid;
        var number=options.number;
        this.setData({
            cid:options.cid,
            tid:options.tid,
            typeid:options.typeid,
            uid,
            number
        })
    },
    address(){
        if(this.data.uid){
            wx.navigateTo({
              url: '/pages/mail/address/address',
            })
        }else{
            wx.navigateTo({
              url: '/pages/Login/Login',
            })
        }
    },
    getdata(cid){
        http.queryMallDetail({
            data:{
               cid:cid,
               uid:this.data.uid
            },
            success: res => {
              var data=res.data;
              var speclist=data.specList;
              speclist && speclist.map(i=>{
                  i.newprice=(i.price * i.discount).toFixed(2)
              })
              var address=data.rewardAddress;
              if(address){
                  var addressarr=address.oneadr.split(',')
                  address.oneadr=addressarr[0]+' '+addressarr[1]+' '+addressarr[2];
              }
              this.setData({
                  ...data
              })
            },
            fail: err => {
              console.log(err)
            }
      })
      http.getCoupon({
        data: {
            uid:this.data.uid,
            type:1
        },
        success: (res) => {
            this.setData({
                ...res.data
            })
        }
    })
    },
    addOrder(orderid){
        wx.showLoading({
            title: "正在创建订单..."
          })
        var alldata=this.data;
        var speclist=alldata.specList,typeid=alldata.typeid;
        return new Promise(resolve=>{      
            http.saveMallOrd({
                data: {
                    uid:alldata.uid,
                    oid:orderid,
                    type:2,
                    pname:alldata.name,
                    cmid:alldata.commodityDesc.cid,
                    amount:speclist[typeid].newprice * alldata.number,
                    unitprice:speclist[typeid].newprice,
                    quantity:alldata.number,
                    reserve:alldata.yuding_name,
                    phone:alldata.yuding_phone,
                    iscou:'2',
                    mallType:alldata.tid==1?1:alldata.tid==2?3:2,
                    aid:alldata.rewardAddress?alldata.rewardAddress.aid:'',
                    sid:alldata.commodityDesc.sid,
                    rdate:alldata.yuding_time,
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
    var speclist=that.data.specList,typeid=that.data.typeid;
    var filesM=speclist[typeid].newprice * that.data.number;
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
    if(this.data.tid==1 && !this.data.rewardAddress){
        wx.showToast({
          title: '请填写收货地址',
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
        goodName: that.data.name,   // 商品名称 或 商品描述
        totalFee: jiaqian,                   // 需要支付的金额
        outTradeNoTo: outTradeNo             // 生成的订单号
      },
      success: res => {
        console.log("获取字符参数成功", res);   // 此处是通过pay微信云函数，有微信给我们生成支付前的必要参数
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
                url: '/pages/mycenter/ShopOrders/ShopOrders',
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    chooseyouhui(){
      this.setData({
          showCoupon:true
      })
    },
    lookDetail(){
        this.setData({
            showDetail:true
        })
    },
    closecoupon(){
        this.setData({
            showCoupon:false
        })
    },
    changeTab(e){
        this.setData({
            detail_tab:e.currentTarget.dataset.tab
        })
    },
    closeDetail(){
        this.setData({
            showDetail:false
        })
    },
    bindPickerChange(e) {
        var number=this.data.childnumber[e.detail.value]
        this.setData({
            child_idx:e.detail.value,
            number
        })
    },
    handleNumber(e){
        var type=e.currentTarget.dataset.type;
        var number=this.data.number;
        if(type=='add'){
            number++
        }else{
            number--
        }
        number=number<1?1:number;
        this.setData({
            number
        })
    },
    getBeizhu(e){
      this.setData({
          beizhu:e.detail.value
      })
    },
    getPhone(e){
        this.setData({
            yuding_phone:e.detail.value
        })
      },
      getName(e){
        this.setData({
            yuding_name:e.detail.value
        })
      },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var cid=this.data.cid;
         this.getdata(cid);
         var token=wx.getStorageSync('token');
         var uid=token.uid;
         this.setData({
           uid
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

    }
})