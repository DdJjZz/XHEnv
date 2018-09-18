function clear_dev_detail_panel(){
    project_selected = null;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>设备编号：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >安装时间：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >MAC地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >实际结束时间：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>站点：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>预计结束时间：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >IP地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >设备是否启动：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>视频地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_dev_detail").empty();
    $("#Label_dev_detail").append(txt);
    $("#Table_device_sensor").empty();
}
function dev_intialize(start) {
    device_initial = true;
    device_table = null;
    get_dev_table(start, table_row * 5);
    get_project_list();
    get_proj_point_list();
    clear_dev_detail_panel();
}
function get_dev_table(start,length){
    var body={
        startseq: start,
        length:length,
        keyword: global_key_word
    };
    var map={
        action:"DevTable",
        body:body,
        type:"query",
        user:usr.id
    };
    var get_dev_table_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        device_table = result.ret.devtable;
        device_start = parseInt(result.ret.start);
        device_total = parseInt(result.ret.total);
        window.setTimeout(draw_dev_table_head, wait_time_middle);
    };
    JQ_get(request_head,map,get_dev_table_callback);
}
function get_proj_point_list(){
    var map={
        action:"ProjPoint",
        type:"query",
        user:usr.id
    };
    var get_proj_point_list_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        point_list = result.ret;
    };
    JQ_get(request_head,map,get_proj_point_list_callback);
}
function draw_dev_table_head(){
    if(null === device_table)return;
    var page_number = Math.ceil((device_table.length)/table_row);

    $("#Dev_Page_control").empty();
    var txt = "<li>"+
        "<a href='#' id='dev_page_prev'>Prev</a>"+
        "</li>";
    var page_start_number = Math.ceil(device_start/table_row);
    var i;
    for( i=0;i<page_number;i++){
        txt=txt+ "<li>"+
            "<a href='#' id='dev_page_"+i+"'>"+(i+page_start_number+1)+"</a>"+
            "</li>";
    }
    txt=txt+"<li>"+
        "<a href='#' id='dev_page_next'>Next</a>"+
        "</li>";
    $("#Dev_Page_control").append(txt);
    table_head="<thead>"+
        "<tr>"+"<th>编号 </th> <th>项目名称 </th> <th>站点名称 </th><th>安装时间 </th> <th>是否启动 </th>";
    table_head=table_head+"</tr></thread>";
    dev_page_click = function(){
        draw_dev_table($(this));
    };
    for( i=0;i<page_number;i++){
        $("#dev_page_"+i).on('click',dev_page_click);
    }
    if(device_start<=0){
        $("#dev_page_prev").css("display","none");
    }else{
        $("#dev_page_prev").css("display","block");
        $("#dev_page_prev").on('click',function(){
            var new_start = device_start-(table_row*5);
            if(new_start<0) new_start =0;
            dev_intialize(new_start);
        });
    }
    if((device_start+(table_row*5))>=device_total){
        $("#dev_page_next").css("display","none");
    }else{
        $("#dev_page_next").css("display","block");
        $("#dev_page_next").on('click',function(){
            dev_intialize(device_start+(table_row*5));
        });
    }
    draw_dev_table($("#dev_page_0"));
}
function draw_dev_table(data){
    $("#Table_dev").empty();
    if(null === device_table) return;
    var sequence = (parseInt(data.html())-1)*table_row-device_start;
    var txt = table_head;
    txt = txt +"<tbody>";
    var i;
    for( i=0;i<table_row;i++){
        if((sequence+i)<device_table.length){
            if(0!==i%2){
                txt =txt+ "<tr class='success li_menu' id='dev_table_cell"+i+"' DevCode='"+device_table[sequence+i].DevCode+"'>";
            }else{ txt =txt+ "<tr class=' li_menu' id='dev_table_cell"+i+"' DevCode='"+device_table[sequence+i].DevCode+"'>";}
            var type = "开启";
            if(device_table[sequence+i].DevStatus === "false") type = "关闭";
            txt = txt +"<td>" + device_table[sequence+i].DevCode+"</td>"+"<td>" + get_proj_name(device_table[sequence+i].ProjCode)+"</td>"+"<td>" + get_point_name(device_table[sequence+i].StatCode)+"</td>"+"<td>" + device_table[sequence+i].StartTime+"</td>"+"<td>" + type+"</td>";
            txt = txt +"</tr>";
        }else{
            if(0!==i%2){
                txt =txt+ "<tr class='success' id='dev_table_cell"+i+"' DevCode='null'>";
            }else{ txt =txt+ "<tr  id='dev_table_cell"+i+"' DevCode='null'>";}
            txt = txt +"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>";
            txt = txt +"</tr>";
        }
    }
    txt = txt+"</tbody>";
    $("#Table_dev").append(txt);
    dev_table_cell_click = function(){
        if($(this).attr("DevCode") !="null"){
            for(var i=0;i<device_table.length;i++){
                if($(this).attr("DevCode") == device_table[i].DevCode){
                    device_selected =device_table[i];
                    break;
                }
            }
            Initialize_dev_detail();
            touchcookie();
        }
    };
    for( i=0;i<table_row;i++){
        $("#dev_table_cell"+i).on('click',dev_table_cell_click);
    }
    touchcookie();
}
function get_proj_name(id){
    var proj_name= null;
    if(project_list === null) project_list = [];
    for(var i=0;i<project_list.length;i++){
        if(project_list[i].id == id){
            proj_name = project_list[i].name;
            break;
        }
    }
    return proj_name;
}
function get_point_name(id){
    var point_name= null;
    if(point_list === null) point_list = [];
    for(var i=0;i<point_list.length;i++){
        if(point_list[i].id == id){
            point_name = point_list[i].name;
            break;
        }
    }
    return point_name;
}