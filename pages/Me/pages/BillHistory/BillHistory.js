var app = getApp()
Page({
  data: {
    histories:[]
  },
  onLoad: function (options) {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getsentbill",
      success: function (res) {
        console.log(res.data.data)
        let list = res.data.data;
        list.forEach((food) => {
          const dateObj = new Date(`${food.finished_at}+0800`);
          const date = dateObj.toLocaleDateString();
          const hour = dateObj.toLocaleTimeString();
          food.finished_at = `${date} ${hour}`;
          //console.log(food.finished_at);
        });
        that.setData({
          histories: res.data.data,
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
    this.onLoad();
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
  
  }
})