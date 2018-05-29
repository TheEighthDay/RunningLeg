// pages/OrderStatus/OrderSatus.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: [
      {
        style: "接的订单",
        time_one: "2018/4/20 13：00",
        name: "大麟子",
        imagePath: "/image/1.png",
        amount: "50"
      },
      {
        style: "发的订单",
        time_one: "2018/4/20 13：00",
        name: "大麟字",
        imagePath: "/image/1.png",
        amount: "50"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  confirmbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/confirmbill",
      success: function (res) {
        length = res.data.length
        console.log(res.data);
      }
    })
  }
})