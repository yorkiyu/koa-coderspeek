var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Person = Services.Person;

var render = require("../../../common/render");

exports.index = function *(){
    var data = yield Person.findAll();
	this.body = yield render('daniel/person',{
		data: data,
		Loader: loader,
		config: config,
		title: '技术说-大牛'
	});	
}


