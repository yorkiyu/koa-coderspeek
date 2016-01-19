var route = require('koa-route');
var person = require('../api/daniel/person');
var project = require('../api/opensrc/project');

module.exports = function(app){
	app.use(route.get('/api/daniel/person/addLike',person.addLike));
	app.use(route.get('/api/daniel/person/list',person.list));
	app.use(route.get('/api/opensrc/project/list',project.list));
};
