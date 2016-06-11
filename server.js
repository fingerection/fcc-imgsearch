var express = require('express');
var app = express();
var request = require('request');


app.get('/api/imagesearch/:keyword', function (req, res) {
	var keyword = req.params.keyword;
	var offset = req.query.offset || 0;
	
	var options = {
	  url: 'https://bingapis.azure-api.net/api/v5/images/search?q=' + keyword + '&count=10&offset=' + offset + '&mkt=en-us&safeSearch=Moderate',
	  headers: {
	    'Ocp-Apim-Subscription-Key': '15dffee3458d4e68b70261866eed7481'
	  },
	  json:true
	};
	
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var resultArray = [];
	  	for(var i=0; i<body.value.length; i++) {
	  		var item = body.value[i];
	  		var result = {
	  			"url": item.contentUrl,
		  		"snippet": item.name,
		  		"thumbnail": item.thumbnailUrl,
		  		"context": item.hostPageDisplayUrl};
			resultArray.push(result);
	  	}
	  	
	  	res.send(JSON.stringify(resultArray));
	    //console.log(body) // Show the HTML for the Google homepage.
	  }
	})
	
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Example app listening on port'+port);
});