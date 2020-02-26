const express = require('express');
const fetch = require('node-fetch');

const app = express();

var path = require('path');

app.use(express.static(__dirname));


function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d]._id == id) {
            return arr[d];
       }
    }
}

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

app.get("/GetMany", (req, res, next) => {
	fetch('https://next.json-generator.com/api/json/get/EkzBIUWNL')
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		res.json(json);
	});
	
});


app.get("/GetSingle", (req, res, next) => {
	fetch('https://next.json-generator.com/api/json/get/EkzBIUWNL')
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		res.json(getById(json, req.query.id));
	});
	
});


app.get('/', function(req, res) {
    res.render('product.html');
});

module.exports = app;