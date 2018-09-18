function del_proj(ProjCode){
	var body={
		ProjCode: ProjCode
	};
    var map={
        action:"ProjDel",
        type:"mod",
        body: body,
        user:usr.id
    };
	var del_proj_callback = function(result){
		var ret = result.status;
        if(ret == "true"){
            del_proj_flash= function(){

                clear_proj_detail_panel();
                proj_intialize(0);
            };
            setTimeout(function() {
                show_alarm_module(false, "删除成功！", del_proj_flash);
            },500);
        }else{
                setTimeout(function() {
                    show_alarm_module(true, "删除失败！" + result.msg, null);
                },500);
        }
	};
	JQ_get(request_head,map,del_proj_callback);
    $("#ProjDelAlarm").modal('hide');

}