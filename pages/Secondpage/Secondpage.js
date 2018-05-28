var app = getApp()
Page({
  data: {
    detail:
    {
      goal_address: "电子科技大学（沙河校区）15栋505",
      send_address: "电子科技大学",
      hope_time: "2018/4/19 12：00",
      remark: "汤！！！上楼慢一点不要撒了",
    }
  },
  sendbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/createbill",
      data: {
        "goal_address": that.data.detail.goal_address,
        "hope_time": "2018,3,4,22,33,44",  //必须这种格式，屈萌记得把前端的时间格式转换一下
        "send_address": that.data.detail.send_address,
        "remark": that.data.detail.remark,
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("asda");
        }
      }
    })
  }
})  