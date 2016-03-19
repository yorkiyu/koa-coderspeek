var parse = require('co-busboy');
var path = require('path');
var fs = require('fs');
var Services = require("../../services");
var config = require("../../../config");
var auth = require("../../middlewares/auth");
var loader = require("loader");
var Note = Services.Note;
var koaImage = require("koa-image");

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
	var extname;
	var parts = parse(this,{
		checkField: function (name, value) {
			if (name === '_csrf' && !checkCSRF(ctx, value)) {
				var err =  new Error('invalid csrf token')
				err.status = 400
				return err
			}
		},
		checkFile: function(fieldname,file,filename){
			extname = path.extname(filename);
			if(extname == '.jpg' || extname == '.jpeg' || extname == '.png' || !filename){
			}else {
				var err = new Error("invalid file format");	
				err.status = 400;
				return err;
			}	
		}
	});
	var part,result={},
		dir = path.join(__dirname,'../../../','upload','note');
	while (part = yield parts){
		if(part.length){
			result[part[0]] = part[1];	
		}else {
			var file_name =  new Date().getTime()+extname;
			if(!fs.existsSync(dir)){
				fs.mkdirSync(dir); 
			}
			result['img_src'] = path.join(dir, file_name);
			var stream = fs.createWriteStream(result.img_src);
			part.pipe(stream);
		}	
	};
	if(extname){
		var dimensions = yield koaImage.getSize(result.img_src);
		result.img_src = result.img_src+"?img_w="+dimensions.width+"&img_ratio="+(dimensions.height/dimensions.width).toFixed(6);
	}
	result.user_id = this.session.passport.user._id;
	result.project_id = proid;
	result = yield	Note.insertNote(result); 
    this.body = {status: true,count: 0,data: result._id};
}

exports.getInstruct = function *(){
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
	var data = yield Note.findOne({_id: proid},"_id content");
	if(data){
		this.body = {status: false,count: 2,data: "Empty data!"};	
	}else {
		this.body = {status: true,count: 2,data: data};	
	}		

}
