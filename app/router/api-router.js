var route = require('koa-route');
var person = require('../api/daniel/person');
var project = require('../api/opensrc/project');
var upload = require('../api/upload.js');

module.exports = function(app){
	app.use(route.post('/api/upload/images',upload.images));
	app.use(route.get('/api/daniel/person/addLike',person.addLike));
	app.use(route.get('/api/daniel/person/list',person.list));
	app.use(route.post('/api/daniel/person/saveintro',person.saveIntroduction));
	app.use(route.get('/api/daniel/person/intro',person.getIntroduction));

    //opensrc
	app.use(route.get('/api/opensrc/project/list',project.list));
	app.use(route.post('/api/opensrc/project/save',project.saveProject));
};
