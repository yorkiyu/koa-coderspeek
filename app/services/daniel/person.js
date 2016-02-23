var models = require('../../models');
var Person = models.Person;

/* 
	* 根据条件获取数据
	* @param {Object} conditions
	* @param {Object} [fields] optional fields to return (http://bit.ly/1HotzBo)
	* @param {Object} [options] optional
	* return promise;
 */
exports.findAll = function(conditions,fields,options){
	conditions = conditions || null;
	fields = fields || null;
	options = options || null;
    return Person.find(conditions,fields,options).exec();
}

exports.findById = function(id,fields){
	return Person.findById(id,fields).exec();
}
exports.updateById = function(id,update){
    return Person.findByIdAndUpdate(id,update).exec();    
}

