// pages/earnings/earnings.js

const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    earningList:[
      {earningSource: '客户小明,已签装修合同.获得待收佣金', earningAmount:'5000.00'},
      {earningSource: '邀请好友成功.获得待收奖励', earningAmount: '100.00' }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    util.wxRequest({
      url: app.serverUrl + '/brokerEarning/getEarningPageList',
      dataType: 'json',
      success: function(res){
        console.log(res);
        // _this.setData({
        //   earningList: res.data.data
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

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