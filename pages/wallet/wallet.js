// pages/wallet/wallet.js
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      accountBalance: '1'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    util.wxRequest({
      url: app.serverUrl + '/brokerAccount/getAccountBySession',
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        const data = res.data;
        if (data) {
          _this.setData({
            user: data.data
          })
        }
      }
    })
   
  },
})