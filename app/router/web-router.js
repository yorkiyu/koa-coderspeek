var route = require('koa-route');
var learning = require('../controllers/learning');

module.exports = function(app){
	app.use(route.get('/', learning.index));
};

