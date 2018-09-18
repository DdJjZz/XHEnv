function draw_user_table(data){
    $("#Table_user").empty();
    if(null === user_table) return;
    var sequence = (parseInt(data.html())-1)*table_row-user_start;
    var txt = table_head;
    txt = txt +"<tbody>";
    var i;
    for(i=0;i<table_row;i++){
        if((sequence+i)<user_table.length){
            if(0!==i%2){
                txt =txt+ "<tr class='success li_menu' id='table_cell"+i+"' userid='"+user_table[sequence+i].id+"'>";
            }else{ txt =txt+ "<tr class='li_menu' id='table_cell"+i+"' userid='"+user_table[sequence+i].id+"'>";}
            txt = txt +"<td>" + user_table[sequence+i].id+"</td>" +"<td>" + user_table[sequence+i].name+"</td>" +"<td>" + user_table[sequence+i].nickname+"</td>" +"<td>" + user_table[sequence+i].mobile+"</td>";
            txt = txt+"<td>"+get_user_level(user_table[sequence+i].type)+"</td>";
            txt = txt +"<td>" + user_table[sequence+i].date+"</td>";

            txt = txt +"</tr>";
        }else{
            if(0!==i%2){
                txt =txt+ "<tr class='success' id='table_cell"+i+"' userid='null'>";
            }else{ txt =txt+ "<tr  id='table_cell"+i+"' userid='null'>";}
            txt = txt +"<td>--</td>" +"<td>--</td>" +"<td>--</td>" +"<td>--</td>" +"<td>--</td>" +"<td>--</td>";
            txt = txt +"</tr>";
        }

    }
    txt = txt+"</tbody>";

    $("#Table_user").append(txt);
    table_cell_click = function(){
        if($(this).attr("userid") !="null"){
            for(var i=0;i<user_table.length;i++){
                if($(this).attr("userid") == user_table[i].id){
                    user_selected =user_table[i];
                    break;
                }
            }

            Initialize_user_detail();
            touchcookie();
        }
    };
    for(i=0;i<table_row;i++){
        $("#table_cell"+i).on('click',table_cell_click);
    }

}
function Initialize_user_detail(){

    draw_user_detail_panel();
    get_user_proj(user_selected.id);
}

function draw_user_detail_panel(){
    $("#Label_user_detail").empty();
    if(user_selected_auth === null) return;
    var usertype=get_user_level(user_selected.type);
    var txt = "<p></p><p></p>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt >用户名：</dt><dd>"+user_selected.name+"</dd>"+
        "<dt >用户类型：</dt><dd>"+usertype+"</dd>"+
        "<dt >联系方式：</dt><dd>"+user_selected.mobile+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>"+
        "<dl >"+
        "<dt>用户昵称：</dt><dd>"+user_selected.nickname+"</dd>"+
        "<dt>修改日期：</dt><dd>"+user_selected.date+"</dd>"+
        "<dt>邮箱：</dt><dd>"+user_selected.mail+"</dd>"+
        "</dl>"+
        "</div>"+
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>"+
        "<dl >"+
        "<dt>备注：</dt><dd>"+user_selected.memo+"</dd>"+
        "</dl>"+
        "</div>";
    $("#Label_user_detail").append(txt);
}
function get_user_proj(user){
    var body = {
        userid: user
    };
    var map={
        action:"UserProj",
        body:body,
        type:"query",
        user:usr.id
    };
    var get_user_proj_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        user_selected_auth = result.ret;
        //HYJ add for server slow;
        draw_user_detail_proj_table();
    };
    JQ_get(request_head,map,get_user_proj_callback);
}
function draw_user_detail_proj_table(){
    $("#Table_user_authed").empty();
    txt ="<thead> <tr> <th>已关联项目 </th> </tr> </thead> <tbody >";
    for(var i=0;i<user_selected_auth.length;i++){
        txt = txt + "<tr> <td>"+ user_selected_auth[i].name+"</td> </tr>";
    }
    txt = txt+ "</tbody>";
    $("#Table_user_authed").append(txt);
}