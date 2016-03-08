var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Project = Services.Project;
var Language = Services.Language;
var render = require("../../../common/render");

//list page controller
exports.index = function *(){
    var lang = this.request.query.lang;
    var pageno = this.request.query.pageno;
	pageno = pageno || config.pageno;
	var page_size = config.page_size;
    //读取数据
    var where = lang?{language: lang}:null;
    var data = yield [
        Project.findAll(where,'name language starred visit_count like_count',{limit: config.page_size,skip: page_size * (pageno-1)}),
        Language.findAll(null,'name total')
    ];

    //读取模板
	this.body = yield render('opensrc/list',{
		listData: data[0],
        langData: data[1],
        path: '/opensrc/list',
        pos: lang,
		Loader: loader,
		config: config,
		title: '开源项目-技术说',
		curpos: 'opensrc_list',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}

//add project controller
exports.add = function *(){
    //读取模板
	this.body = yield render('opensrc/project_add',{
		Loader: loader,
		config: config,
		title: '添加开源项目-技术说',
		curpos: 'project_add',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}


