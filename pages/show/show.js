const url = "https://api.douban.com/v2/movie/subject/";
const url_casts = "https://api.douban.com/v2/movie/celebrity/"
Page({
  data:{
    info:{},
    hidden: false,
    movieId: {},
    casts: []
  },
  clickShow: function (event) {
    wx.setStorageSync("movieId",event.currentTarget.id);
    wx.navigateTo({
      url: '../show/show',
    })
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
        });
        // that.setData({casts: []});
        // var casts = res.data.casts;
        // for (var i = 0; i < casts.length; i++) {
        //   that.getCast(res.data.casts[i].id);
        // }
        that.setData({
            hidden: true,
            info: res.data
        });
      }
    })
  },
  // getCast: function (id) {
  //   var that = this;
  //   wx.request({
  //     url: url_casts + id,
  //     method: 'GET',
  //     header: {
  //       "Content-Type":"application/json"
  //     },
  //     success: function (res) {
  //       that.setData({
  //         casts: that.data.casts.concat(res.data)
  //       })
  //     }
  //   })
  // }
})