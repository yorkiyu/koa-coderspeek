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
