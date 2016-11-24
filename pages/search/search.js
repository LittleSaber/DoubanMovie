const url = 'https://api.douban.com/v2/movie/search?q=';
Page({
	data:{
		start: 0,
		scrollHeight: 0,
		hidden: true,
    	noRes: true,
    	movieName: {},
    	hot: [],
    	title: {}
	},
	clickShow: function (event) {
	    wx.setStorageSync("movieId",event.currentTarget.id);
	    wx.navigateTo({
	      url: '../show/show',
	    })
	},
	onLoad: function () {
		this.setData({
			hidden: false
		});
	},
	onShow: function () {
		wx.getSystemInfo( {
	        success: ( res ) => {
	            this.setData( {
	                scrollHeight: res.windowHeight
	            })
	        }
	    })
	    this.setData({hidden: true});
	},
	getMovie: function (e) {
		this.setData({movieName: e.detail.value});
	},
	searchMovie: function (e) {
		this.setData({hidden: false});
		//发送ajax请求获取数据
		console.log(this.data.movieName);
	    var that = this;
	    fetch(url+this.data.movieName+'&start='+this.data.start+'&count=10').then(function(response) {
	      response.json().then(function (data) {
	        console.log(data);
	        that.setData({
	          hot: data.subjects,
	          hidden: true
	        })
	      })
	    });
	},
	lower: function () {
	    this.setData({
	        start: this.data.start + 10,
	        hidden: false
	    });
	    var that = this;
	    fetch(url+this.data.movieName+'&start='+this.data.start+'&count=10').then(function(response) {
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