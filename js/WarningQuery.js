function query_warning(){
    if(Monitor_table_initialized !== true) return;
    ajax_process = function(i){
        var body={StatCode: $("#Monitor_table_cell"+i).attr('StatCode')};
        var map={
            action:"DevAlarm",
            body:body,
            type:"query",
            user:usr.id
        };
        var query_warning_callback = function(result){
            var txt = "";
            var StatCode = result.ret.StatCode;
            if(result.status == "false"){
                txt = "<Strong style='color:red'>未找到对应监控信息</Strong>";
            }else{
                txt = build_monitor_message(result.ret.alarmlist);
            }
            for(var i=0;i<(table_row*2);i++){
                if($("#Monitor_table_cell"+i).attr('StatCode') == StatCode){
                    $("#Monitor_table_cell"+i).empty();
                    $("#Monitor_table_cell"+i).append(txt);
                    break;
                }
            }
        };
        JQ_get(request_head,map,query_warning_callback);
    };
    for(var i=0;i<(table_row*2);i++){
        if($("#Monitor_table_cell"+i).attr('StatCode') === null) break;
        ajax_process(i);
    }
}
function build_monitor_message(alarmlist){
    var txt = "";

    if(alarmlist === null || alarmlist ===undefined) return txt;
    for(var i=0;i<alarmlist.length;i++){
        txt = txt + alarmlist[i].AlarmName+":";
        if(alarmlist[i].WarningTarget == "true") {txt = txt + "<Strong style='color:red'>";}
        txt = txt + alarmlist[i].AlarmValue+" ";
        if(alarmlist[i].WarningTarget == "true") {txt = txt + "</Strong>";}
        txt = txt + alarmlist[i].AlarmUnit+";";
    }
    return txt;
}