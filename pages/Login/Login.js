// pages/Login/Login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      SessionKey: '',
      OpenId: '',
      code: '',
      isCanUse: wx.getStorageSync('isCanUse'), //默认为true
      token: '',
      userInfo: {
        nickName: null,
        avatarUrl: null,
      },
      flag: false,
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
    wxLogin(e) {
        let p1 = this.wxSilentLogin() // 获取code
        let p2 = this.wxGetUserProfile() // 获取用户信息
        p1.then((code) => {
          return code
        })
          .then((code) => {
            this.setData({code})
            return new Promise((resolve, reject) => {
              p2.then((res) => {
                resolve({
                  code,
                  iv: res.iv,
                  encryptedData: res.encryptedData,
                })
              }).catch((err) => {
                reject(err)
              })
            })
          })
          .then((res) => {
            let _this = this
            // 请求服务器
            wx.request({
              url: 'https://www.dazhixianxian.com.cn/weChat/login',
              method: 'POST',
              data: {
                code: res.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded', 
              },
              success(res) {
                wx.setStorageSync('token', res.data.data)
                wx.navigateBack({
                  delta: 1,
                })
              },
            })
          })
          .catch((err) => {
            console.log(err)
          })
      },
      wxGetUserProfile: function () {
        // 获取头像昵称等
        let _this = this
        return new Promise((resolve, reject) => {
          wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用户登录',
            success: (res) => {
              resolve(res)
              _this.setData({
                userInfo:{nickName:res.userInfo.nickName,avatarUrl:res.userInfo.avatarUrl},
                flag:true
              })
              wx.setStorageSync('isCanUse', '1');
              var userinfo=JSON.stringify(this.data.userInfo);
              wx.setStorageSync('userinfo', userinfo);
              // _this.updateUserInfo();
            },
            // 失败回调
            fail: (err) => {
              reject(err)
              console.log('选择了拒绝')
            },
          })
        })
      },
      wxSilentLogin: function () {
        // 获取code
        return new Promise((resolve, reject) => {
          wx.login({
            success(res) {
              resolve(res.code)
              console.log('获取得到的loginres', res)
            },
            fail(err) {
              reject(err)
            },
          })
        })
      },
      getPhoneNumber: function (e) {
        var self = this
        if (e.detail.errMsg !== 'getPhoneNumber:ok') return
        wx.showLoading()
        wx.checkSession({
          success(res) {
            if (self.data.code) {
              //    2.访问登录凭证校验接口获取session_key
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                  appid: '小程序appid',
                  secret: '小程序密钥',
                  js_code: self.code,
                  grant_type: 'authorization_code',
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json',
                },
                success: function (data) {
                  console.log('获取到session_key啦', data)
                  if (data.statusCode == 200) {
                    //3. 解密
                    wx.request({
                      url: '后台提供的接口',
                      data: {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        sessionKey: data.data.session_key,
                      },
                      method: 'GET',
                      header: {
                        'content-type': 'application/json',
                      },
                      success: function (data) {
                        wx.hideLoading()
                        console.log('获取到的手机号是', data.data.phoneNumber)
                      },
                      fail: function (err) {
                        console.log(err)
                      },
                    })
                  }
                },
                fail: function (err) {
                  console.log(err)
                },
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: '授权失败，请重新授权',
              })
              self.flag = false
            }
          },
          fail() {
            wx.showToast({
              icon: 'none',
              title: '登录过期，请重新登录',
            })
          },
        })
      },

      updateUserInfo: function () {
        return new Promise((resolve, reject) => {
          wx.request({
            url: '后台提供的接口',
            method: 'POST',
            data: {
              openId: '',
              password: '',
              telePhone: '',
              tenantId: 0,
              username: '',
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            success(res) {
              console.log(333, res.data)
            },
          })
          wx.login({
            success(res) {
              resolve(res.code)
            },
            fail(err) {
              reject(err)
            },
          })
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

    },
    backpreve(){
        wx.navigateBack({
          delta: 1,
        })
    }
})