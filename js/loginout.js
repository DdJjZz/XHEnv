function logout(){
    delCookie('Environmental.inspection.session');
    window.location=httphead+"//"+window.location.host+basic_address+"login.html";
}
function video_windows(videoid){
    window.open(httphead+"//"+window.location.host+basic_address+"/video/video.html?id="+videoid,'监控录像',"height=284, width=340, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function screen_windows(){
    window.open(httphead+"//"+window.location.host+screen_saver_address+"?id="+usr.id+"&StatCode="+monitor_selected.StatCode,'屏幕保护',"height=auto, width=auto");
}
$(document).ready(function() {
    console.log("Login Out.js is Start");
});