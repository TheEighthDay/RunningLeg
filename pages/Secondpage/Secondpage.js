var add = getApp()
Page({
  data: {
    detail:
    {
      address: "电子科技大学（沙河校区）15栋505",
      phonenumber: "13322224444",
      time: "2018/4/19 12：00",
      others: "汤！！！上楼慢一点不要撒了",
    }
  },
  sendbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/createbill",
      data: {
        "goal_address": that.data.detail.addresss,
        "remark": that.data.detail.others
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("asda");
        }
      }
    })
  }
})  