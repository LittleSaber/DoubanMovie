const url = 'https://api.douban.com/v2/movie/coming_soon';
Page({
  data:{
    start: 0,
    scrollHeight: 0,
    hidden: false,
    noRes: true,
    hot:[]
  },
  clickShow: function (event) {
    wx.setStorageSync("movieId",event.currentTarget.id);
    wx.navigateTo({
      url: '../show/show',
    })
  },
  onLoad: function () {
    var that = this;
    fetch(url+'?start='+this.data.start+'&count=10').then(function(response) {
      response.json().then(function (data) {
        console.log(data);
        that.setData({
          hot: data.subjects,
          hidden: true
        })
      })
    });
    console.log('onLoad');
  },
  onShow: function () {
      wx.getSystemInfo( {
        success: ( res ) => {
            this.setData( {
                scrollHeight: res.windowHeight
            })
        }
      })
  },
  lower: function () {
    this.setData({
        start: this.data.start + 10,
        hidden: false
    });
    var that = this;
    fetch(url+'?start='+this.data.start+'&count=10').then(function(response) {
      response.json().then(function (data) {
        if (data.subjects.length == 0) {
          that.setData({
            hidden: true,
            noRes: false
          });
        }else {
          that.setData({
            hot: that.data.hot.concat(data.subjects),
            hidden: true
          });
        }
      })
    });
  },
  toastChange: function (event) {
    this.setData({noRes: true});
  }
})