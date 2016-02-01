var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Project = Services.Project;
var render = require("../../../common/render");

//list page controller
exports.index = function *(){
    var pageno = this.request.query.pageno;
	pageno = pageno || config.pageno;
	var page_size = config.page_size;
    
    //读取数据
    var data = yield Project.findAll(null,'name language starred visit_count like_count',{limit: config.page_size,skip: page_size * (pageno-1)});

    //读取模板
	this.body = yield render('opensrc/list',{
		data: data,
		Loader: loader,
		config: config,
		title: '开源项目-技术说',
		curpos: 'opensrc_list',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}


