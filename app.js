//app.js
App({
  onLaunch: function () {
    // wx.removeStorageSync('skey'); //清除缓存
    
    // this.request({
    //   url: 'https://theeighthday.cn/createbill',  //创建订单
    //   data: {
    //     'goal_address':'hebei',
    //     'remark':'田凯彬最帅',
    //     'send_address':'beijin',
    //     'hope_time': "2018,5,20,11,23,55"
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    var that = this;
    console.info('登陆 app...');
    wx.showLoading({
      title: '登陆中',
      mask: true
    });
    console.info('检查授权ing');
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.info("已经授权");
        }
        else{
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.info("授权成功");
            },
            fail() {
              //弹窗要授权
              console.info("授权失败");
              wx.showModal({
                title: '提示',
                content: '拒绝授权可能会影响定位功能使用，请删除小程序或设置授权',
                confirmText: '去设置',
                success: res => {
                  if (res.confirm) {
                    wx.openSetting({
                    })
                  }
                }
              }) 
              console.log("重新授权成功") 
            }
          })
        }
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          that.checkLogin();
        }
      })

      },
    })
  },
  checkLogin:function(){
    console.info("检查登陆...");
    var skey = wx.getStorageSync('skey');
    if(skey){
      console.info("skey存在,不用登陆或注册，直接获取信息")
      this.getUserInfo();
    }
    else{
      console.info("skey不存在,要么本地储存被删除，要么新用户，将注册或登陆")
      this.loginAndRegister();
    }
  },
  
  loginAndRegister: function () {
    var that = this;
    wx.login({
      success: res => {
        var userInfo = {
          name: that.globalData.userInfo.nickName,
          avatar: that.globalData.userInfo.avatarUrl,
          code: res.code
        };
        // console.log(userInfo)
        that.request({
          url: 'https://theeighthday.cn/registeruser', //注册用户
          method: 'GET',
          data: userInfo,
          success: function (res) {
            if (res.statusCode==200){
              console.info("注册或者登陆成功");
              try {
                wx.setStorageSync('skey', res.data.skey);
              } catch (e) {
                console.info("存储skey失败");
              }
              wx.hideLoading();
            }
            else{
              console.info("注册失败");
              wx.hideLoading();
            }
          },
          fail : function(res){
            console.log(res);
          } 
        })
      }
    })
  },
  getUserInfo: function (){
    var that=this;
    this.request({
      url:'https://theeighthday.cn/userinfo',  //获取userinfo
      success:function(res){
        //未登录，session过期
        if (res.data.skey)
        {
          console.info("skey过期重新获取");
          console.log(res.data.skey);
          wx.setStorageSync('skey', res.data.skey);
          that.getUserInfo();
        }
        else{
          that.globalData.userInfo = res.data;
          console.log(that.globalData.userInfo)
          wx.hideLoading();
        }
      }
    })
  },
 
  request: function (obj) {
    var skey = wx.getStorageSync('skey');
    if(skey){
      obj.header = {
        skey:skey,
      }
    } 
    wx.request(obj)
  },
  globalData: {
    userInfo: null
  }
})