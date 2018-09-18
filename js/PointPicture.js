function get_point_picture(StatCode){
    var body={
        StatCode: StatCode
    };
    var map={
        action:"PointPicture",
        type:"query",
        body: body,
        user:usr.id
    };
    var get_point_device_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        point_selected_picture = result.ret;
        //HYJ add for server slow;
        draw_point_picture_panel();
    };
    JQ_get(request_head,map,get_point_device_callback);
}
function draw_point_picture_panel(){
    $("#Table_point_picture").empty();
    txt ="<thead> <tr> <th>安装照片 </th> </tr> </thead> <tbody >";
    if(point_selected_picture === null) point_selected_picture = [];
    for(var i=0;i<point_selected_picture.length;i++){
        txt = txt + "<tr> <td class='pictd' picurl='"+point_selected_picture[i].url+"' >"+ point_selected_picture[i].name+"</td> </tr>";
    }
    txt = txt+ "</tbody>";
    $("#Table_point_picture").append(txt);
    $(".pictd").on('click',function(){
        console.log(httphead+"//"+window.location.host+$(this).attr("picurl"));
        window.open(httphead+"//"+window.location.host+$(this).attr("picurl"),'监控照片',"height=480, width=640, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
    });

}