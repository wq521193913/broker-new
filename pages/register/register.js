// pages/register/register.js
var util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  registerCancel:function(){
    wx.navigateBack({
      
    })
  },
  registerSubmit: function(e){
    let phone = e.detail.value.brokerPhone;
    if(!util.checkPhone(phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    util.wxRequest({
      url: app.serverUrl + '/brokerUser/insertBrokerUser',
      method: 'POST',
      data: {
        brokerAddress: e.detail.value.brokerAddress,
        brokerIdCard: e.detail.value.brokerIdCard,
        brokerName: e.detail.value.brokerName,
        brokerPhone: e.detail.value.brokerPhone,
        brokerQq: e.detail.value.brokerQq,
        brokerWeibo: e.detail.value.brokerWeibo,
      },
      dataType:'json',
      success:function(res){
        console.log(res);
        var data = res.data;
        if(data.success){
          wx.navigateBack({
            
          });
        }else{
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.session_3rd){
      app.checkLoginInfo();
    }
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