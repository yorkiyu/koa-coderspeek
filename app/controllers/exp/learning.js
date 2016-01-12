var render = require("../../../common/render");

exports.index = function *(){
	this.body = yield render('exp/learning',{name: "ejs html engines"});	
}
