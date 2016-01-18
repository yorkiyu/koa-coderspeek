var route = require('koa-route');
var person = require('../api/daniel/person');

module.exports = function(app){
	app.use(route.get('/api/daniel/person/addLike',person.addLike));
};
