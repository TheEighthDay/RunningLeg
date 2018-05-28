var app = getApp()
Page({
  data:{
    foodlist: [
      {
        id: "1",
        imagePath: "/image/1.png",
      },
      {
        id: "2",
        imagePath: "/image/2.png",
      },
      {
        id: "3",
        imagePath: "/image/3.png",
      },
      {
        id: "4",
        imagePath: "/image/4.png",
      },
      {
        id: "5",
        imagePath: "/image/5.png",
      },
      {
        id: "6",
        imagePath: "/image/6.png",
      },
      {
        id: "7",
        imagePath: "/image/7.png",
      }
    ],
    length : 0
  },

  getbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getbill",
      success: function (res) {
          length = res.data.length
          console.log(res.data);
      }
    })
   
  }
})
