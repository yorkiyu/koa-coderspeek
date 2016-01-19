var models = require('../../models');
var Project = models.Project;

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
    return Project.find(conditions,fields,options).exec();
}
