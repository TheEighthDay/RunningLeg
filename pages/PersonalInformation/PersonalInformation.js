const app = getApp()
Page({
  data: {
    userInfo: {},
    username: "",
    phonenumber: "",
    address: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    map_width: 380,
    map_height: 380,
    ishidden: {},
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  handleInput: function (e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'username' || type === 'address') {
      if (e.detail.value === '') {
        let temp = this.data.ishidden;
        temp[type] = false;
        this.setData({
          ishidden: temp
        })
      }else {
        let temp = this.data.ishidden;
        temp[type] = true;
        this.setData({
          ishidden: temp
        })
      }
    } else if (type === 'phonenumber') {
      if (/^1[35789]\d{9}$/.test(e.detail.value)) {
        let temp = this.data.ishidden;
        temp[type] = true;
        this.setData({
          ishidden: temp
        });
      } else {
        let temp = this.data.ishidden;
        temp[type] = false;
        this.setData({
          ishidden: temp
        });
      }
    }
    this.setData({
      [type]: e.detail.value
    });
  },
  chooseaddress:function(){
    wx.chooseLocation({
      success: (res) => {
        console.log(res);
        this.setData({
          address:res.address
        });
        console.log(res.address);
        if(res.address) {
            let temp = Object.assign({}, this.data.ishidden);
            temp.address = true;
            this.setData({
              ishidden: temp
            });
        } else {
          let temp = Object.assign({}, this.data.ishidden);
          temp.address = false;
          this.setData({
            ishidden: temp
          });
        }
      },
    })
  },
  updateuser: function () {
    var that = this;
    let ishidden = this.data.ishidden;
    if (!(ishidden.username && ishidden.phonenumber && ishidden.address)) {
      wx.showModal({
        content: '信息填写有误，请确认后点击完成',
        confirmText: "我知道了",
        showCancel: false,
      });
      return;
    }
    app.request({
      url: "https://theeighthday.cn/updateuser",
      //需要把页面用户填的信息拉过来，成功后记得弹窗提示
      data: {
        "address": that.data.address,
        "phonenumber": that.data.phonenumber,
        "username": that.data.username
      },
      success: function (res) {
        if (res.data.success == 1) {
          wx.showToast({
            title: '修改成功',
          })
          app.request({
            url: 'https://theeighthday.cn/userinfo',  //获取userinfo
            success: function (res) {
              app.globalData.userInfo = res.data;
              console.log(app.globalData.userInfo)
            }
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
        else {
          wx.showModal({
            content: '系统开小差了，请稍后再试',
            confirmText: "我知道了",
            showCancel: false,
          });

        }

      }
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        username: app.globalData.userInfo.username,
        address: app.globalData.userInfo.address,
        phonenumber: app.globalData.userInfo.phonenumber,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      let ishidden = {};
      if (app.globalData.userInfo.username !== '') {
        ishidden.username = true;
      }
      if (app.globalData.userInfo.address !== '') {
        ishidden.address = true;
      }
      if (/^1[35789]\d{9}$/.test(app.globalData.userInfo.phonenumber)) {
        ishidden.phonenumber = true;
      }
      this.setData({
        ishidden,
      });
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
    }},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // blurName: function (e) {
  //   this.setData({ name: wx.getStorageSync('name') });
  // },

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