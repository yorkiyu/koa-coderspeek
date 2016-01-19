var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Person = Services.Person;

var render = require("../../../common/render");

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
		curpos: 'daniel_list'
	});	
}


