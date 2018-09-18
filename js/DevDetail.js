function draw_dev_detail_panel(){
    $("#Label_dev_detail").empty();
    if(device_selected_sensor === null) return;
    var type = "开启";
    if(device_selected.DevStatus === "false") type = "关闭";
    var txt = "<p></p><p></p>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>设备编号：</dt><dd>"+device_selected.DevCode+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目：</dt><dd>"+get_proj_name(device_selected.ProjCode)+"</dd>"+
        "<dt >安装时间：</dt><dd>"+device_selected.StartTime+"</dd>"+
        "<dt >MAC地址：</dt><dd>"+device_selected.MAC+"</dd>"+
        "<dt >实际结束时间：</dt><dd>"+device_selected.EndTime+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>站点：</dt><dd>"+get_point_name(device_selected.StatCode)+"</dd>"+
        "<dt>预计结束时间：</dt><dd>"+device_selected.PreEndTime+"</dd>"+
        "<dt >IP地址：</dt><dd>"+device_selected.IP+"</dd>"+
        "<dt >设备是否启动：</dt><dd>"+type+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>视频地址：</dt><dd>"+device_selected.VideoURL+"</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_dev_detail").append(txt);
    $("#Table_device_sensor").empty();
    txt ="<thead> <tr> <th>传感器 </th><th>状态 </th> </tr> </thead> <tbody >";
    var i;
    if(device_selected_sensor === null) device_selected_sensor = [];
    for( i=0;i<device_selected_sensor.length;i++){
        var temp = "开启";
        if(device_selected_sensor[i].status == "false") temp = "关闭";
        txt = txt + "<tr class=' li_menu' id='sensor_table_cell"+i+"' sequence='"+i+"'> <td>"+ get_sensor_name(device_selected_sensor[i].id)+"</td><td>"+temp+"</td> </tr>";
    }
    $("#Table_device_sensor").append(txt);
    sensor_table_cell_click= function(){
        if($(this).attr("sequence") !="null"){
            select_sensor = device_selected_sensor[parseInt($(this).attr("sequence") )];
            show_sensor_module();
        }
    };
    for( i=0;i<device_selected_sensor.length;i++){
        $("#sensor_table_cell"+i).on('click',sensor_table_cell_click);
    }
}
function show_sensor_module(){
    if(null === select_sensor) {
        return;
    }
    $("#SensorExtraInfo").empty();
    $("#SensorDevCode_Input").val(device_selected.DevCode);
    $("#SensorName_Input").val(get_sensor_name(select_sensor.id));
    $("#SensorStatus_choice").val(select_sensor.status);
    if(select_sensor.para === null) select_sensor.para = [];
    if(select_sensor.para.length!==0){
        var txt = "";
        var i;
        for( i=0;i<select_sensor.para.length;i++){
            txt = txt +"<div class='input-group '>"+
                "<span class='input-group-addon' style='min-width: 100px'>"+select_sensor.para[i].name+"</span>"+
                "<input type='text' class='form-control' placeholder='"+select_sensor.para[i].memo+"' aria-describedby='basic-addon1' id='SensorPara_"+select_sensor.para[i].name+"'/>"+
                "</div><p></p>";
        }
        $("#SensorExtraInfo").append(txt);
        for( i=0;i<select_sensor.para.length;i++){
            $("#SensorPara_"+select_sensor.para[i].name).val(select_sensor.para[i].value);
        }
    }
    modal_middle($('#SensorModal'));
    $('#SensorModal').modal('show');
}
function Initialize_dev_detail(){
    get_device_sensor(device_selected.DevCode);
}
function get_device_sensor(DevCode){
    var body={
        DevCode: DevCode
    };
    var map={
        action:"DevSensor",
        body:body,
        type:"query",
        user:usr.id
    };
    var get_device_sensor_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        device_selected_sensor = result.ret;
        draw_dev_detail_panel();
    };
    JQ_get(request_head,map,get_device_sensor_callback);
}