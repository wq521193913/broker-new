// pages/withdrawal/withdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:null,
    inputVal:null
  },
  withdrawalAll:function(){
    this.setData({
      inputVal: this.data.balance
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      balance: options.balance
    })
    
  },

  
})