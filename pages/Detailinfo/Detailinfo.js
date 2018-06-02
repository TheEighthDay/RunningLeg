var app=getApp()
Page({
  data: {
    id:'',
    send_address: "",
    send_username:"",
    goal_address:"",
    send_phonenumber: "",
    hope_time: "",
    remark: "",
  },
  onLoad:function(options){
    var that=this;
    that.setData({
      id: options.id,
      send_address: options.send_address,
      send_username: options.send_username,
      send_phonenumber: options.send_phonenumber,
      hope_time: options.hope_time,
      remark: options.remark,
      goal_address: options.goal_address
    })
  },
  receivebill:function(){
    var that = this;
    app.request({
      url: "https://theeighthday.cn/receivebill",
      data: {
        "bill_id": that.data.id,
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == 1) {
          console.log("ok");
          wx.showToast({
            title: '成功',
          })
          setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
          },1000)
        }
        else {
          wx.showToast({
            title: '失败',
          })

        }
      }
    })

  }
})
