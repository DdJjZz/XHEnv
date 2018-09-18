function show_new_proj_module(){
    $("#newProjModalLabel").text("创建新项目");
    project_module_status = true;
    $("#ProjProjCode_Input").val("");
    $('#ProjProjCode_Input').attr("disabled",true);
    $("#ProjProjName_Input").val("");
    $("#ProjChargeMan_Input").val("");
    $("#ProjTelephone_Input").val("");
    $("#ProjDepartment_Input").val("");
    $("#ProjAddress_Input").val("");
    $("#ProjProStartTime_Input").val("");
    $("#ProjStage_Input").val("");
    $("#ProjProjCode_Input").attr("placeholder","项目号");
    $("#ProjProjName_Input").attr("placeholder","项目名称");
    $("#ProjChargeMan_Input").attr("placeholder","负责人姓名");
    $("#ProjTelephone_Input").attr("placeholder","联系电话");
    $("#ProjDepartment_Input").attr("placeholder","单位名称");
    $("#ProjAddress_Input").attr("placeholder","地址");
    $("#ProjProStartTime_Input").attr("placeholder","创建时间");
    modal_middle($('#newProjModal'));
    $('#newProjModal').modal('show');
}
function submit_new_proj_module(){
    var new_ProjProjCode = $("#ProjProjCode_Input").val();
    var new_ProjProjName = $("#ProjProjName_Input").val();
    var new_ProjChargeMan = $("#ProjChargeMan_Input").val();
    var new_ProjTelephone = $("#ProjTelephone_Input").val();
    var new_ProjDepartment = $("#ProjDepartment_Input").val();
    var new_ProjAddress = $("#ProjAddress_Input").val();
    var new_ProjProStartTime = $("#ProjProStartTime_Input").val();
    var new_ProjStage = $("#ProjStage_Input").val();
    if(new_ProjProjName === null || new_ProjProjName === ""){
        $("#ProjProjName_Input").attr("placeholder","项目名称不能为空");
        $("#ProjProjName_Input").focus();
        return;
    }
    if(new_ProjChargeMan === null || new_ProjChargeMan === ""){
        $("#ProjChargeMan_Input").attr("placeholder","负责人姓名不能为空");
        $("#ProjChargeMan_Input").focus();
        return;
    }
    if(new_ProjTelephone === null || new_ProjTelephone === ""){
        $("#ProjTelephone_Input").attr("placeholder","联系电话不能为空");
        $("#ProjTelephone_Input").focus();
        return;
    }
    if(new_ProjDepartment === null || new_ProjDepartment === ""){
        $("#ProjDepartment_Input").attr("placeholder","单位名称不能为空");
        $("#ProjDepartment_Input").focus();
        return;
    }
    if(new_ProjAddress === null || new_ProjAddress === ""){
        $("#ProjAddress_Input").attr("placeholder","地址不能为空");
        $("#ProjAddress_Input").focus();
        return;
    }
    if(new_ProjProStartTime === null || new_ProjProStartTime === ""){
        $("#ProjProStartTime_Input").attr("placeholder","创建时间不能为空");
        $("#ProjProStartTime_Input").focus();
        return;
    }
    var project = {
        ProjCode: new_ProjProjCode,
        ProjName:new_ProjProjName,
        ChargeMan:new_ProjChargeMan,
        Telephone:new_ProjTelephone,
        Department:new_ProjDepartment,
        Address:new_ProjAddress,
        ProStartTime:new_ProjProStartTime,
        Stage:new_ProjStage
    };
    new_proj(project);
}
function new_proj(project){
    var body={
        ProjCode: project.ProjCode,
        ProjName:project.ProjName,
        ChargeMan:project.ChargeMan,
        Telephone:project.Telephone,
        Department:project.Department,
        Address:project.Address,
        ProStartTime:project.ProStartTime,
        Stage:project.Stage
    };
    var map={
        action:"ProjNew",
        type:"mod",
        body: body,
        user:usr.id
    };
    var new_proj_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newProjModal').modal('hide');
            new_proj_flash= function(){
                clear_proj_detail_panel();
                proj_intialize(0);
            };
            setTimeout(function() {
                show_alarm_module(false, "创建成功！", new_proj_flash);
            },500);

        }else{
            setTimeout(function() {
                show_alarm_module(true, "创建失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,new_proj_callback);
}