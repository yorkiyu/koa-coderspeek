var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Project = Services.Project;
var render = require("../../../common/render");

exports.index = function *(){
    var data = yield Project.findAll();
	this.body = yield render('opensrc/list',{
		data: data,
		Loader: loader,
		config: config,
		title: '开源项目-技术说',
		curpos: 'opensrc_list'
	});	
}


