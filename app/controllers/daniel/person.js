var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Person = Services.Person;

var render = require("../../../common/render");
var markdown = require("../../../common/markdownHelper");

//list page controller
exports.index = function *(){
	var pageno = this.request.query.pageno;
	pageno = pageno || config.pageno;
	var page_size = config.page_size;
	//读取数据
    var data = yield Person.findAll(null,'name code followers visit_count like_count _id head_src',{limit: config.page_size,skip: page_size * (pageno-1)});
    
	//读取模板
	this.body = yield render('daniel/list',{
		data: data,
		Loader: loader,
		config: config,
		title: '大牛-技术说',
		curpos: 'daniel_list',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}

//view page controller
exports.view = function *(id){
	var data = yield Person.findById(id);

    //convert markdown to html
	data.introduction = markdown.markdown(data.introduction);

    //读取模板
	this.body = yield render('daniel/view',{
		data: data,
		Loader: loader,
		config: config,
		title: '',
		curpos: 'daniel_view',
		curuser: this.session && this.session.passport && this.session.passport.user
	});
}

