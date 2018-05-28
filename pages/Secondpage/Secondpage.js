var app = getApp();
Page({
  data: {
    userInfo:{

    },
    goal_address: "",
    send_address: "",
    hope_time: "", //记得格式转换
    remark: "",
  },
  onShow : function(){
    var app=getApp();
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  blurName1:function(e){
    var that = this;
    that.setData({
      goal_address:e.detail.value
    })
  },
  blurName2: function (e) {
    var that = this;
    that.setData({
      hope_time: e.detail.value
    })
  },
  blurName3: function (e) {
    var that = this;
    that.setData({
      send_address: e.detail.value
    })
  },
  blurName4: function (e) {
    var that = this;
    that.setData({
      remark: e.detail.value
    })
  },
  sendbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/createbill",
      data: {
        "goal_address": that.data.goal_address,
        "hope_time": that.data.hope_time,  //必须这种格式，屈萌记得把前端的时间格式转换一下
        "send_address": that.data.send_address,
        "remark": that.data.remark,
      },
      success: function (res) {
        console.log(res)
        if (res.data.success ==1) {
          console.log("ok");
          wx.showToast({
            title: '成功',
          })
        }
        else{
          wx.showToast({
            title: '失败',
          })

        }
      }
    })
  }
})  