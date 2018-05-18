// pages/wallet-detail/wallet-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    walletDetailList: [
      { earningSource: '客户小明,装修完成.获得佣金', earningAmount: '5000.00' },
      { earningSource: '好友小刚,成功签单客户.获得奖励', earningAmount: '100.00' }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    util.wxRequest({
      url: app.serverUrl + '/brokerEarning/getEarningPageList',
      data: { "status": 1 },
      dataType: 'json',
      success: function (res) {
        console.log(res);
        _this.setData({
          walletDetailList: res.data.data.rows
        })
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