var parse = require('co-busboy');

//图片上传服务端接收
exports.images = function *(){
	var extname;
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
	var part,file_name;
	while (part = yield parts) {
		file_name = Math.random().toString()+extname
		var stream = fs.createWriteStream(path.join(__dirname,'upload', file_name));
		part.pipe(stream);
		console.log('uploading %s -> %s', part.filename, stream.path);
	}
	this.type = 'text/html';
	var data = JSON.stringify({
		status: true,
		count: 0,
		data: 'http://localhost:3000/'+file_name 
	});
	this.body = '<div id="result">'+data+'</div>';
}
