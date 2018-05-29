var app = getApp()
Page({
  data:{
    foodlist: []
  },

  onShow: function() {
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
  play: function (event){
    var data = event.currentTarget.dataset;
    console.log(data);
    wx.navigateTo({ url: '../Detailinfo/Detailinfo?id=' + data.id + '&goal_address=' + data.goal_address + "&hope_time=" + data.hope_time + "&remark=" + data.remark
      + '&send_address=' + data.send_address + '&send_phonenumber=' + data.send_phonenumber + '&send_username=' + data.send_username})
  },
})
