//app.js
App({
  serverUrl: "http://127.0.0.1:8762/",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _this = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
        wx.getUserInfo({
          data: {
            withCredentials: true
          },
          success: res => {
            wx.setStorageSync("userInfo", res.userInfo)
            this.globalData.userInfo = res.userInfo;
            this.globalData.encryptedData = res.encryptedData;
            this.globalData.iv = res.iv;

            wx.request({
      url: this.serverUrl + "/static/wxLogin",
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        code: this.globalData.code,
        wxNickName: this.globalData.userInfo.nickName,
        wxCity: this.globalData.userInfo.city,
        wxProvince: this.globalData.userInfo.province,
        wxCountry: this.globalData.userInfo.country,
        wxAvatarUrl: this.globalData.userInfo.avatarUrl,
        encryptedData: this.globalData.encryptedData,
        iv: this.globalData.iv
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        wx.setStorageSync("session_3rd", res.data.data.session_3rd);
        wx.setStorageSync("isRegister", res.data.data.isRegister);
        _this.globalData.session_3rd = res.data.data.session_3rd;
        _this.globalData.isRegister = res.data.data.isRegister;
        _this.globalData.encryptedData = null;
        _this.globalData.iv = null;
      },
      fail: function (res) {
        console.log(res);
      }
    });
            // this.userLogin();
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: { avatarUrl: '', nickName:''},
    code: null,
    session_3rd: null,
    encryptedData: null,
    intervalId: null,
    iv: null,
    isRegister: false
  }
})