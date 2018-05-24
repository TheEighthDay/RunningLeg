var app=getApp()
Page({
  data: {    
  },
  onLoad: function () {
    var that = this;
    console.info('登陆 app...');
    console.info('检查授权ing');
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.info("已经授权");
          wx.switchTab({
            url: '../Firstpage/Firstpage'
          })
          console.info("跳转成功");
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo);
              app.globalData.userInfo = res.userInfo;
              // console.log(app.globalData.userInfo);
              that.checkLogin();
            }
          })
        }
        else {
          console.info("未授权");
          wx.showModal({
            title: '提示',
            content: '拒绝授权可能会影响功能使用，请授权'
          }) 
        }
      },
    })
    
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.info("授权成功");
      wx.switchTab({
        url: '../Firstpage/Firstpage'
      })
      console.info("跳转成功");
      app.globalData.userInfo = e.detail.userInfo;
      // console.log(app.globalData.userInfo)
      this.checkLogin();
    } 
  },
  checkLogin: function () {
    console.info("检查登陆...");
    var skey = wx.getStorageSync('skey');
    if (skey) {
      console.info("skey存在,不用登陆或注册，直接获取信息")
      this.getUserInfo();
    }
    else {
      console.info("skey不存在,要么本地储存被删除，要么新用户，将注册或登陆")
      this.loginAndRegister();
    }
  },

  loginAndRegister: function () {
    var that = this;
    wx.login({
      success: res => {
        var userInfo = {
          name: app.globalData.userInfo.nickName,
          avatar: app.globalData.userInfo.avatarUrl,
          code: res.code
        };
        // console.log(userInfo)
        that.request({
          url: 'https://theeighthday.cn/registeruser', //注册用户
          method: 'GET',
          data: userInfo,
          success: function (res) {
            if (res.statusCode == 200) {
              console.info("注册或者登陆成功");
              app.globalData.userInfo=res.data.userinfo;
              console.log(app.globalData.userInfo)
              try {
                wx.setStorageSync('skey', res.data.skey);
              } catch (e) {
                console.info("存储skey失败");
              }
              // wx.hideLoading();
            }
            else {
              console.info("注册失败");
              // wx.hideLoading();
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  getUserInfo: function () {
    var that = this;
    this.request({
      url: 'https://theeighthday.cn/userinfo',  //获取userinfo
      success: function (res) {
        //未登录，session过期
        if (res.data.skey) {
          console.info("skey过期重新获取");
          console.log(res.data.skey);
          wx.setStorageSync('skey', res.data.skey);
          that.getUserInfo();
        }
        else {
          app.globalData.userInfo = res.data;
          console.log(app.globalData.userInfo)
          // wx.hideLoading();
        }
      }
    })
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
})