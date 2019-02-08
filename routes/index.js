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
        console.log(result[0].PubDate.Year, result[0].MeshHeadingList)
        res.render('index', {articles: result.slice(1, 100)})
      })
    });
});

router.get('/chart', function(req, res, next) {
    MongoClient.connect("mongodb://localhost:27017", function (err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      db = client.db(dbName);
      db.collection('article').find().toArray((err, result) => {
        if (err) return console.log(err)
        var dic = {}
        for (i = 0; i < result.length; i++) { 
            var key = result[i].PubDate.Year
            if(key != ''){
                dic[key.toString()] = dic[key.toString()] ? dic[key.toString()] + 1 : 1
            }
        }
        console.log(Object.keys(dic), Object.values(dic))
        console.log(result[0].PubDate.Year, result[0].ArticleTitle)
        res.render('chart.jade', {key: Object.keys(dic), value: Object.values(dic)})
      })
    });
});

module.exports = router;
