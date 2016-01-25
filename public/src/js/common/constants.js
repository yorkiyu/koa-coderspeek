define(function(require,exports,module){
	var $ = require("jquery");
    module.exports = {
		//base
		goTopTips: '<div class="gotop-tips"><div class="container text-center"><i class="glyphicon glyphicon-lamp"></i>&nbsp;按下<strong>Ctrl+Space</strong>回到顶部</div><div class="cancel"><i class="glyphicon glyphicon-remove"></i></div></div>',

        more: '<div class="more">加载更多</div>',
        loading: '<div class="loading"><img src="/images/i_load.gif"/>&nbsp;&nbsp;加载中</div>',
        empty: '<div class="empty">没有更多内容</div>',
        errorImg: '<div class="error-img-wrap"><div class="img-wrap"><p><img src=""/></p><p>加载出错</p></div></div>',
		load_img: '<img src="/images/i_load.gif"/>',
		
		//editor
		editorHolder: '<div class="editor-holder"><img src="/images/i_load.gif"/>&nbsp;&nbsp;编辑器初始化中……</div>',
		editorFooter: '<div class="editor-footer"><div class="editor-btns"><div class="btn cancel">取消</div><div class="btn save">发布</div></div></div>', 

        projectType: {
            1:	'javascript',
            2: 'java',
            3: 'php',
            4: 'python',
            5: 'c++/c',
            6: 'css'
        },

		clientInfo: {
			width: $(window).width(),
			height: $(window).height()
		}
    }
});
