// pages/user/user.js
const util = require('../../utils/util.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    session_3rd: '',
    userInfo: {
      avatarUrl: '/image/user_icon.png',
      nickName: '昵称'
    },
    showRight: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo:{
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      }
      
    })
    
  }

})