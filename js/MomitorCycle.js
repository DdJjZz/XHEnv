function monitor_cycle(){
    if(map_initialized === false) return;
    get_monitor_list();
    window.setTimeout(addMarker, wait_time_long);
}
function get_monitor_list(){
    var map={
        action:"MonitorList",
        type:"query",
        user:usr.id
    };
    //console.log(map);
    var get_monitor_list_callback = function(result){
        if(result.status == "false"){
            show_expiredModule();
            return;
        }
        monitor_map_list = result.ret;
        addMarker();
    };
    JQ_get(request_head,map,get_monitor_list_callback);
}