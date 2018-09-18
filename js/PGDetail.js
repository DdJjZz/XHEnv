function Initialize_pg_detail(){
    get_pg_proj(pg_selected.PGCode);
}
function get_pg_proj(pgid){
    var body={
        PGCode: pgid
    };
    var map={
        action:"PGProj",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_pg_proj_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        pg_selected_proj = result.ret;
        draw_pg_detail_panel();
    };
    JQ_get(request_head,map,get_pg_proj_callback);
}
function draw_pg_detail_panel(){
    $("#Label_pg_detail").empty();
    if(pg_selected_proj === null) return;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目组编号：</dt><dd>"+pg_selected.PGCode+"</dd>"+
        "<dt >负责人：</dt><dd>"+pg_selected.ChargeMan+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>项目组名称：</dt><dd>"+pg_selected.PGName+"</dd>"+
        "<dt>电话：</dt><dd>"+pg_selected.Telephone+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>单位：</dt><dd>"+pg_selected.Department+"</dd>"+
        "<dt>地址：</dt><dd>"+pg_selected.Address+"</dd>"+
        "<dt>备注：</dt><dd>"+pg_selected.Stage+"</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_pg_detail").append(txt);

    $("#Table_pg_proj").empty();
    txt ="<thead> <tr> <th>下辖项目清单 </th> </tr> </thead> <tbody >";
    if(pg_selected_proj === null) pg_selected_proj = [];
    for(var i=0;i<pg_selected_proj.length;i++){
        txt = txt + "<tr> <td>"+ pg_selected_proj[i].name+"</td> </tr>";
    }
    txt = txt+ "</tbody>";
    $("#Table_pg_proj").append(txt);
}