//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  requesttest:function(){
    var that=this;
    wx.request({
      url: 'https://theeighthday.cn/testt', //仅为示例，并非真实的接口地址
      header: {
        // 'content-type': 'application/json'
        'Content-Type': 'json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          motto:res.data.param
        })
      }
    })
  },
  onLoad: function () {
  }
})
