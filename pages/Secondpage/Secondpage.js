var app = getApp();
Page({
  data: {
    userInfo:{

    },
    goal_address: "",
    send_address: "",
    hope_time: "", //记得格式转换
    remark: "",
    phonenumber:"",
    showtime:"",
  },
  onShow : function(){
    var app=getApp();
    this.setData({
      userInfo: app.globalData.userInfo,
      goal_address: app.globalData.userInfo.address,
      phonenumber: app.globalData.userInfo.phonenumber,
    })
  },
  bindTimeChange: function (e) {
    var myDate=new Date();
    var timearr = e.detail.value.split(":")
    var time = myDate.getFullYear() + ',' + myDate.getMonth() + ',' + myDate.getDay() +','+timearr[0]+','+timearr[1]+','+'0'
    this.setData({
      hope_time: time,
      showtime: timearr[0] + '时' + timearr[1] + '分'
    })
    console.log(this.data.showtime)
  },
  chooseaddress: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          send_address: res.address
        });
        console.log(that.data.send_address);
      },
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
  blurName5: function (e) {
    var that = this;
    that.setData({
      phonenumber: e.detail.value
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
        "phonenumber": that.data.phonenumber,
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