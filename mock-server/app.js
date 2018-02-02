var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');

var account = require('./routes/account');
var emp = require('./routes/emp');
var qualification = require('./routes/qualification');
var billingDetails = require('./routes/billingDetails');
var comm = require('./routes/comm');
var commBrand = require('./routes/commBrand');
var commCarton = require('./routes/commCarton');
var commMeasureSpec = require('./routes/commMeasureSpec');
var commTag = require('./routes/commTag');
var commUnit = require('./routes/commUnit');
var dist = require('./routes/dict');
var distributionscope = require('./routes/distributionscope');
var freightrules = require('./routes/freightrules');
var logistics = require('./routes/logistics');
var notification = require('./routes/notification');
var order = require('./routes/order');
var orderItem = require('./routes/orderItem');
var upload = require('./routes/upload');
var commCategory = require('./routes/commCategory');
var feedback = require('./routes/feedback');
var pay = require('./routes/pay');
var commInventory = require('./routes/commInventory');
var invoiceSetting = require('./routes/invoiceSetting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/*', function (req, res, next) {
    res.header("authentication", "eyJhbGciOiJIUzI1NiJ9.eyJsLWxldiI6IkhtYWNTSEEyNTYiLCJpc3MiOiJjNjA0NGU4YS01ODQ0LTExZTYtODY2My1hMDk5OWIwOGE3N2IiLCJleHAiOjE0OTEwMzMxMDIsImp0aSI6ImUwNDcyNGJmLWU0ODAtNGVkZS1iY2IxLTM3NjY0ZWFhYmFmNiJ9.5VnZ4nRpqKv6NC2QfggkjetTm2zAVVj5zZkPteHjBrQ");
    next();
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', account);
app.use('/emp', emp);
app.use('/account/qualification', qualification);
app.use('/billingDetails', billingDetails);
app.use('/comm', comm);
app.use('/commBrand', commBrand);
app.use('/commCarton', commCarton);
app.use('/commMeasureSpec', commMeasureSpec);
app.use('/commTag', commTag);
app.use('/commUnit', commUnit);
app.use('/dist', dist);
app.use('/distributionscope', distributionscope);
app.use('/freightrules', freightrules);
app.use('/logistics', logistics);
app.use('/notification', notification);
app.use('/order', order);
app.use('/orderItem', orderItem);
app.use('/upload', upload);
app.use('/commType',commCategory);

app.use('/feedback', feedback);
app.use('/pay', pay);
app.use('/commInventory', commInventory);
app.use('/invoiceSetting', invoiceSetting);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
