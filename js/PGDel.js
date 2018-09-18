function del_pg(id){
    var body={
        PGCode: id
    };
    var map={
        action:"PGDel",
        type:"mod",
        body: body,
        user:usr.id
    };


    var del_pg_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            del_pg_flash = function(){
                clear_pg_detail_panel();
                pg_intialize(0);
            };

            setTimeout(function() {
                show_alarm_module(false, "删除成功！", del_pg_flash);
            },500);

        }else{

            setTimeout(function() {
                show_alarm_module(true, "删除失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,del_pg_callback);
    $("#PGDelAlarm").modal('hide');

}