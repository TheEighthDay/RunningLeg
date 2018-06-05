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
    if (app.globalData.userInfo.address==null){
      app.globalData.userInfo.address='';
    }
    if (app.globalData.userInfo.phonenumber == null) {
      app.globalData.userInfo.phonenumber = '';
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      goal_address: app.globalData.userInfo.address,
      phonenumber: app.globalData.userInfo.phonenumber,
    })
  },

  handleInput: function(e) {
    console.log(e);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '高校即时跑腿了解一下？',
      path: '/pages/Firstpage',
      imageUrl: '/logo.jpg',
    }

  },
  bindTimeChange: function (e) {
    var myDate=new Date();
    var timearr = e.detail.value.split(":")
    var time = myDate.getFullYear() + ',' + (myDate.getMonth()+1) + ',' + myDate.getDate() +','+timearr[0]+','+timearr[1]+','+'0'
    this.setData({
      hope_time: time,
      showtime: timearr[0] + '时' + timearr[1] + '分'
    })
    console.log(this.data.hope_time)
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
          if (res.data.msg){
            wx.showToast({
              title: '未完成订单不能超过三个',
            })

          }else{
            wx.showToast({
              title: '失败',
            })
          }
         

        }
      }
    })
  }
})  