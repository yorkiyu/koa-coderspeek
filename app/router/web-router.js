var route = require('koa-route');
var learning = require('../controllers/exp/learning');

module.exports = function(app){
	app.use(route.get('/', learning.index));
};

