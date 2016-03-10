var parse = require('co-busboy');
var path = require('path');
var logger = require('../../common/logger');
var auth = require("../middlewares/auth");
var fs = require('fs');
var config = require("../../config");
var koaImage = require("koa-image");

//图片上传服务端接收
exports.images = function *(){
	//权限检查
	if(!auth.isAuth(this)){	
		this.type = 'json';
		this.body = JSON.stringify({status: false,count: 1,data:'Not Auth'});
		return;	
	}
	var extname,
        type = this.request.query['type'];
	var parts = parse(this,{
		autoFields: true,
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

	var part,dimensions,dir = path.join(__dirname,'../../','upload',type);
	while (part = yield parts) {
        var file_name =  new Date().getTime()+extname;
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir); 
        }
        var stream = fs.createWriteStream(path.join(dir, file_name));
        part.pipe(stream);
        logger.info('uploading %s -> %s', part.filename, stream.path);
	}

    var dimensions = yield koaImage.getSize(path.join(dir,file_name));
    var url_query = "?img_w="+dimensions.width+"&img_ratio="+(dimensions.height/dimensions.width);

	this.type = 'text/html';
	var data = JSON.stringify({
		status: true,
		count: 0,
		data: path.join('/',type,file_name+url_query) 
	});
	this.body = '<div id="result">'+data+'</div>';
}
