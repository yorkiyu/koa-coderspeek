var parse = require('co-busboy');
var path = require('path');
var fs = require('fs');
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
			if(extname == '.jpg' || extname == '.jpeg' || extname == '.png'){
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
			var stream = fs.createWriteStream(path.join(dir, file_name));
			part.pipe(stream);
		}	
	};
    this.body = {status: true,count: 0,data: result};
}
