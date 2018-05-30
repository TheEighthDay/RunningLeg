// pages/Me/pages/BillHistory/BillHistory.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    histories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getsentbill",
      success: function (res) {
        console.log(res.data.data)
        length = res.data.length
        that.setData({
          histories: res.data.data,
        });
        wx.stopPullDownRefresh();
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
    this.onLoad();
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
  // sendbill: function () {
  //   var that = this;
  //   app.request({
  //     url: "https://theeighthday.cn/getbill",
  //     success: function (res) {
  //       length = res.data.length
  //       console.log(res.data);
  //     }
  //   })
  // }
})