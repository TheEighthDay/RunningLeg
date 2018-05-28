var app = getApp()
Page({
  data:{
    foodlist: []
  },

  onLoad: function() {
    this.getbill(true);
  },
  onPullDownRefresh :function(){
    this.getbill(true);
  },
  getbill: function (isFirstIn) {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getbill",
      success: function (res) {
          length = res.data.length;
          that.setData({
            foodlist: res.data.data,
          });
          if(isFirstIn) {
            that.generateRandom();
          }
          wx.stopPullDownRefresh();
          console.log(res.data);
      }
    })
   
  },

  generateRandom: function() {
    var foodlist = this.data.foodlist;
    foodlist.forEach(function(item) {
      item.imagePath = '/image/' + Math.ceil(12 * Math.random()) + '.png';
    });
    this.setData({
      foodlist: foodlist,
    });
  },
})
