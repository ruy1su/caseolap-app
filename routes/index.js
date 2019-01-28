var express = require('express');
var router = express.Router();

const assert = require('assert');
// MongoDB Set Up
var db;
const MongoClient = require('mongodb').MongoClient;
const dbName = 'caseolap';

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect("mongodb://localhost:27017", function (err, client) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");

	  db = client.db(dbName);
	  db.collection('article').find().toArray((err, result) => {
	    if (err) return console.log(err)
	    console.log(result[0])
	    res.render('index', {articles: result.slice(1, 100)})
	  })
	});
});

module.exports = router;
