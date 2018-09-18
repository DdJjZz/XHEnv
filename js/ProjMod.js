function show_mod_proj_module(project){
    $("#newProjModalLabel").text("项目修改");
    project_module_status = false;
    $("#ProjProjCode_Input").val(project.ProjCode);
    $('#ProjProjCode_Input').attr("disabled",true);
    $("#ProjProjName_Input").val(project.ProjName);
    $("#ProjChargeMan_Input").val(project.ChargeMan);
    $("#ProjTelephone_Input").val(project.Telephone);
    $("#ProjDepartment_Input").val(project.Department);
    $("#ProjAddress_Input").val(project.Address);
    $("#ProjProStartTime_Input").val(project.ProStartTime);
    $("#ProjStage_Input").val(project.Stage);
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
function submit_mod_proj_module(){
    var new_ProjProjCode = $("#ProjProjCode_Input").val();
    var new_ProjProjName = $("#ProjProjName_Input").val();
    var new_ProjChargeMan = $("#ProjChargeMan_Input").val();
    var new_ProjTelephone = $("#ProjTelephone_Input").val();
    var new_ProjDepartment = $("#ProjDepartment_Input").val();
    var new_ProjAddress = $("#ProjAddress_Input").val();
    var new_ProjProStartTime = $("#ProjProStartTime_Input").val();
    var new_ProjStage = $("#ProjStage_Input").val();
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
    modify_proj(project);
}
function modify_proj(project){
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
        action:"ProjMod",
        type:"mod",
        body: body,
        user:usr.id
    };
    var modify_proj_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newProjModal').modal('hide');
            mod_proj_flash = function(){
                clear_proj_detail_panel();
                proj_intialize(0);
            };

            setTimeout(function() {
                show_alarm_module(false, "修改成功！", mod_proj_flash);
            },500);
        }else{
            setTimeout(function() {
                show_alarm_module(true, "修改失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,modify_proj_callback);
}