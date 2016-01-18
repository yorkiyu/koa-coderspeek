var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var render = require("../../../common/render");

exports.index = function *(){
	this.body = yield render('sign/login',{
		Loader: loader,
		config: config,
		title: '登陆/注册-技术说',
		curpos: 'sign'
	});	
}


