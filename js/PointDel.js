function del_point(StatCode){
    var body={StatCode: StatCode};
    var map={
        action:"PointDel",
        type:"mod",
        body: body,
        user:usr.id
    };

    var del_point_callback=function(result){
        var ret = result.status;
        if(ret == "true"){
            del_point_flash = function(){
                clear_point_detail_panel();
                point_intialize(0);};

            setTimeout(function() {
                show_alarm_module(false, "删除成功！", del_point_flash);
            },500);
        }else{
            setTimeout(function() {
                show_alarm_module(true, "删除失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,del_point_callback);
    $("#PointDelAlarm").modal('hide');

}