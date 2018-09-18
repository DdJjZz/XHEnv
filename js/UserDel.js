function del_user(id){
    var body = {
        userid: id
    };
    var map={
        action:"UserDel",
        type:"mod",
        body: body,
        user:usr.id
    };
    var del_user_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            del_user_flash = function(){
                clear_user_detail_panel();
                user_intialize(0);
            };
            setTimeout(function(){
                show_alarm_module(false,"删除成功！",del_user_flash);
            },500);
        }else{
            setTimeout(function(){
                show_alarm_module(true,"删除失败！"+result.msg,null);},500);
        }
    };
    JQ_get(request_head,map,del_user_callback);
    $("#UserDelAlarm").modal('hide');
}