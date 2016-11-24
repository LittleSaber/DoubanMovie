var Api = {
	fetchApi : function(params) {
    fetch(params.API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'start': params.data.start,
        'count': params.data.count
      }
    }).then(function(response) {
      response.json().then(function (data) {
        console.log(data);
      })
    });
  }
}

module.exports = Api;