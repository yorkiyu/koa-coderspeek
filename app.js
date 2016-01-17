require("colors");
var config = require('./config.js');
var klogger = require('koa-logger');
var logger = require('./common/logger');
var router = require('./app/router'); 
var kstatic = require('koa-static');
var favicon = require('koa-favicon');
var path = require('path');
var koa = require('koa');
require("./app/middlewares/mongoose_log");
require("./app/models");

var app = koa();
app.use(klogger());

//favicon 
app.use(favicon(__dirname+'/favicon.ico'));

//load static file
app.use(kstatic(path.join(__dirname,'upload')));
app.use(kstatic(path.join(__dirname,'public')));

//route 
router(app);

app.listen(config.port,function(){
	logger.info('Coderspeek listening on port', config.port);
	logger.info('God bless love....');
	logger.info('You can debug your app with http://' + config.host + ':' + config.port);
	logger.info('');
});


