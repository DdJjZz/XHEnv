function Initialize_proj_detail(){
    draw_proj_detail_panel();
    get_proj_point(project_selected.ProjCode);
}
function draw_proj_detail_panel(){
    $("#Label_proj_detail").empty();
    if(project_selected_point === null) return;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目编号：</dt><dd>"+project_selected.ProjCode+"</dd>"+
        "<dt >负责人：</dt><dd>"+project_selected.ChargeMan+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>项目名称：</dt><dd>"+project_selected.ProjName+"</dd>"+
        "<dt>电话：</dt><dd>"+project_selected.Telephone+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>单位：</dt><dd>"+project_selected.Department+"</dd>"+
        "<dt>地址：</dt><dd>"+project_selected.Address+"</dd>"+
        "<dt>开工日期：</dt><dd>"+project_selected.ProStartTime+"</dd>"+
        "<dt>备注：</dt><dd>"+project_selected.Stage+"</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_proj_detail").append(txt);
}
function get_proj_point(ProjCode){
    var body={
        ProjCode: ProjCode
    };
    var map={
        action:"PointProj",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_proj_point_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        project_selected_point = result.ret;
        draw_proj_detail_point_table();
    };
    JQ_get(request_head,map,get_proj_point_callback);
}
function draw_proj_detail_point_table(){
    $("#Table_proj_point").empty();
    txt ="<thead> <tr> <th>站点清单 </th> </tr> </thead> <tbody >";
    if(project_selected_point === null) project_selected_point = [];
    for(var i=0;i<project_selected_point.length;i++){
        txt = txt + "<tr> <td>"+ project_selected_point[i].name+"</td> </tr>";
    }
    txt = txt+ "</tbody>";
    $("#Table_proj_point").append(txt);
}