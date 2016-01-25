var parse = require('co-busboy');
var path = require('path');
var fs = require('fs');
var config = require("../../config");
var sizeOf = require('image-size');

//图片上传服务端接收
exports.images = function *(){
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
        fs.exists(dir,function(exists){
            if(!exists){
                fs.mkdir(dir,function(){
                    var stream = fs.createWriteStream(path.join(dir, file_name));
                    part.pipe(stream);
                    console.log('uploading %s -> %s', part.filename, stream.path);
                });  
            }else {
                var stream = fs.createWriteStream(path.join(dir, file_name));
                part.pipe(stream);
                console.log('uploading %s -> %s', part.filename, stream.path);
            } 
        });
	}
    sizeOf(path.join(dir,file_name),function(err,dimensions){
        var url_query = "?img_w="+dimensions.width+"&img_ratio="+(dimensions.height/dimensions.width);
        console.log(url_query);
    });
	this.type = 'text/html';
	var data = JSON.stringify({
		status: true,
		count: 0,
		data: path.join('/',type,file_name) 
	});
	this.body = '<div id="result">'+data+'</div>';
}
