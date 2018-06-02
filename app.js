//app.js
//app.js
App({
  onLaunch: function () {
    var that = this;
    var call= function () { //轮询函数
      that.request({
        url: "https://theeighthday.cn/getsendingbill",
        success: function (res) {
          that.globalData.sendingbill_id = res.data.data.map(item => item.id);
          var B = that.globalData.sendingbill_id;
          if (B) {
            for (var i=0;i<B.length;i++) {
              var id=B[i];
              that.request({
                url: "https://theeighthday.cn/getsendingbilltime",
                data: {
                  bill_id: B[i]
                },
                success: function (res) {
                  // console.log(id)
                  that.globalData.sendingtime[id+""] = res.data.data;
                  // console.log(that.globalData.sendingtime)
                }
              })
            }
          }
        }
      })
      
    };
    // setInterval(call,2000);
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