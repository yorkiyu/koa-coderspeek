var route = require('koa-route');
var learning = require('../controllers/exp/learning');
var person = require('../controllers/daniel/person');
var project = require('../controllers/opensrc/project');
var note = require('../controllers/opensrc/note');
var sign = require('../controllers/sign/index');

module.exports = function(app){
	app.use(route.get('/', learning.index));
	app.use(route.get('/sign/login', sign.index));
	app.use(route.get('/daniel/list', person.index));
	app.use(route.get('/daniel/view/:id', person.view));
	app.use(route.get('/opensrc/list', project.index));
	app.use(route.get('/opensrc/notelist/:id', note.index));
};

