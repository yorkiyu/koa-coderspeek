var route = require('koa-route');
var learning = require('../controllers/exp/learning');
var person = require('../controllers/daniel/person');

module.exports = function(app){
	app.use(route.get('/', learning.index));
	app.use(route.get('/person', person.index));
};

