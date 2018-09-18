function write_title(title,sub_titile){
    $("#page_title").empty();
    $("#page_title").append("<h3>"+title+" <small>"+sub_titile+"</small></h3>");
}
function active_menu(id){
    $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    $SIDEBAR_MENU.find('li').each(function () {
        $(this).removeClass('current-page');
    });
    $SIDEBAR_MENU.find('a[id="' + id + '"]').parent('li').addClass('current-page');
}
(function($,sr){
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

$(document).ready(function() {
    console.log("GetLocaltion.js is Start");
});



function modal_middle(modal){
    if(!$BODY.hasClass('nav-md')){
        $MENU_TOGGLE.click();}

    setTimeout(function () {
        var _modal = $(modal).find(".modal-dialog");
        if(parseInt(($(window).height() - _modal.height())/2)>0){

            _modal.animate({'margin-top': parseInt(($(window).height() - _modal.height())/2)}, 300 );
        }
    },wait_time_short);
}

function show_alarm_module(ifalarm,text,callback){
    if(ifalarm){
        $("#UserAlertModalLabel").text("警告");
        $("#UserAlertModalContent").empty();
        $("#UserAlertModalContent").append("<strong>警告！</strong>"+text);
    }else{
        $("#UserAlertModalLabel").text ("通知");
        $("#UserAlertModalContent").empty();
        $("#UserAlertModalContent").append("<strong>通知：</strong>"+text);
    }
    modal_middle($('#UserAlarm'));
    $('#UserAlarm').modal('show');
    if(callback===null){
        emptyfunction = function(){};
        $('#UserAlarm').on('hide.bs.modal',emptyfunction);
    }else{
        var countevent = 0 ;
        $('#UserAlarm').on('hide.bs.modal',function(){ if(++countevent==1){setTimeout(callback, 500);}});
    }
}

function PageInitialize(){
    get_user_information();
}
function get_user_information(){
    var session = getQueryString("session");
    var body = {
        session: session
    };
    var map={
        action:"UserInfo",
        type:"query",
        body: body,
        user:"null"
    };
    var get_user_information_callback = function(result){
        var ret = result.status;
        if(ret == "false"){
            show_alarm_module(true,"获取用户失败，请联系管理员",null);
        }else{
            usr = result.ret;

            get_alarm_type_list();
            get_user_message();
            get_user_image();
            //hyj add in 20160926 for server very slow
            //get_monitor_list();
            nav_check();
            //get_pm(usr.city);
            get_sensor_list();
            get_camera_unit();
            get_project_list();
            //getfavoritelist();
            hide_menu();
            setTimeout(mp_monitor,wait_time_middle);
            getshowaction();
        }
    };
    JQ_get(request_head,map,get_user_information_callback);

}
function on_collapse(data){
    touchcookie();
}