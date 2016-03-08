var Services = require("../../services");
var config = require("../../../config");
var auth = require("../../middlewares/auth");
var loader = require("loader");
var Note = Services.Note;

exports.add = function *(){
	//权限检查
	if(!auth.isAuth(this)){	
		this.type = 'json';
		this.body = {status: false,count: 1,data:'Not Auth'};
		return;	
	}

	var proid = this.query.proid;
	if(!proid){
        this.body = {status: false,count: 0,data: "Invalid Arguments"};
		return;	
	}
	var postData = {
		title: this.request.body.title,
		content: this.request.body.content
	};
	console.log(postData);
    this.body = {status: true,count: 0,data: postData};
}
