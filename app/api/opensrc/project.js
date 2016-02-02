var Services = require("../../services");
var config = require("../../../config");
var auth = require("../../middlewares/auth");
var loader = require("loader");
var Project = Services.Project;

/*
	* 获取大牛列表数据，分页查询数据
	* @params {string} [pageno] page number
	* return null;
*/
exports.list = function *(){
	var pageno = this.request.query['pageno'];
	pageno = pageno ||  config.pageno;
	var page_size = config.page_size;
	
	this.type = 'json';
	//读取数据
    var data = yield Project.findAll(null,'name language starred visit_count like_count',{limit: config.page_size,skip: page_size * (pageno-1)});

	if(!data || data.length <= 0){
		this.body = JSON.stringify({status: false,count: 2,data:'Empty'});
	}else {
        var ret = {
            list: data,
            pageno: pageno
        };
		this.body = JSON.stringify({status: true,count: 0,data: ret});
	}
}

/*
    * 保存数据
    * @params {string} 
*/
exports.saveProject = function *(){
	this.type = 'json';
    //权限检查
	if(!auth.isAuth(this)){	
		this.body = JSON.stringify({status: false,count: 1,data:'Not Auth'});
		return;	
	}
    var project = yield Project.findOne({github_url: this.request.body.github_url},"_id");
    if(project){
	    this.body = JSON.stringify({status: false,count: 6,data:{id: project._id} });
        return;
    }
    var result = yield Project.insertOpensrc(this.request.body);
    if(result){
        this.body = JSON.stringify({status: true,count: 1,data: {id: result._id}});
    }else {
        this.body = JSON.stringify({status: false,count: 3,data: "Failed"});
    } 	
}
