var app = getApp()
Page({

  data: {
    status_one: [],
    status_two: [],
    status_alreadyreceived: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getsendingbill",
      success: function (res) {
        let billinfo = res.data.data;
        billinfo.forEach((info)=>{
          const dateObj = new Date(`${info.hope_time}+0800`);
          const date = dateObj.toLocaleDateString();
          const hour = dateObj.toLocaleTimeString();
          info.hope_time = `${date} ${hour}`;
        })
        that.setData({
          status_two: billinfo,
        });
        wx.stopPullDownRefresh();
        
      }
    }),
    app.request({
      url: "https://theeighthday.cn/getsendingbillnew",
      success: function (res) {
        let billinfo = res.data.data;
        billinfo.forEach((info) => {
          const dateObj = new Date(`${info.hope_time}+0800`);
          const date = dateObj.toLocaleDateString();
          const hour = dateObj.toLocaleTimeString();
          info.hope_time = `${date} ${hour}`;
        })
        that.setData({
          status_alreadyreceived: res.data.data,
        });
        wx.stopPullDownRefresh();
      }
    })
    app.request({
      url: "https://theeighthday.cn/getreceivingbill",
      success: function (res) {
        that.setData({
          status_one: res.data.data,
        });
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  confirmbill: function (e) {
    console.log(e.currentTarget.id);
    console.log("aaaa");
    var that = this;
    app.request({
      url: "https://theeighthday.cn/confirmbill",
      data: {
        "bill_id": e.currentTarget.id,
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == 1) {
          console.log("成功结束订单");
          wx.showToast({
            title: '成功',
          })
          setTimeout(function () {
            that.onLoad()
          }, 500)
        }
        else {
          wx.showToast({
            title: '失败',
          })

        }
      }
    })
  },
  confirmbill_receive: function (e) {
    console.log(e.currentTarget.id);
    console.log("bbbb");
    var that = this;
    app.request({
      url: "https://theeighthday.cn/confirmbill",
      data: {
        "bill_id": e.currentTarget.id,
      },
      success: function (res) {
        console.log(res)
        if (res.data.success == 1) {
          console.log("ok");
          wx.showToast({
            title: '成功',
          })
          setTimeout(function () {
            that.onLoad()
          }, 500)
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