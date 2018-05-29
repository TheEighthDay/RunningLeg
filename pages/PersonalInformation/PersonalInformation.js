const app = getApp()
Page({
  data: {
    userInfo: {},
    username:"",
    phonenumber:"",
    address:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  blurName1: function (e) {
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  blurName2: function (e) {
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  blurName3: function (e) {
    var that = this;
    that.setData({
      phonenumber: e.detail.value
    })
  },
  updateuser:function (){
    var that = this;
    app.request({
      url: "https://theeighthday.cn/updateuser",
      //需要把页面用户填的信息拉过来，成功后记得弹窗提示
      data: {
        "address": that.data.address,
        "phonenumber":that.data.phonenumber,
        "username":that.data.username
      },
      success: function (res) {
        if (res.data.success==1)
        {
          wx.showToast({
            title: '成功修改,1秒后返回',
          })
          app.request({
            url: 'https://theeighthday.cn/userinfo',  //获取userinfo
            success: function (res) {
              app.globalData.userInfo = res.data;
              console.log(app.globalData.userInfo)
            }
          })
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },1000)
        }
        else{
          wx.showToast({
            title: '修改失败',
          })

        }
        
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        username: app.globalData.userInfo.username,
        address: app.globalData.userInfo.address,
        phonenumber:app.globalData.userInfo.phonenumber,
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