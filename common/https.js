var https = require("https");

exports.get = function (options){
	return new Promise(function(resolve,reject){
		https.get(options,function(res){
			var buffers = [],ret;
			res.on("data",function(chunk){
				buffers.push(chunk);	
			});
			res.on("end",function(){
				ret = Buffer.concat(buffers).toString();
				resolve(ret);
			});
		}).on("error",function(e){
			reject(false);	
		});
	});
}
