var config = require('./config.js');
var klogger = require('koa-logger');
var logger = require('./common/logger');
var router = require('./app/router'); 
require("./app/middlewares/mongoose_log");
require("./app/models");
var koa = require('koa');
var app = koa();

app.use(klogger());

//route 
router(app);

app.listen(config.port,function(){
	logger.info('Coderspeek listening on port', config.port);
	logger.info('God bless love....');
	logger.info('You can debug your app with http://' + config.host + ':' + config.port);
	logger.info('');
});


