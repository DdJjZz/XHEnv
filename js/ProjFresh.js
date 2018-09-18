function clear_proj_detail_panel(){
    project_selected = null;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目编号：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >负责人：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>项目名称：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>电话：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>单位：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>开工日期：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>备注：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_proj_detail").empty();
    $("#Label_proj_detail").append(txt);
    $("#Table_proj_point").empty();
}
function proj_intialize(start) {
    project_initial = true;
    project_table = null;
    get_proj_table(start, table_row * 5);
}
function get_proj_table(start,length){
    var body={
        startseq: start,
        length:length,
        keyword: global_key_word
    };
    var map={
        action:"ProjTable",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_proj_table_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        project_table = result.ret.projtable;
        project_start = parseInt(result.ret.start);
        project_total = parseInt(result.ret.total);
        draw_proj_table_head();
    };
    JQ_get(request_head,map,get_proj_table_callback);
}
function draw_proj_table_head(){
    if(null === project_table)return;
    var page_number = Math.ceil((project_table.length)/table_row);

    $("#Proj_Page_control").empty();
    var txt = "<li>"+
        "<a href='#' id='proj_page_prev'>Prev</a>"+
        "</li>";
    var page_start_number = Math.ceil(project_start/table_row);
    var i;
    for( i=0;i<page_number;i++){
        txt=txt+ "<li>"+
            "<a href='#' id='proj_page_"+i+"'>"+(i+page_start_number+1)+"</a>"+
            "</li>";
    }
    txt=txt+"<li>"+
        "<a href='#' id='proj_page_next'>Next</a>"+
        "</li>";
    $("#Proj_Page_control").append(txt);
    table_head="<thead>"+
        "<tr>"+"<th>编号</th> <th>名称 </th> <th>责任人 </th> <th>电话 </th> <th>单位 </th>";
    table_head=table_head+"</tr></thread>";
    proj_page_click = function(){
        draw_proj_table($(this));
    };
    for( i=0;i<page_number;i++){
        $("#proj_page_"+i).on('click',proj_page_click);
    }
    if(project_start<=0){
        $("#proj_page_prev").css("display","none");
    }else{
        $("#proj_page_prev").css("display","block");
        $("#proj_page_prev").on('click',function(){
            var new_start = project_start-(table_row*5);
            if(new_start<0) new_start =0;
            proj_intialize(new_start);
        });
    }
    if((project_start+(table_row*5))>=project_total){
        $("#proj_page_next").css("display","none");
    }else{
        $("#proj_page_next").css("display","block");
        $("#proj_page_next").on('click',function(){
            proj_intialize(project_start+(table_row*5));
        });
    }
    draw_proj_table($("#proj_page_0"));
}
function draw_proj_table(data){
    $("#Table_proj").empty();
    if(null === project_table) return;
    var sequence = (parseInt(data.html())-1)*table_row-project_start;
    var txt = table_head;
    txt = txt +"<tbody>";
    var i;
    for( i=0;i<table_row;i++){
        if((sequence+i)<project_table.length){
            if(0!==i%2){
                txt =txt+ "<tr class='success li_menu' id='proj_table_cell"+i+"' ProjCode='"+project_table[sequence+i].ProjCode+"'>";
            }else{ txt =txt+ "<tr class=' li_menu' id='proj_table_cell"+i+"' ProjCode='"+project_table[sequence+i].ProjCode+"'>";}
            txt = txt +"<td>" + project_table[sequence+i].ProjCode+"</td>"+"<td>" + project_table[sequence+i].ProjName+"</td>"+"<td>" + project_table[sequence+i].ChargeMan+"</td>"+"<td>" + project_table[sequence+i].Telephone+"</td>"+"<td>" + project_table[sequence+i].Department+"</td>";
            txt = txt +"</tr>";
        }else{
            if(0!==i%2){
                txt =txt+ "<tr class='success' id='proj_table_cell"+i+"' ProjCode='null'>";
            }else{ txt =txt+ "<tr  id='proj_table_cell"+i+"' ProjCode='null'>";}
            txt = txt +"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>";
            txt = txt +"</tr>";
        }

    }
    txt = txt+"</tbody>";

    $("#Table_proj").append(txt);
    proj_table_cell_click = function(){
        if($(this).attr("ProjCode") !="null"){
            for(var i=0;i<project_table.length;i++){
                if($(this).attr("ProjCode") == project_table[i].ProjCode){
                    project_selected =project_table[i];
                    break;
                }
            }
            Initialize_proj_detail();
            touchcookie();
        }
    };
    for( i=0;i<table_row;i++){
        $("#proj_table_cell"+i).on('click',proj_table_cell_click);
    }
    touchcookie();
}
