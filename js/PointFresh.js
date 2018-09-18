function clear_point_detail_panel(){
    point_selected = null;
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >站点编号：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >负责人：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >开工日期：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>站点名称：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>电话：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >面积：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>关联项目：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>单位：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >经度：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt >区县：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>纬度：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>街镇：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>地址：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "<dt>备注：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_point_detail").empty();
    $("#Label_point_detail").append(txt);
    $("#Table_point_device").empty();
    $("#Table_point_picture").empty();
}
function point_intialize(start) {
    point_initial = true;
    point_table = null;
    get_project_list();
    get_point_table(start, table_row * 5);
    clear_point_detail_panel();
}
function get_point_table(start,length){
    var body={
        startseq: start,
        length:length,
        keyword: global_key_word
    };
    var map={
        action:"PointTable",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_point_table_callback= function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        point_table = result.ret.pointtable;

        point_start = parseInt(result.ret.start);
        point_total = parseInt(result.ret.total);
        //HYJ add for server slow
        draw_point_table_head();
    };
    JQ_get(request_head,map,get_point_table_callback);
}
function draw_point_table_head(){
    if(null === point_table)return;
    var page_number = Math.ceil((point_table.length)/table_row);
    $("#Point_Page_control").empty();
    var txt = "<li>"+
        "<a href='#' id='point_page_prev'>Prev</a>"+
        "</li>";
    var page_start_number = Math.ceil(point_start/table_row);
    var i;
    for( i=0;i<page_number;i++){
        txt=txt+ "<li>"+
            "<a href='#' id='point_page_"+i+"'>"+(i+page_start_number+1)+"</a>"+
            "</li>";
    }
    txt=txt+"<li>"+
        "<a href='#' id='point_page_next'>Next</a>"+
        "</li>";
    $("#Point_Page_control").append(txt);
    table_head="<thead>"+
        "<tr>"+"<th>编号</th> <th>名称 </th> <th>项目</th> <th>责任人 </th> <th>电话 </th> ";
    table_head=table_head+"</tr></thread>";
    point_page_click = function(){
        draw_point_table($(this));
    };
    for( i=0;i<page_number;i++){
        $("#point_page_"+i).on('click',point_page_click);
    }
    if(point_start<=0){
        $("#point_page_prev").css("display","none");
    }else{
        $("#point_page_prev").css("display","block");
        $("#point_page_prev").on('click',function(){
            var new_start = point_start-(table_row*5);
            if(new_start<0) new_start =0;
            point_intialize(new_start);
        });
    }
    if((point_start+(table_row*5))>=point_total){
        $("#point_page_next").css("display","none");
    }else{
        $("#point_page_next").css("display","block");
        $("#point_page_next").on('click',function(){
            point_intialize(point_start+(table_row*5));
        });
    }
    draw_point_table($("#point_page_0"));
}
function draw_point_table(data){

    $("#Table_point").empty();
    if(null === point_table) return;
    var sequence = (parseInt(data.html())-1)*table_row-point_start;
    var txt = table_head;
    txt = txt +"<tbody>";
    var i;
    for( i=0;i<table_row;i++){
        if((sequence+i)<point_table.length){
            var projname ="";
            for(var j=0;j<project_list.length;j++){
                if(point_table[sequence+i].ProjCode == project_list[j].id){
                    projname = project_list[j].name;break;
                }
            }
            if(0!==i%2){
                txt =txt+ "<tr class='success li_menu' id='point_table_cell"+i+"' StatCode='"+point_table[sequence+i].StatCode+"'>";
            }else{ txt =txt+ "<tr class=' li_menu' id='point_table_cell"+i+"' StatCode='"+point_table[sequence+i].StatCode+"'>";}
            txt = txt +"<td>" + point_table[sequence+i].StatCode+"</td>"+
                "<td>" + point_table[sequence+i].StatName+"</td>"+
                "<td>" + projname+"</td>"+
                "<td>" + point_table[sequence+i].ChargeMan+"</td>"+
                "<td>" + point_table[sequence+i].Telephone+"</td>";

            txt = txt +"</tr>";
        }else{
            if(0!==i%2){
                txt =txt+ "<tr class='success' id='point_table_cell"+i+"' StatCode='null'>";
            }else{ txt =txt+ "<tr  id='point_table_cell"+i+"' StatCode='null'>";}
            txt = txt +"<td>--</td>"+
                "<td>--</td>"+
                "<td>--</td>"+
                "<td>--</td>"+
                "<td>--</td>"+"<td>--</td>";
            txt = txt +"</tr>";
        }

    }
    txt = txt+"</tbody>";
    $("#Table_point").append(txt);
    point_table_cell_click = function(){
        if($(this).attr("StatCode") !="null"){
            for(var i=0;i<point_table.length;i++){
                if($(this).attr("StatCode") == point_table[i].StatCode){
                    point_selected =point_table[i];
                    break;
                }
            }
            Initialize_point_detail();
            touchcookie();
        }
    };
    for( i=0;i<table_row;i++){
        $("#point_table_cell"+i).on('click',point_table_cell_click);
    }
    touchcookie();
}
