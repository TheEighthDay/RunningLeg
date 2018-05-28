const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  updateuser:function (){
    var that = this;
    app.request({
      url: "https://theeighthday.cn/updateuser",
      //需要把页面用户填的信息拉过来，成功后记得弹窗提示
      data: {
        "address": "beijin",
        "phonenumber":"123456",
        "username":"book"
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  blurName: function (e) {
    this.setData({ name: wx.getStorageSync('name') });
  },

  changeName: function (e) {
    var name = e.detail.value.trim();

    if (name) {
      wx.setStorageSync('name', name);
    }

  },

  changeAvatar: function (e) {

    var that = this;

    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync('avatar', savedFilePath);
            that.setData({ avatar: savedFilePath });
          }
        });
      }
    })
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
}
  )