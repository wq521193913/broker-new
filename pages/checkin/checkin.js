// pages/checkin-customer/checkin.js
var util = require("../../utils/util.js")
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '萧山区'],
    // array: ['咨询', '马上会装修', '已装修', '不装修了'],
    array: [{id:0,name:'咨询'}, {id:1,name:'马上会装修'}, {id:2,name:'已装修'}, {id:3,name:'不装修了'}],
    index: 0,
    customer:{},
  },
  //保存
  checkinSubmit: function(e){
    console.log(e.detail.value);
    const phone = e.detail.value.customerPhone;
    if(!phone || !util.checkPhone(phone)){
      wx.showToast({
        title: '请填入正确的手机号',
        icon: 'none',
      })
        return
    }
    wx.request({
      url: app.serverUrl+'/customer/insertCustomer',
      method: 'POST',
      data:{
        customerPhone: e.detail.value.customerPhone,
        customerName: e.detail.value.customerName,
        address:e.detail.value.address,
        status: e.detail.value.status,
        remarks: e.detail.value.remarks,
        province: e.detail.value.location[0],
        city: e.detail.value.location[1],
        district: e.detail.value.location[2],
      },
      dataType:'json',
      success: function(res){
        console.log(res);
        if(res.data.success){

        }else{
          wx.showToast({
            title: res.data.msg || '操作失败',
            icon: 'none',
          })
        }
      },
      fail: function(res){
        console.log(res);
      }
    });
  },
  //取消
  checkinCancel: function(){
    wx.navigateBack();
  },
  userLocation: function(cb){
    var _this = this;
    wx.getLocation({
      success: function(res) {
        let location = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + location +'&coord_type=1',
          data:{
            'key':'HSTBZ-MWD3J-UGEFB-KRK3J-JPTMQ-GABGZ'
          },
          success: res =>{
            console.log(res);
            const address_component = res.data.result.address_component;
            _this.setData({
              region: [address_component.province, address_component.city, address_component.district]
            });
          },
          fail: function(){
            _this.setData({
              region: ['浙江省', '杭州市', '萧山区'],
            });
            
          }
          
        })
      },
    });
  },
  //装修意向
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //省市区选择器
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userLocation();
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