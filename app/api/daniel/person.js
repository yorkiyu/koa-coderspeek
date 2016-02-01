var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Person = Services.Person; 
var auth = require("../../middlewares/auth");
var _ = require("lodash");
/*	
	* 点赞，对应记录like_count值加1
	* @params {string} perid id
	* return null;
*/
exports.addLike = function *(){
    var _id = this.request.query['perid'];
	
	//定义返回数据类型	
	this.type = 'json';

	if(!_id){
		this.body = JSON.stringify({status: false,count: 0,data:'Invalid Params'});
	}

	//获取当前记录的like_count
	var data = yield Person.findById(_id,'like_count');
		
	if(!data){
		this.body = JSON.stringify({status: false,count: 2,data:'Does Not Exist'});
		return;
	}

	//将当前记录的like_count加1
    var ret = yield Person.updateById(_id,{like_count: data.like_count+1}); 
	if(ret){
		this.body = JSON.stringify({status: true,count: 0,data:'Success'});
		return;
	}
	this.body = JSON.stringify({status: false,count: 3,data:'Failed'});
}

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
    var data = yield Person.findAll(null,'name code followers visit_count like_count _id head_src',{limit: config.page_size,skip: page_size * (pageno-1)});
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
	* 简介保存
	* @param {Object} introduction
	* return promise
*/
exports.saveIntroduction = function *(){
	//权限检查
	if(!auth.isAuth(this)){
		this.type = 'json';
		this.body = JSON.stringify({status: false,count: 1,data:'Not Auth'});
		return;	
	}
	var _id = this.query["id"];

	//查看id是否存在
	if(!_id){
		this.body = JSON.stringify({status: false,count: 0,data:'Invalid Params'});
		return;
	}
	
    //post数据
	var data = this.request.body; 

	//数据检测合法性
	try{	
		if(!_.has(data,"html") || !_.has(data,"markdown")){
			throw new Error('Catch me');
		}
		data = JSON.stringify(data);	
	}catch(e){
		this.body = JSON.stringify({status: false,count: 0,data:'Invalid Data'});
		return;
	}

	//跟新introduction的值
	try{
		var ret = yield Person.updateById(_id,{introduction: data}); 
		if(ret){
			this.body = JSON.stringify({status: true,count: 0,data:'Success'});
			return;
		}
		throw new Error('Catch me');
	}catch(e){
		this.body = JSON.stringify({status: false,count: 3,data:'Failed'});
	}
}


