// pages/customer/customer.js
const util = require("../../utils/util.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerList:[]
  },
  getCustomerList: function(params){
    var _this = this;
    util.wxRequest({
      url: '/customer/queryMyCustomer',
      data: params,
      dataType:'json',
      success: function(res){
        let data = res.data;
        if(data.success){
          _this.setData({
            customerList: data.data
          })
        }else{
          console.log(data.msg);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var params ={};
    _this.getCustomerList(params);
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

})