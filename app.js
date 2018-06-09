//app.js
//app.js
App({
  onLaunch: function () {
    var that = this;
    var call= function () { //轮询函数
      that.request({
        url: "https://theeighthday.cn/getsendingbill",
        success: function (res) {
          if(res.data.success==1){
            that.globalData.sendingbill_id = res.data.data.map(item => item.id);
            var B = that.globalData.sendingbill_id;
            if (B.length < that.globalData.tem){
              console.log("有个订单被接啦");
              wx.showToast({
                title: '有个订单被接啦,点击小风车查看吧',
                duration: 2000
              })
              
            }
            that.globalData.tem = B.length;
            if (B.length!=0) {
              for (var i = 0; i < B.length; i++) {
                var id = B[i];
                that.request({
                  url: "https://theeighthday.cn/getsendingbilltime",
                  data: {
                    bill_id: B[i]
                  },
                  success: function (res) {
                    console.log("结束超时订单");
                    // console.log(id)
                    // that.globalData.sendingtime[id+""] = res.data.data;
                    // console.log(that.globalData.sendingtime)
                  }
                })
              }
            }
          }
          else{
            console.log("获取订单失败");
          }
        }
      })
    };
    setInterval(call,2000);
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
    sendingbill_id:[],
    tem:-1,
  }
})