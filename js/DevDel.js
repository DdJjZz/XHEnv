function del_dev(DevCode){
    var body={
        DevCode: DevCode
    };
    var map={
        action:"DevDel",
        type:"mod",
        body: body,
        user:usr.id
    };
    var del_dev_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            del_dev_flash = function(){
                clear_dev_detail_panel();
                dev_intialize(0);};

            setTimeout(function() {
                show_alarm_module(false, "删除成功！", del_dev_flash);
            },500);
        }else{

            setTimeout(function() {
                show_alarm_module(true, "删除失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,del_dev_callback);
    $("#DevDelAlarm").modal('hide');
}