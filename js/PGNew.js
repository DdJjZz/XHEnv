function show_new_pg_module(){

    $("#newPGModalLabel").text("创建新项目组");
    pg_module_status = true;

    $("#PGPGCode_Input").val("");
    $('#PGPGCode_Input').attr("disabled",true);
    $("#PGPGName_Input").val("");
    $("#PGChargeMan_Input").val("");
    $("#PGTelephone_Input").val("");
    $("#PGDepartment_Input").val("");
    $("#PGAddress_Input").val("");
    $("#PGStage_Input").val("");
    $("#PGPGCode_Input").attr("placeholder","项目组编号");
    $("#PGPGName_Input").attr("placeholder","项目组名称");
    $("#PGChargeMan_Input").attr("placeholder","负责人姓名");
    $("#PGTelephone_Input").attr("placeholder","联系电话");
    $("#PGDepartment_Input").attr("placeholder","单位名称");
    $("#PGAddress_Input").attr("placeholder","地址");

    $("#duallistboxPGProj_new").empty();
    var txt = "";
    if(project_list === null) project_list = [];
    for(var i =0;i<project_list.length;i++){
        txt = "<option value='"+project_list[i].id+"'>"+project_list[i].name+"</option>";
        $("#duallistboxPGProj_new").append(txt);
    }
    $('.NewPGProjDual').bootstrapDualListbox('refresh', true);


    modal_middle($('#newPGModal'));

    $('#newPGModal').modal('show');

}
function submit_new_pg_module(){
    var new_PGPGCode = $("#PGPGCode_Input").val();
    var new_PGPGName = $("#PGPGName_Input").val();
    var new_PGChargeMan = $("#PGChargeMan_Input").val();
    var new_PGTelephone = $("#PGTelephone_Input").val();
    var new_PGDepartment = $("#PGDepartment_Input").val();
    var new_PGAddress = $("#PGAddress_Input").val();
    var new_PGStage = $("#PGStage_Input").val();
    if(new_PGPGName === null || new_PGPGName === ""){
        $("#PGPGName_Input").attr("placeholder","项目组名称不能为空");
        $("#PGPGName_Input").focus();
        return;
    }
    if(new_PGChargeMan === null || new_PGChargeMan === ""){
        $("#PGChargeMan_Input").attr("placeholder","负责人姓名不能为空");
        $("#PGChargeMan_Input").focus();
        return;
    }
    if(new_PGTelephone === null || new_PGTelephone === ""){
        $("#PGTelephone_Input").attr("placeholder","联系电话不能为空");
        $("#PGTelephone_Input").focus();
        return;
    }
    if(new_PGDepartment === null || new_PGDepartment === ""){
        $("#PGDepartment_Input").attr("placeholder","单位名称不能为空");
        $("#PGDepartment_Input").focus();
        return;
    }
    if(new_PGAddress === null || new_PGAddress === ""){
        $("#PGAddress_Input").attr("placeholder","地址不能为空");
        $("#PGAddress_Input").focus();
        return;
    }
    var pg = {
        PGCode: new_PGPGCode,
        PGName:new_PGPGName,
        ChargeMan:new_PGChargeMan,
        Telephone:new_PGTelephone,
        Department:new_PGDepartment,
        Address:new_PGAddress,
        Stage:new_PGStage
    };
    var proj = [];//new Array();
    $('#duallistboxPGProj_new :selected').each(function(i, selected) {
        var temp = {
            id:$(selected).val(),
            name:$(selected).text()
        };
        proj.push(temp);
    });
    new_pg(pg,proj);
}
function new_pg(pg,projlist){
    var body={
        PGCode: pg.PGCode,
        PGName:pg.PGName,
        ChargeMan:pg.ChargeMan,
        Telephone:pg.Telephone,
        Department:pg.Department,
        Address:pg.Address,
        Stage:pg.Stage,
        Projlist: projlist
    };
    var map={
        action:"PGNew",
        type:"mod",
        body: body,
        user:usr.id
    };
    var new_pg_callback = function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newPGModal').modal('hide');

            new_pg_flash = function(){
                clear_pg_detail_panel();
                pg_intialize(0);
            };
            setTimeout(function() {
                show_alarm_module(false, "创建成功！", new_pg_flash);
            },500);
        }else{
            setTimeout(function() {
                show_alarm_module(true, "创建失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,new_pg_callback);
}