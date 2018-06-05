//index.js
//获取应用实例
const util = require("../../utils/util.js")
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    session_3rd:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isRegister:false,
    // msgList:[
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    //   { url: "张**", title: "客户已在装修,获得佣金5000元" },
    // ]

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
  /**
   * 获取n个一组，显示swiper一屏
   * @param {array} arr 数组
   * @param {int} n 多少一屏
   */
  swiperItemArr: function (arr, n) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var a = (i + 1) % n;      //索引值余数
      var b = Math.floor(i / n);  //索引值倍数，向下取整

      //如果余数等于1，则创建一个数组，并push元素
      if (a == 1) {
        newArr[b] = [];
        newArr[b].push(arr[i]);
      } else {
        newArr[b].push(arr[i]);
      }
    }
    return newArr;
  },
  onLoad: function () {
    // var that = this;

    // that.setData({
    //   msgList: that.swiperItemArr(that.data.msgList, 3)
    // })
  },
  userLogin: function () {
    let _this = this;
    if (app.globalData.userInfo && app.globalData.code) {
      util.wxRequest({
        url: "/static/wxLogin",
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded' },
        data: {
          code: app.globalData.code,
          wxNickName: app.globalData.userInfo.nickName,
          wxCity: app.globalData.userInfo.city,
          wxProvince: app.globalData.userInfo.province,
          wxCountry: app.globalData.userInfo.country,
          wxAvatarUrl: app.globalData.userInfo.avatarUrl,
          encryptedData: app.globalData.encryptedData,
          iv: app.globalData.iv
        },
        dataType: 'json',
        success: function (res) {
          console.log(res.data);
          let source = res.data
          if(source.success){
            wx.setStorageSync("token", res.data.data.token);
            wx.setStorageSync("isRegister", res.data.data.isRegister);
            app.globalData.session_3rd = res.data.data.session_3rd;
            app.globalData.isRegister = res.data.data.isRegister;
            app.globalData.encryptedData = null;
            app.globalData.iv = null;
            _this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          }else{
            wx.showToast({
              title: source.msg || '登录失败',
              icon: 'none',
              duration: 2000
            })
          }
          
        },
        fail: function (res) {
          console.log(res);
        }
      });
      if (app.globalData.intervalId) {
        clearInterval(app.globalData.intervalId)
      }
    } else {
      if (app.globalData.intervalId) {
        clearInterval(app.globalData.intervalId)
      }
      app.globalData.intervalId = setInterval(_this.userLogin, 1000);
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.userLogin();
  },
  onReady: function(){
    
  },
  onShow: function(){
    var _this = this;
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
