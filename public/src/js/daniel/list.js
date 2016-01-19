define(function(require,exports,module){
	var $ = require('jquery');
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
    var baidu_t = require('/lib/baidu/1.0.5/baiduTemplate.js');    
    baidu_t.template.LEFT_DELIMITER='<?';
    baidu_t.template.RIGHT_DELIMITER='?>';
    
    var $content_panel = $("#content-panel");

    //like module
    var LikeModule = function(){ 
        function clickAction(e,$target){
            if(!$target.hasClass('icon-thumbs-up')){
                return; 
            }
            e.stopPropagation();
            $target.removeClass('icon-thumbs-up');
            (function($target){
                var data_count = parseInt($target.attr('data-count'))+1,
                    timer;
                var temp_count = data_count - 7 < 0 ? 0 : data_count - 7;
                timer = setInterval(function(){
                    $target.text(++temp_count);
                    if(temp_count >= data_count){
                        clearInterval(timer); 
                        setTimeout(function(){
                            $target
							.attr('data-count',$target.text())
							.text('')
                            .addClass('icon-thumbs-up');
                        },1200); 
                    } 
                },1000/60);
            })($target);
            addService($target);
        }
        function addService($target){
			var person_id = $target.attr('data-id');
            $.ajax({
                type: 'get',
                url: '/api/daniel/person/addLike?perid='+person_id,
                dataType: 'json',
                success: function(data){
                },
                error: function(data){
                
                }
            }); 
        } 
        return {
            clickAction: clickAction 
        }
    }();

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
                url: '/api/daniel/person/list?pageno='+pageno,
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
    
    //main module
    var MainModule = function(){
        function run(){
            //execute list module
            ListModule.run();
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
                if($target.hasClass('like-wrap')){
                    LikeModule.clickAction(e,$target); 
                }else {
                
                }   
            });
        }
        run();
    }();
 });
