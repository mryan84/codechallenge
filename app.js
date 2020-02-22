const express = require('express');
const fetch = require('node-fetch');

const app = express();


function getById(arr, id) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
		//console.log('id being looked for is ' + id + ' and being compared to parsed json array value of ' + arr[d]._id);
        if (arr[d]._id == id) {
            return arr[d];
       }
    }
}

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

module.exports = app;