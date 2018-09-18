function Initialize_point_detail(){
    get_point_device(point_selected.StatCode);
    get_point_picture(point_selected.StatCode);
}
function get_point_device(StatCode){
    var body={
        StatCode: StatCode
    };
    var map={
        action:"PointDev",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_point_device_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        point_selected_device = result.ret;
        //HYJ add for server slow;
        draw_point_detail_panel();
    };
    JQ_get(request_head,map,get_point_device_callback);
}
function draw_point_detail_panel(){
    $("#Label_point_detail").empty();
    if(point_selected_device === null) return;

    var projname ="";
    if(project_list === null) project_list = [];
    for(var j=0;j<project_list.length;j++){
        if(point_selected.ProjCode == project_list[j].id){
            projname = project_list[j].name;break;
        }
    }
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >站点编号：</dt><dd>"+point_selected.StatCode+"</dd>"+
        "<dt >负责人：</dt><dd>"+point_selected.ChargeMan+"</dd>"+
        "<dt >开工日期：</dt><dd>"+point_selected.ProStartTime+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>站点名称：</dt><dd>"+point_selected.StatName+"</dd>"+
        "<dt>电话：</dt><dd>"+point_selected.Telephone+"</dd>"+
        "<dt >面积：</dt><dd>"+point_selected.Square+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>关联项目：</dt><dd>"+projname+"</dd>"+
        "<dt>单位：</dt><dd>"+point_selected.Department+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >经度：</dt><dd>"+point_selected.Longitude+"</dd>"+
        "<dt >区县：</dt><dd>"+point_selected.Country+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>纬度：</dt><dd>"+point_selected.Latitude+"</dd>"+
        "<dt>街镇：</dt><dd>"+point_selected.Street+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>地址：</dt><dd>"+point_selected.Address+"</dd>"+
        "<dt>备注：</dt><dd>"+point_selected.Stage+"</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_point_detail").append(txt);

    $("#Table_point_device").empty();
    txt ="<thead> <tr> <th>监控设备清单 </th> </tr> </thead> <tbody >";
    if(point_selected_device === null) point_selected_device = [];
    for(var i=0;i<point_selected_device.length;i++){
        txt = txt + "<tr> <td>"+ point_selected_device[i].name+"</td> </tr>";
    }
    txt = txt+ "</tbody>";
    $("#Table_point_device").append(txt);

}