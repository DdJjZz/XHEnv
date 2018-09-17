
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