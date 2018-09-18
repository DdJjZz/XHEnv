function show_new_point_module(){

    $("#newPointModalLabel").text("创建站点");
    point_module_status = true;

    $("#PointStatCode_Input").val("");
    $('#PointStatCode_Input').attr("disabled",true);
    $("#PointStatName_Input").val("");
    $("#PointChargeMan_Input").val("");
    $("#PointTelephone_Input").val("");
    $("#PointLongitude_Input").val("");
    $("#PointLatitude_Input").val("");
    $('#PointLongitude_Input').attr("disabled",true);
    $('#PointLatitude_Input').attr("disabled",true);
    $("#PointDepartment_Input").val("");
    $("#PointAddress_Input").val("");
    $("#PointCountry_Input").val("");
    $("#PointStreet_Input").val("");
    $("#PointSquare_Input").val("");
    $("#PointProStartTime_Input").val("");
    $("#PointStage_Input").val("");
    $("#PointProjCode_choice").empty();
    $("#PointProjCode_choice").append(get_proj_option());

    $("#PointStatCode_Input").attr("placeholder","站点号");
    $("#PointStatName_Input").attr("placeholder","站点名称");
    $("#PointChargeMan_Input").attr("placeholder","负责人姓名");
    $("#PointTelephone_Input").attr("placeholder","联系电话");
    $("#PointLongitude_Input").attr("placeholder","经度");
    $("#PointLatitude_Input").attr("placeholder","纬度");
    $("#PointDepartment_Input").attr("placeholder","单位名称");
    $("#PointAddress_Input").attr("placeholder","地址");
    $("#PointCountry_Input").attr("placeholder","区县");
    $("#PointStreet_Input").attr("placeholder","街镇");
    $("#PointSquare_Input").attr("placeholder","施工面积(平方米)");
    $("#PointProStartTime_Input").attr("placeholder","开工时间");
    modal_middle($('#newPointModal'));
    $('#newPointModal').modal('show');
}
function submit_new_point_module(){
    var new_PointStatCode = $("#PointStatCode_Input").val();
    var new_PointStatName = $("#PointStatName_Input").val();
    var new_PointProjCode = $("#PointProjCode_choice").val();
    var new_PointChargeMan = $("#PointChargeMan_Input").val();
    var new_PointTelephone = $("#PointTelephone_Input").val();
    var new_PointLongitude = $("#PointLongitude_Input").val();
    var new_PointLatitude = $("#PointLatitude_Input").val();
    var new_PointDepartment = $("#PointDepartment_Input").val();
    var new_PointAddress = $("#PointAddress_Input").val();
    var new_PointCountry = $("#PointCountry_Input").val();
    var new_PointStreet = $("#PointStreet_Input").val();
    var new_PointSquare = $("#PointSquare_Input").val();
    var new_PointProStartTime = $("#PointProStartTime_Input").val();
    var new_PointStage = $("#PointStage_Input").val();
    if(new_PointStatName === null || new_PointStatName === ""){
        $("#PointStatName_Input").attr("placeholder","站点名称不能为空");
        $("#PointStatName_Input").focus();
        return;
    }
    if(new_PointChargeMan === null || new_PointChargeMan === ""){
        $("#PointChargeMan_Input").attr("placeholder","负责人姓名不能为空");
        $("#PointChargeMan_Input").focus();
        return;
    }
    if(new_PointProjCode === null || new_PointProjCode === ""){
        $("#PointProjCode_choice").attr("placeholder","项目不能为空");
        $("#PointProjCode_choice").focus();
        return;
    }
    if(new_PointTelephone === null || new_PointTelephone === ""){
        $("#PointTelephone_Input").attr("placeholder","联系电话不能为空");
        $("#PointTelephone_Input").focus();
        return;
    }
    if(new_PointDepartment === null || new_PointDepartment === ""){
        $("#PointDepartment_Input").attr("placeholder","单位名称不能为空");
        $("#PointDepartment_Input").focus();
        return;
    }
    if(new_PointAddress === null || new_PointAddress === ""){
        $("#PointAddress_Input").attr("placeholder","地址不能为空");
        $("#PointAddress_Input").focus();
        return;
    }
    if(new_PointCountry === null || new_PointCountry === ""){
        $("#PointCountry_Input").attr("placeholder","区县不能为空");
        $("#PointCountry_Input").focus();
        return;
    }
    if(new_PointStreet === null || new_PointStreet === ""){
        $("#PointStreet_Input").attr("placeholder","街镇不能为空");
        $("#PointStreet_Input").focus();
        return;
    }
    if(new_PointSquare === null || new_PointSquare === ""){
        $("#PointSquare_Input").attr("placeholder","施工面积不能为空");
        $("#PointSquare_Input").focus();
        return;
    }
    if(new_PointProStartTime === null || new_PointProStartTime === ""){
        $("#PointProStartTime_Input").attr("placeholder","开工时间不能为空");
        $("#PointProStartTime_Input").focus();
        return;
    }

    var point = {
        StatCode: new_PointStatCode,
        StatName:new_PointStatName,
        ProjCode:new_PointProjCode,
        ChargeMan:new_PointChargeMan,
        Telephone:new_PointTelephone,
        Longitude:new_PointLongitude,
        Latitude:new_PointLatitude,
        Department:new_PointDepartment,
        Address:new_PointAddress,
        Country:new_PointCountry,
        Street:new_PointStreet,
        Square:new_PointSquare,
        ProStartTime:new_PointProStartTime,
        Stage:new_PointStage
    };
    new_point(point);
}
function new_point(point){
    var body={
        StatCode: point.StatCode,
        StatName:point.StatName,
        ProjCode: point.ProjCode,
        ChargeMan:point.ChargeMan,
        Telephone:point.Telephone,
        Longitude:point.Longitude,
        Latitude:point.Latitude,
        Department:point.Department,
        Address:point.Address,
        Country:point.Country,
        Street:point.Street,
        Square:point.Square,
        ProStartTime:point.ProStartTime,
        Stage:point.Stage
    };
    var map={
        action:"PointNew",
        type:"mod",
        body: body,
        user:usr.id
    };
    var new_point_callback=function(result){
        var ret = result.status;
        if(ret == "true"){
            $('#newPointModal').modal('hide');
            new_point_flash= function(){
                clear_point_detail_panel();
                point_intialize(0);};

            setTimeout(function() {
                show_alarm_module(false, "创建成功！", new_point_flash);
            },500);
        }else{
            setTimeout(function() {
                show_alarm_module(true, "创建失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,new_point_callback);
}