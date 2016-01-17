define(function(require,exports,module){
	var $ = require('jquery');
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
	lazyload.push($(".img-box"));
	lazyload.emit();
});
