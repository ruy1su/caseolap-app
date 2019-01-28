var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// MongoClient.connect("mongodb://localhost:27017", function (err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   db = client.db(dbName);

	// app.listen(process.env.PORT || 8080, () => {
	//     console.log('listening on 3000')
	// })
  // Initialize the app.
  // 	var server = app.listen(process.env.PORT || 3000, function () {
  //   var port = server.address().port;
  //   console.log("App now running on port", port);
  // });
  // client.close();
// });
var server = app.listen(process.env.PORT || 8080, function () {
var port = server.address().port;
    console.log("App now running on port", port);
});


// app.get('/', (req, res) => {
//   db.collection('article').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     console.log(result[0])
//     res.render('index', {articles: result.slice(1, 100)})
//   })
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// client.close();
module.exports = app;
