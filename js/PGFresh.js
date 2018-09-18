function clear_pg_detail_panel(){
    pg_selected = null;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >项目组编号：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >负责人：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>项目组名称：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>电话：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>单位：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>备注：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_pg_detail").empty();
    $("#Label_pg_detail").append(txt);
    $("#Table_pg_proj").empty();
}
function pg_intialize(start) {
    if(project_list === null)get_project_list();
    pg_initial = true;
    pg_table = null;
    get_pg_table(start, table_row * 5);
    clear_pg_detail_panel();
    get_project_list();
}
function get_project_list(){
    var map={
        action:"ProjectList",
        type:"query",
        user:usr.id
    };
    var get_project_list_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        project_list = result.ret;
    };
    JQ_get(request_head,map,get_project_list_callback);
}
function get_pg_table(start,length){
    var body={
        startseq: start,
        length:length,
        keyword: global_key_word
    };
    var map={
        action:"PGTable",
        body:body,
        type:"query",
        user:usr.id
    };
    var get_pg_table_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        pg_table = result.ret.pgtable;

        pg_start = parseInt(result.ret.start);
        pg_total = parseInt(result.ret.total);
        //HYJ add for server slow
        draw_pg_table_head();
    };
    JQ_get(request_head,map,get_pg_table_callback);
}
function draw_pg_table_head(){
    if(null === pg_table)return;
    var page_number = Math.ceil((pg_table.length)/table_row);

    $("#PG_Page_control").empty();
    var txt = "<li>"+
        "<a href='#' id='pg_page_prev'>Prev</a>"+
        "</li>";
    var page_start_number = Math.ceil(pg_start/table_row);
    var i;
    for(i=0;i<page_number;i++){
        txt=txt+ "<li>"+
            "<a href='#' id='pg_page_"+i+"'>"+(i+page_start_number+1)+"</a>"+
            "</li>";
    }
    txt=txt+"<li>"+
        "<a href='#' id='pg_page_next'>Next</a>"+
        "</li>";
    $("#PG_Page_control").append(txt);
    table_head="<thead>"+
        "<tr>"+"<th>编号</th> <th>名称 </th> <th>责任人 </th> <th>电话 </th> <th>单位 </th>";
    table_head=table_head+"</tr></thread>";
    pg_page_click = function(){
        draw_pg_table($(this));
    };
    for(i=0;i<page_number;i++){
        $("#pg_page_"+i).on('click',pg_page_click);
    }
    if(pg_start<=0){
        $("#pg_page_prev").css("display","none");
    }else{
        $("#pg_page_prev").css("display","block");
        $("#pg_page_prev").on('click',function(){
            var new_start = pg_start-(table_row*5);
            if(new_start<0) new_start =0;
            pg_intialize(new_start);
        });
    }
    if((pg_start+(table_row*5))>=pg_total){
        $("#pg_page_next").css("display","none");
    }else{
        $("#pg_page_next").css("display","block");
        $("#pg_page_next").on('click',function(){
            pg_intialize(pg_start+(table_row*5));
        });
    }
    draw_pg_table($("#pg_page_0"));
}
function draw_pg_table(data){

    $("#Table_pg").empty();
    if(null === pg_table) return;
    var sequence = (parseInt(data.html())-1)*table_row-pg_start;
    var txt = table_head;
    txt = txt +"<tbody>";
    var i;
    for(i=0;i<table_row;i++){
        if((sequence+i)<pg_table.length){
            if(0!==i%2){
                txt =txt+ "<tr class='success  li_menu' id='pg_table_cell"+i+"' PGCode='"+pg_table[sequence+i].PGCode+"'>";
            }else{ txt =txt+ "<tr class=' li_menu' id='pg_table_cell"+i+"' PGCode='"+pg_table[sequence+i].PGCode+"'>";}
            txt = txt +"<td>" + pg_table[sequence+i].PGCode+"</td>"+"<td>" + pg_table[sequence+i].PGName+"</td>"+"<td>" + pg_table[sequence+i].ChargeMan+"</td>"+"<td>" + pg_table[sequence+i].Telephone+"</td>";
            txt = txt +"<td>" + pg_table[sequence+i].Department+"</td>";

            txt = txt +"</tr>";
        }else{
            if(0!==i%2){
                txt =txt+ "<tr class='success' id='pg_table_cell"+i+"' PGCode='null'>";
            }else{ txt =txt+ "<tr  id='pg_table_cell"+i+"' PGCode='null'>";}
            txt = txt +"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>"+"<td>--</td>";
            txt = txt +"</tr>";
        }

    }
    txt = txt+"</tbody>";
    $("#Table_pg").append(txt);
    pg_table_cell_click = function(){
        if($(this).attr("PGCode") !="null"){
            for(var i=0;i<pg_table.length;i++){
                if($(this).attr("PGCode") == pg_table[i].PGCode){
                    pg_selected =pg_table[i];
                    break;
                }
            }
            Initialize_pg_detail();
            touchcookie();
        }
    };
    for(i=0;i<table_row;i++){
        $("#pg_table_cell"+i).on('click',pg_table_cell_click);
    }
    touchcookie();
}
