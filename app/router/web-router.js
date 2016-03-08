var route = require('koa-route');
var learning = require('../controllers/exp/learning');
var person = require('../controllers/daniel/person');
var project = require('../controllers/opensrc/project');
var note = require('../controllers/opensrc/note');
var sign = require('../controllers/sign/index');
var passport = require('koa-passport');

module.exports = function(app){
    //index
	app.use(route.get('/', person.index));

    //login
	app.use(route.get('/signout', sign.signout));
    app.use(route.get('/auth/github',
      passport.authenticate('github')
    ));
    app.use(route.get('/auth/github/callback',
      passport.authenticate('github', {
        successRedirect: 'back',
        failureRedirect: '/failed'
      })
    ));

    //daniel
	app.use(route.get('/daniel/list', person.index));
	app.use(route.get('/daniel/view/:id', person.view));

    //opensrc
	app.use(route.get('/opensrc/list', project.index));
	app.use(route.get('/opensrc/project/add', project.add));
	app.use(route.get('/opensrc/notelist/:id', note.index));
	app.use(route.get('/opensrc/note/add', note.add));
};

