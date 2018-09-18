function get_monitor_warning_on_map(){
    if(monitor_selected === null||monitor_map_handle===null){
        return;
    }else {
        var body = {StatCode: monitor_selected.StatCode};
        var map = {
            action: "DevAlarm",
            body: body,
            type: "query",
            user: usr.id
        };
        var get_monitor_warning_on_map_callback = function (result) {
            if (result.status == "false") {
                show_expiredModule();
                return;
            }
            var ret = result.ret.alarmlist;
            var txt = "";
            if (ret == "false") {
                txt = "<Strong>获取告警失败</Strong>";
            } else {
                txt = "<div id ='Element_card_floating' align='center' ><p style='font-size:14px;font-weight: bold' >" + "站点名称：" + monitor_selected.StatName + "</p>" +
                    "<HR style='FILTER: alpha(opacity=100,finishopacity=0,style=3)' width='80%' color=#987cb9 SIZE=3/>" +
                    "<div style='font-size:10px; min-height: 350px; min-width:420px' >";
                txt = txt + " <div class='col-md-6 column'>";
                for (var i = 0; i < ret.length; i++) {
                    var nickname = ret[i].AlarmEName;
                    txt = txt + "<img src='./svg/icon/" + ret[i].AlarmEName + ".svg' style='width:36px;hight:36px'></img><label style='max-width: 150px;min-width: 150px'>&nbsp&nbsp&nbsp&nbsp" + ret[i].AlarmName + ":";
                    var value = ret[i].AlarmValue;//parseInt(ret[i].AlarmValue);
                    var warning = ret[i].WarningTarget;
                    if (warning == "true") {
                        txt = txt + "<Strong style='color:red'>" + value + "</Strong>" + ret[i].AlarmUnit + "</label>";
                    } else {
                        txt = txt + "<Strong>" + value + "</Strong>" + ret[i].AlarmUnit + "</label>";
                    }
                    //txt = txt +"<p></p>";
                    txt = txt + "<HR style='FILTER: alpha(opacity=100,finishopacity=0,style=3)' width='80%' color=#987cb9 SIZE=3/>";
                    if (i == ret.length / 2 - 1) {
                        txt = txt + "</div><div class='col-md-6 column'>";
                    }
                }
                txt = txt + "</div></div>";
            }
            if (monitor_map_handle !== null) {
                monitor_map_handle.setContent(txt);
            }
            $("#VideoStatCode_Input").val(monitor_selected.StatName);
            video_selection_change();
        };
        JQ_get(request_head, map, get_monitor_warning_on_map_callback);
    }
}
function video_selection_change(){
    if(monitor_selected!==null && $("#Video_query_Input").val()!==""){
    }
}