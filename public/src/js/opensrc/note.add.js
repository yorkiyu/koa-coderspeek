define(function(require,exports,module){
    var $ = require('jquery');
	require("ajaxFileUpload");
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
	
	//editro module 
	var EditorModule = function(){
		var Editor = require("/src/js/common/editor.js"),
			editor = new Editor({
				id: "markdown",
				upload_url: "/api/upload/images?type=note"
			});
		var $editorFooter = $(constants.editorFooter);
		$editorFooter.find(".cancel").hide();
		$editorFooter.find(".save").addClass("disabled");
		var $title = $("#title"),
			$cover_image = $("#cover-image");
		function run(){
			createEditor();
			//redefine changehandler
			editor.changeHandler = function(){
				if(editor.value()){
					$editorFooter.find(".save").removeClass("disabled");	
				}else {
					$editorFooter.find(".save").addClass("disabled");	
				}			
			}

			//event agent 
			$editorFooter.bind("click",function(e){
				var target = e.target || e.srcElement;
				var $target = $(target);
				if($target.hasClass("save")){
					saveHandler($target);	
				}
			});
		}
		function saveHandler($target){
			if(!$title.val()){
				$title.focus();
				return;	
			}
			$cover_image.ajaxfileupload({
				params: {
					title: $title.val(),
					content: editor.value()
				},
				action: '/api/opensrc/note/add?proid='+base.getParam('proid'),
				onComplete: function(response){
					console.log(response);	
				},
				validate_extensions: true,
				valid_extensions : ['gif','png','jpg','jpeg'],
				submit_button :	$editorFooter.find(".save")	 
			});
		}
		function createEditor(){
            editor.createEditor(function(simplemde){
				$editorFooter.insertAfter(".editor-preview-side");	
            });	
        }
		function getProDesc(){
			return editor.value();	
		}
		return {
			run: run,
			createEditor: createEditor
		}
	}();
    //main module 
    var MainModule = function(){
        function run (){
			EditorModule.run();
			lazyload.push($(".img-box"));
            lazyload.emit();
        }
        return {
            run: run 
        }
    }();
    MainModule.run();
});
