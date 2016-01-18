var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Person = Services.Person;

exports.addLike = function *(){
    console.log(id);
    var _id = this.request.query['perid'];
    console.log(id);
    var data = yield Person.updateById(_id,{like: 100}); 
    console.log(data);
}


