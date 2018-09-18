function show_mod_dev_module(device){
    $("#newDevModalLabel").text("设备修改");
    device_module_status = false;
    $('#DevDevCode_Input').attr("disabled",true);
    $("#DevDevCode_Input").val(device.DevCode);
    $("#DevStatCode_choice").empty();
    $("#DevProjCode_choice").empty();

    $("#DevProjCode_choice").append(get_proj_option(device.ProjCode));
    get_proj_point_option($("#DevProjCode_choice").val(),$("#DevStatCode_choice"),device.StatCode);

    $("#DevStatCode_choice").val(device.StatCode);
    $("#DevStartTime_Input").val(device.StartTime);
    $("#DevPreEndTime_Input").val(device.PreEndTime);
    $("#DevEndTime_Input").val(device.EndTime);
    if(device.DevStatus) $("#DevDevStatus_choice").val("true");
    else $("#DevDevStatus_choice").val("false");
    $("#DevVideoURL_Input").val(device.VideoURL);

    $("#DevDevCode_Input").attr("placeholder","设备编号");
    $("#DevStartTime_Input").attr("placeholder","安装时间");
    $("#DevPreEndTime_Input").attr("placeholder","预计结束时间");
    $("#DevEndTime_Input").attr("placeholder","实际结束时间");

    modal_middle($('#newDevModal'));

    $('#newDevModal').modal('show');
}
function submit_mod_dev_module(){
    var new_DevDevCode = $("#DevDevCode_Input").val();
    var new_DevStatCode =$("#DevStatCode_choice").val();
    var new_DevStartTime =$("#DevStartTime_Input").val();
    var new_DevPreEndTime =$("#DevPreEndTime_Input").val();
    var new_DevEndTime =$("#DevEndTime_Input").val();
    var new_DevDevStatus =$("#DevDevStatus_choice").val();
    var new_DevVideoURL =$("#DevVideoURL_Input").val();


    var device = {
        DevCode: new_DevDevCode,
        StatCode:new_DevStatCode,
        StartTime:new_DevStartTime,
        PreEndTime:new_DevPreEndTime,
        EndTime:new_DevEndTime,
        DevStatus:new_DevDevStatus,
        VideoURL:new_DevVideoURL
    };
    modify_dev(device);
}
function modify_dev(device){
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
        action:"DevMod",
        type:"mod",
        body: body,
        user:usr.id
    };
    var modify_dev_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newDevModal').modal('hide');
            mod_dev_flash = function(){
                clear_dev_detail_panel();
                dev_intialize(0);};

            setTimeout(function() {
                show_alarm_module(false, "修改成功！", mod_dev_flash);
            },500);
        }else{

            setTimeout(function() {
                show_alarm_module(true, "修改失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,modify_dev_callback);
}