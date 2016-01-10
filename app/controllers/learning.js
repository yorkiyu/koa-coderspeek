var render = require("../../common/render");

exports.index = function *(){
	this.body = yield render('index',{name: "ejs html engines"});	
}
