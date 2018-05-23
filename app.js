//app.js
App({
  serverUrl: "http://127.0.0.1:8763/",
  
  getWxUserInfo: function(){
    let _this = this;
    wx.getUserInfo({
      data: {
        withCredentials: true
      },
      success: res => {
        wx.setStorageSync("userInfo", res.userInfo)
        _this.globalData.userInfo = res.userInfo;
        _this.globalData.encryptedData = res.encryptedData;
        _this.globalData.iv = res.iv;
      }
    });
    
  },
  wxLogin: function(){
    let _this = this;
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        _this.globalData.code = res.code;
      }
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var _this = this;
    // 登录
    _this.wxLogin();
    _this.getWxUserInfo();
    
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