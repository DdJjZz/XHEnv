function show_new_dev_module(){

    $("#newDevModalLabel").text("创建新设备");
    device_module_status = true;
    $('#DevDevCode_Input').attr("disabled",false);
    $("#DevDevCode_Input").val("");
    $("#DevStatCode_choice").empty();
    $("#DevProjCode_choice").empty();
    $("#DevProjCode_choice").append(get_proj_option());
    //console.log($("#DevProjCode_choice").val());
    get_proj_point_option($("#DevProjCode_choice").val(),$("#DevStatCode_choice"),"");
    $("#DevStartTime_Input").val("");
    $("#DevPreEndTime_Input").val("");
    $("#DevEndTime_Input").val("");
    $("#DevDevStatus_choice").val("true");
    $("#DevVideoURL_Input").val("");

    $("#DevDevCode_Input").attr("placeholder","设备编号");
    $("#DevStartTime_Input").attr("placeholder","安装时间");
    $("#DevPreEndTime_Input").attr("placeholder","预计结束时间");
    $("#DevEndTime_Input").attr("placeholder","实际结束时间");


    modal_middle($('#newDevModal'));

    $('#newDevModal').modal('show');

}
function submit_new_dev_module(){
    var new_DevDevCode = $("#DevDevCode_Input").val();
    var new_DevStatCode =$("#DevStatCode_choice").val();
    var new_DevStartTime =$("#DevStartTime_Input").val();
    var new_DevPreEndTime =$("#DevPreEndTime_Input").val();
    var new_DevEndTime =$("#DevEndTime_Input").val();
    var new_DevDevStatus =$("#DevDevStatus_choice").val();
    var new_DevVideoURL =$("#DevVideoURL_Input").val();

    if(new_DevDevCode === null || new_DevDevCode === ""){
        $("#DevDevCode_Input").attr("placeholder","设备号不能为空");
        $("#DevDevCode_Input").focus();
        return;
    }
    if(new_DevStatCode === null || new_DevStatCode === ""){
        $("#DevStatCode_choice").attr("placeholder","项目不能为空");
        $("#DevStatCode_choice").focus();
        return;
    }
    if(new_DevStartTime === null || new_DevStartTime === ""){
        $("#DevStartTime_Input").attr("placeholder","负责人姓名不能为空");
        $("#DevStartTime_Input").focus();
        return;
    }

    var device = {
        DevCode: new_DevDevCode,
        StatCode:new_DevStatCode,
        StartTime:new_DevStartTime,
        PreEndTime:new_DevPreEndTime,
        EndTime:new_DevEndTime,
        DevStatus:new_DevDevStatus,
        VideoURL:new_DevVideoURL
    };
    new_dev(device);
}
function new_dev(device){
    var body={
        DevCode: device.DevCode,
        StatCode:device.StatCode,
        StartTime:device.StartTime,
        PreEndTime:device.PreEndTime,
        EndTime:device.EndTime,
        DevStatus:device.DevStatus,
        VideoURL:device.VideoURL
    };
    var map={
        action:"DevNew",
        type:"mod",
        body: body,
        user:usr.id
    };
    var new_dev_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newDevModal').modal('hide');
            new_dev_flash = function(){
                clear_dev_detail_panel();
                dev_intialize(0);};

            setTimeout(function() {
                show_alarm_module(false, "创建成功！", new_dev_flash);
            },500);
        }else{
            setTimeout(function() {
                show_alarm_module(true, "创建失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,new_dev_callback);
}