const url = "https://api.douban.com/v2/movie/subject/";
Page({
  data:{
    info:{},
    hidden: false,
    movieId: {},
    casts: []
  },
  onLoad: function () {
    var movieId = wx.getStorageSync("movieId");
    this.setData({movieId: movieId});
  },
  onShow: function () {
    var that = this;
    fetch(url + this.data.movieId).then(function(response) {
      response.json().then(function (data) {
        //console.log(data);
        that.setData({
          info: data,
          hidden: true
        })
      })
    });
    console.log('onShow');
  }
})