define(function(require,exports,module){
    var $ = require('jquery');
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
    var baidu_t = require('/lib/baidu/1.0.5/baiduTemplate.js');    
    baidu_t.template.LEFT_DELIMITER='<?';
    baidu_t.template.RIGHT_DELIMITER='?>';
    
    var $content_panel = $("#content-panel");
    
    //load more data module
    var ListModule = function(){
        var list_item_tpl = $("#list-item-tpl").html(),
            $load_more_wrap = $("#load-more-wrap");
            pageno = 2,isRequesting = false, isEmpty = false;
        function run(){
            $load_more_wrap.bind('click',function(){
                nextPage(); 
            }); 
        } 
        function nextPage(){
            service(); 
        } 
        function service(){
            if(isRequesting || isEmpty){
                return; 
            } 
            isRequesting = true;
            $load_more_wrap.html(constants.loading);
            $.ajax({
                type: 'get',
                url: '/api/opensrc/project/list?pageno='+pageno,
                dataType: 'json',
                success: function(ret){
                    if(!ret.status){
                        $load_more_wrap.html(constants.empty);
                        isEmpty = true;
                    }else {
                        pageno = parseInt(ret.data.pageno) + 1;
                        var html = createWidget(ret.data); 
                        var $html = $(html);
                        $content_panel.append($html);
                        lazyload.push($html.find('.img-box'));
                        lazyload.emit();
                        $load_more_wrap.html(constants.more);
                    }
                    isRequesting = false;
                },
                error: function(ret){
                    $load_more_wrap.html(constants.empty);
                    isEmpty = true;
                }
            });
        } 
        function createWidget(data){
            var html = baidu_t.template(list_item_tpl,data);
            return html;
        }
        return {
            run: run,
            nextPage: nextPage 
        }
    }();
	//add module
	var AddModule = function(){
		var $aside_wrap = $("#aside-wrap"),
			$container = $("#container"),
            $add_layer = $("#add-layer"),
            $github_input = $add_layer.find("#github-url"),
            $info_wrap = $add_layer.find(".info-wrap");	
        var result = {},
            isSaving = false;
		function run(){
			setTimeout(function(){
				$aside_wrap.css({
					left: (base.clientInfo.width - $container.width()) / 2 + $container.width() + 10 + "px",
					visibility: "visible"
				});	
			},2500);
            $(window).bind("resize",function(){
                $aside_wrap.css({
					left: ($(window).width() - $container.width()) / 2 + $container.width() + 10 + "px"
				});	
            });
            $aside_wrap.find(".add").bind("click",function(){
                if(!login.isAuth()){
                    login.loginEmit();
                    return;
                }
                $add_layer.removeClass("hide")
                .addClass("show"); 
            });
            //event agent
            $add_layer.bind("click",function(e){
                var target = e.target || e.srcElement;
                var $target = $(target);
                if($target.hasClass("fetch")){
                    fetchHandler($target); 
                }else if($target.hasClass("save")){
                    saveHandler($target); 
                }else if($target.hasClass("add-layer") || $target.hasClass("close") || $target.parents(".close").length > 0){
                    closeHandler($target); 
                }     
            });
		}
        function closeHandler(){
            $add_layer.removeClass("show").addClass("hide");
            resetInfo(); 
            $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
            $add_layer.find(".save").addClass("disabled");
            $add_layer.find(".message").remove("text-danger").removeClass("text-success").html("");
            $github_input.val("");
        }
        function saveHandler($target){
            if($target.hasClass("disabled") || isSaving){
                return; 
            } 
            if(!result){
                return; 
            }
            isSaving = true;
            $target.html(constants.load_img);
            $.ajax({
                type: "post",
                url: "/api/opensrc/project/save",
                data: result,
                dataType: "json",
                success: function(ret){
                    if(!ret.status){
                        if(ret.count == 1){
                            $target.siblings(".message").addClass("text-danger").html("没有权限,请先登陆！");
                        }else if(ret.count == 6){
                            $target.siblings(".message").addClass("text-danger").html('已经存在，<a href="/opensrc/notelist/'+ret.data.id+'">点击查看</a>');
                            $target.addClass("disabled");
                            resetInfo();
                            $github_input.val("");
                            $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
                        }else{
                            $target.siblings(".message").addClass("text-danger").html("操作失败，请重试！"); 
                        }
                    }else {
                        $target.siblings(".message").addClass("text-success").html('保存成功，<a href="/opensrc/notelist/'+ret.data.id+'">点击查看</a>');
                        resetInfo();
                        $github_input.val("");
                        $target.addClass("disabled");
                        $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
                    }
                    isSaving = false;
                    $target.html("保存");
                },
                error: function(ret){
                    isSaving = false;
                    $target.html("保存");
                }
            });
        }
        function resetInfo (){
            $info_wrap.find("li:eq(0) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(1) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(2) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(3) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(4) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(5) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(6) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(7) span:eq(1)").text("-"); 
            $info_wrap.find("li:eq(8) span:eq(1)").text("-"); 
            result = {};
        }
        function fetchHandler($target){
            var url = $github_input.val();
            if(!url){
                $github_input.focus();
                return; 
            }
            url = url.replace(/https:\/\/[^\/]+/,"https://api.github.com/repos");
            resetInfo();
            $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
            $add_layer.find(".save").addClass("disabled");
            $add_layer.find(".message").remove("text-danger").removeClass("text-success").html("");
            $target.html(constants.load_img);
            $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                success: function(data){
                    if(!data.id){
                        $target.html("拉取数据");
                        $add_layer.find(".ret").addClass("text-danger").html("失败,地址错误！")
                        return; 
                    }
                    $info_wrap.find("li:eq(0) span:eq(1)").text(data.owner.login); 
                    $info_wrap.find("li:eq(1) span:eq(1)").text(data.name); 
                    $info_wrap.find("li:eq(2) span:eq(1)").text(data.stargazers_count); 
                    $info_wrap.find("li:eq(3) span:eq(1)").text(data.watchers_count); 
                    $info_wrap.find("li:eq(4) span:eq(1)").text(data.forks_count); 
                    $info_wrap.find("li:eq(5) span:eq(1)").text(data.language); 
                    $info_wrap.find("li:eq(6) span:eq(1)").text(data.html_url); 
                    $info_wrap.find("li:eq(7) span:eq(1)").text(data.homepage); 
                    $info_wrap.find("li:eq(8) span:eq(1)").text(data.description); 

                    result.author = data.owner.login;
                    result.name = data.name;
                    result.starred = data.stargazers_count;
                    result.watchers = data.watchers_count;
                    result.forks = data.forks_count;
                    result.language = data.language;
                    result.github_url = data.html_url;
                    result.home = data.homepage;
                    result.description = data.description;

                    $target.html("拉取数据");
                    $add_layer.find(".ret").addClass("text-success").html("拉取成功！");
                    $add_layer.find(".save").removeClass("disabled");

                },
                error: function(){
                    $target.html("拉取数据");
                    $add_layer.find(".ret").addClass("text-danger").html("失败，地址错误或网络问题！")
                }
            });
        }
		return {
			run:run	
		}
	}();
    //main module
    var MainModule = function(){
        function run(){
            //execute list module
            ListModule.run();
			AddModule.run();
            agent();
            //load img
            lazyload.push($(".img-box"));
            lazyload.emit();
        } 
        function agent(){
            //event agent
            $content_panel.bind("click",function(e){
                var target = e.target || e.srcElement,
                    $target = $(target);
            });
        }
        run();
    }();

});
