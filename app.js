//app.js
//app.js
App({
  onLaunch: function () {
  },
  request: function (obj) {
    var skey = wx.getStorageSync('skey');
    if (skey) {
      obj.header = {
        skey: skey,
      }
    }
    wx.request(obj)
  },
  globalData: {
    userInfo: null,
    sendingbill_id:null,
    sendingtime:{}
  }

})