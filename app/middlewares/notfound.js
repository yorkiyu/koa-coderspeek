var render = require("../../common/render");
var config = require('../../config.js');
var loader = require("loader");

exports.error = function *(next){
	yield next;
	if (404 != this.status) return;
	// we need to explicitly set 404 here
	// so that koa doesn't assign 200 on body=
	this.status = 404;

	switch (this.accepts('html', 'json')) {
	case 'html':
	  this.type = 'html';
	  this.body = yield render('404',{
		Loader: loader,
		config: config,
		title: '404-技术说',
		curpos: '404'
	  });
	  break;
	case 'json':
	  this.body = {
		message: 'Page Not Found'
	  };
	  break;
	default:
	  this.type = 'text';
	  this.body = 'Page Not Found';
	}

}
