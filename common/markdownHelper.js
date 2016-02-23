/*!
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var MarkdownIt = require('markdown-it');
var validator  = require('validator');
var jsxss      = require('xss');

// Set default options
var md = new MarkdownIt();

md.set({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  linkify:      true,        // Autoconvert URL-like text to links
  typographer:  true,        // Enable smartypants and other sweet transforms
});

md.renderer.rules.fence = function (tokens, idx) {
  var token    = tokens[idx];
  var language = token.info && ('language-' + token.info) || '';
  language     = validator.escape(language);

  return '<pre class="prettyprint ' + language + '">'
    + '<code>' + validator.escape(token.content) + '</code>'
    + '</pre>';
};

md.renderer.rules.code_block = function (tokens, idx /*, options*/) {
  var token    = tokens[idx];

  return '<pre class="prettyprint">'
    + '<code>' + validator.escape(token.content) + '</code>'
    + '</pre>';
};
md.renderer.rules.image = function(tokens,idx){
    var token = tokens[idx];
    return '<span class="img-wrap">'
        + '<span class="img-box" data-src="'+token['attrs'][0][1]+'">'  
        + '<span class="img-holderplace" title="技术说"><i class="glyphicon glyphicon-picture"></i></span>'
        + '</span></span>';
}
var myxss = new jsxss.FilterXSS({
  onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
    // 让 prettyprint 可以工作
    if (tag === 'pre' && name === 'class'
        || tag === 'span' && name === 'class'
        || tag === 'span' && name === 'data-src') {
      return name + '="' + jsxss.escapeAttrValue(value) + '"';
    }
  }
});

exports.markdown = function (text) {
    var ret = myxss.process(md.render(text || '')); 
    if(text){
        ret = '<div class="markdown-text">' + ret + '</div>';
    }
    return ret;
};

exports.escapeSignature = function (signature) {
  return signature.split('\n').map(function (p) {
    return _.escape(p);
  }).join('<br>');
};

exports.staticFile = function (filePath) {
  if (filePath.indexOf('http') === 0 || filePath.indexOf('//') === 0) {
    return filePath;
  }
  return config.site_static_host + filePath;
};

