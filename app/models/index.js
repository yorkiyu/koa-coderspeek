var mongoose = require('mongoose');
var config   = require('../../config');
var logger = require('../../common/logger');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

//models
require('./daniel/person');
require('./opensrc/project');
require('./opensrc/note');
require('./opensrc/language');
require('./user');
exports.Person = mongoose.model('Person');
exports.Project = mongoose.model('Project');
exports.Note = mongoose.model('Note');
exports.Language = mongoose.model('Language');
exports.User = mongoose.model('User');
exports.mongoose = mongoose;





