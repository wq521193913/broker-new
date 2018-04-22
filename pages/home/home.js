// pages/home/home.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
  
    animationData: {}
  },
  checkinPage: function(){
    wx.navigateTo({
      url: '../checkin/checkin',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
             msgList: [
               { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
               { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
               { url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }]
          });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    // var animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'linear',
    //   iterationCount:'infinite'
    // })

    // _this.animation = animation
    // _this.setData({
    //   animationData: animation.export()
    // })
    setInterval( function(){
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      })
      this.animation = animation
      this.animation.translateY(30)
        .step()
      _this.setData({
        animationData: animation.export()
      })
    },10)
    // setTimeout(function () {
    //   // animation.translate(30).step()
    //   animation.translateY(30)
    //     .step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 100)
  },

  move: function(){
    var _this = this;
    this.animation.translateY(30)
      .step()
    this.setData({
      animationData: animation.export()
    })
  },
  // rotateAndScale: function () {
  //   // 旋转同时放大
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateThenScale: function () {
  //   // 先旋转后放大
  //   this.animation.rotate(45).step()
  //   this.animation.scale(2, 2).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateAndScaleThenTranslate: function () {
  //   // 先旋转同时放大，然后平移
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.animation.translate(100, 100).step({ duration: 1000 })
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})