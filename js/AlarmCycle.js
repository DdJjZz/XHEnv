function alarm_cycle(){
    if(alarm_map_initialized === false) return;
    get_monitor_alarm_list();
    window.setTimeout(alarm_addMarker, wait_time_long);
}
function get_monitor_alarm_list(){
    var map={
        action:"MonitorAlarmList",
        type:"query",
        user:usr.id
    };
    var get_monitor_list_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        alarm_map_list = result.ret;
    };
    JQ_get(request_head,map,get_monitor_list_callback);
}
function alarm_addMarker(point){
    if(CURRENT_URL != "WarningCheck") return;
    if(alarm_map_list === null)return;
    // 创建图标对象
    var myIcon = new BMap.Icon("./image/map-marker-ball-pink-small.png", new BMap.Size(32, 32),{
        anchor: new BMap.Size(16, 30)
    });
    alarm_mark_click = function(){
        get_select_alarm(this.getTitle());
        //console.log("Selected:"+alarm_selected.StatName);

        var sContent = this.getTitle();
        var infoWindow = new BMap.InfoWindow(sContent,{offset:new BMap.Size(0,-23)});
        infoWindow.setWidth(400);
        alarm_map_handle = infoWindow;
        get_alarmpointinfo_on_map();
        this.openInfoWindow(infoWindow);
        infoWindow.addEventListener("close",function(){
            if(alarm_map_handle == this) alarm_map_handle = null;
        });
    };
    if(alarm_map_list === null) alarm_map_list = [];
    for(var i=0;i<alarm_map_list.length;i++){
        var t_point = new BMap.Point(parseFloat(alarm_map_list[i].Longitude),parseFloat(alarm_map_list[i].Latitude));
        var marker = new BMap.Marker(t_point, {icon: myIcon});
        marker.setTitle(alarm_map_list[i].StatCode+":"+alarm_map_list[i].StatName);
        map_AlarmMonitor.addOverlay(marker);
        marker.addEventListener("click",alarm_mark_click);
    }

}
function get_alarmpointinfo_on_map(){
    if(alarm_selected === null||alarm_map_handle===null){
        return;
    }else{
        txt = "<div id ='Element_card_floating'><p style='font-size:14px;' >"+"站点名称："+alarm_selected.StatName+"</p>"+
            "<HR style='FILTER: alpha(opacity=100,finishopacity=0,style=3)' width='80%' color=#987cb9 SIZE=3/>" +
            "<div style='font-size:10px;' >" +
            "站点地址："+alarm_selected.Address+"</div></div>";
    }
    if(alarm_map_handle!==null){
        alarm_map_handle.setContent(txt);
    }
    $("#WCStatCode_Input").val(alarm_selected.StatName);
}