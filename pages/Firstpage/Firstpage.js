var app = getApp()
Page({
  data:{
    foodlist: [],
    animation: '',
    animation1: ''
  },

  onShow: function() {
    this.getbill(true);
    this.animation = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 100,
      transformOrigin: 'top 0'
    })
    this.animation1 = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 100,
      transformOrigin: 'top 0 center 0 bottom 0'
    })
    this.animation.rotate(-3.5).step()
    this.setData({
      animation: this.animation.export()
    })
    var n=-1;
    setInterval(function () {
      // animation.translateY(-60).step()
      n = n*(-1);
      // k=(k+1)%2;
      // console.log(n);
      this.animation.rotate(7 * (n)).step()
      this.setData({
        animation: this.animation.export()
      })
      this.animation1.rotate(180 * (n)).step()
      this.setData({
        animation1: this.animation1.export()
      })
    }.bind(this), 310)
  },
 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '高校即时跑腿了解一下？',
      path: '/pages/Firstpage',
      imageUrl:'/logo.jpg',
    }
  },
  onPullDownRefresh :function(){
    this.getbill(true);
  },
  getbill: function () {
    var that = this;
    app.request({
      url: "https://theeighthday.cn/getbill",
      success: function (res) {
          if(res.data.success==1){
            console.log(res.data);
            that.setData({
              foodlist: res.data.data,
            });
            that.generateRandom();
            wx.stopPullDownRefresh();
            console.log(res.data);
          }
          else{
            console.info("获取订单失败");
          }
          
      },
      fail:function(){
        console.log("fail获取订单失败")

      }
    })
   
  },

  generateRandom: function() {
    var foodlist = this.data.foodlist;
    
    if (foodlist.length!=0){
      foodlist.forEach(function (item) {
        item.imagePath = '/image/' + (Number(item.hope_time.split(' ')[4].split(':')[0])%12+1).toString() + '.png';
      });
      this.setData({
        foodlist: foodlist,
      });
    }
  },
  play: function (event){
    var data = event.currentTarget.dataset;
    console.log(data);
    wx.navigateTo({ url: '../Detailinfo/Detailinfo?id=' + data.id + '&goal_address=' + data.goal_address + "&hope_time=" + data.hope_time + "&remark=" + data.remark
      + '&send_address=' + data.send_address + '&send_phonenumber=' + data.send_phonenumber + '&send_username=' + data.send_username})
  },
  linkorderstatus:function(){
    wx.navigateTo({
      url: '../OrderStatus/OrderSatus',
    })
  }
})
