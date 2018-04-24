//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  checkinPage: function(){
    wx.navigateTo({
      url: '/pages/checkin/checkin',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  registerPage: function(){
    wx.navigateTo({
      url: '/pages/invite/invite',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    var _this = this;
    console.log(_this.userInfo);
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

   /**
   * 用户点击右上角分享
   */
  ,onShareAppMessage: function (res) {

    if (res.from == 'button') {
      return {
        title: '赚外快,就是这么简单',
        path: '/pages/invite/invite?inviteCode=',
        imageUrl: '/image/20180314164849.png',
        success: function (res) {
          // 转发成功
          console.log(res);
        },
        fail: function (res) {
          // 转发失败
          console.log(res);
        }
      }
    } else {
      return {
        title: '家装,您的首选',
        path: '/pages/index/index',
        imageUrl: '/image/20180314164849.png',
        success: function (res) {
          // 转发成功
          console.log(res);
        },
        fail: function (res) {
          // 转发失败
          console.log(res);
        }
      }
    }

  }
})
