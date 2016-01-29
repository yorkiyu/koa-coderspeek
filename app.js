require("colors");
var config = require('./config.js');
var klogger = require('koa-logger');
var logger = require('./common/logger');
var router = require('./app/router'); 
var kstatic = require('koa-static');
var bodyParser = require('koa-bodyparser'); 
var passport = require('koa-passport');
var favicon = require('koa-favicon');
var path = require('path');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
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

app.use(bodyParser());

//set cookie sign
app.keys = config.cookie_sign;
app.use(session({
    key: config.cookie_name,
    store: redisStore()
}));

//auth
require('./app/controllers/sign/auth');
app.use(passport.initialize());
app.use(passport.session());


//route 
router(app);

app.listen(config.port,function(){
	logger.info('Coderspeek listening on port', config.port);
	logger.info('God bless love....');
	logger.info('You can debug your app with http://' + config.host + ':' + config.port);
	logger.info('');
});


