var Services = require("../../services");
var Person = Services.Person;

var render = require("../../../common/render");

exports.index = function *(){
    var data = yield Person.findAll();
	this.body = yield render('daniel/person',{data: data});	
}


