var route = require('koa-route');
var learning = require('../controllers/exp/learning');
var person = require('../controllers/daniel/person');
var project = require('../controllers/opensrc/project');

module.exports = function(app){
	app.use(route.get('/', learning.index));
	app.use(route.get('/daniel/list', person.index));
	app.use(route.get('/opensrc/list', project.index));
};

