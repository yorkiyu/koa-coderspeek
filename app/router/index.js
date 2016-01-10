var apiRouter = require("./api-router");
var webRouter = require("./web-router");

module.exports = function(){
	return function(app){
		apiRouter(app);	
		webRouter(app);
	}
}();
