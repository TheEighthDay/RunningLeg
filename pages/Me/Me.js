var app = getApp()
Page({
  data: {
    histories: [
      {
        id: 'history',
        name: '历史记录',
        open: false,
        pages: ['BillHistory', 'OrderHistory']
      }
    ],
    userInfo:{
   }
  },
  onLaunch: function () {
    console.log("获取头像和昵称")
    var that = this
    app.wx.getSetting(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
    })  
    console(userInfo)
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, histories = this.data.histories;
    for (var i = 0, len = histories.length; i < len; ++i) {
      if (histories[i].id == id) {
        histories[i].open = !histories[i].open
      } else {
        histories[i].open = false
      }
    }
    this.setData({
      histories: histories
    });
  }
})