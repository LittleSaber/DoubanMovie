const url = 'https://api.douban.com/v2/movie/in_theaters';
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
    wx.request({
      url: url,
      data: {
        start: that.data.start,
        count: 10
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/json"
      }, // 设置请求的 header
      success: function(res){
        that.setData({
          hot:res.data.subjects,
          hidden:true
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
      var that = this;
      this.setData({
          start: this.data.start + 10,
          hidden: false
      });
      wx.request({
      url: url,
      data: {start: that.data.start},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/json"
      }, // 设置请求的 header
      success: function(res){
        if (res.data.subjects.length == 0) {
          that.setData({
            hidden: true,
            noRes: false
          });
        }else {
          that.setData({
            hot: that.data.hot.concat(res.data.subjects),
            hidden: true
          });
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toastChange: function (event) {
    this.setData({noRes: true});
  }
})