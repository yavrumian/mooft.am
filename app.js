const {mongoose} = require('./dbconfig'),
    createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),

    port = process.env.PORT,
    app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//
//   // render the error page
//   res.status(err.status || 500);
//   res.send(err);
// });



app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server running on port: ${port}`);
})
