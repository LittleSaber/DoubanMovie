const url = "https://api.douban.com/v2/movie/subject/";
const url1 = "https://api.douban.com/v2/movie/celebrity/"
Page({
  data:{
    info:{},
    hidden: false,
    movieId: {}
  },
  onLoad: function () {
    var movieId = wx.getStorageSync("movieId");
    this.setData({movieId: movieId});
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: url + that.data.movieId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/json"
      }, // 设置请求的 header
      success: function(res){
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        that.setData({
            hidden: true,
            info: res.data
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})