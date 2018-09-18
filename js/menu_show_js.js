function user_manager(){
    clear_window();
    write_title("用户管理","根据您的权限对用户进行添加/删除/修改等操作");
    $("#UserManageView").css("display","block");
    show_searchbar();
    if(!user_initial){ user_intialize(0);}
}

function key_manage(){
    clear_window();
    write_title("钥匙管理","根据您的权限对项目组进行添加/删除/修改等操作");
    $("#KeyManageView").css("display","block");
    show_searchbar();
    if(!key_initial){ key_intialize(0);}
}
function pg_manage(){
    clear_window();
    write_title("项目组管理","根据您的权限对项目组进行添加/删除/修改等操作");
    $("#PGManageView").css("display","block");
    show_searchbar();
    if(!pg_initial){ pg_intialize(0);}
}
function proj_manage(){
    clear_window();
    write_title("项目管理","根据您的权限对项目进行添加/删除/修改等操作");
    $("#ProjManageView").css("display","block");
    show_searchbar();
    proj_intialize(0);
}
function para_manage(){
    clear_window();
    write_title("参数管理","您可以在这里升级您的设备版本");
    $("#ParaManageView").css("display","block");
    hide_searchbar();
    if(!parameter_initial)parameter_initialize();
}
function mp_manage(){
    clear_window();
    write_title("站点管理","根据您的权限对站点进行配置");
    $("#MPManageView").css("display","block");
    show_searchbar();
    if(!point_initial){ point_intialize(0);}
}
function dev_manage(){
    clear_window();
    write_title("设备管理","根据您的权限对设备进行配置");
    $("#DevManageView").css("display","block");
    show_searchbar();
    if(!device_initial){ dev_intialize(0);}
}
function mp_monitor(){
    clear_window();
    write_title("地图监控","在地图上对站点进行监控");
    CURRENT_URL = "MPMonitor";
    $("#MPMonitorView").css("display","block");
    console.log("into map:"+map_initialized);
    hide_searchbar();
    initializeMap();
}
function mp_monitor_table(){
    clear_window();
    write_title("站点聚合","实时刷新");
    $("#MPMonitorTableView").css("display","block");
    hide_searchbar();
    if(!Monitor_table_initialized)initialize_warning_table();

}
function mp_monitor_card(){
    clear_window();
    write_title("站点列块","点选设备卡片以获得详细信息");
    hide_searchbar();
    $("#MPMonitorCardView").css("display","block");
}
function mp_static_monitor_table(){
    clear_window();
    write_title("站点聚合","请手工刷新");
    $("#MPMonitorStaticTableView").css("display","block");
    hide_searchbar();
    query_static_warning();

}
function warning_check(){
    clear_window();
    write_title("告警查看","可以导出报表");
    $("#WarningCheckView").css("display","block");
    hide_searchbar();
    if(!alarm_map_initialized)initializeAlarmMap();
}
function warning_handle(){
    clear_window();
    $("#WarningHandleView").css("display","block");
    write_title("告警处理","请查看报表");
    hide_searchbar();
    //query_warning_handle_list();
    warning_handle_initialize();
}
function Inst_Conf(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Inst_Read(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Inst_Design(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Inst_Control(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Inst_Snapshot(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Inst_Video(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Audit_Target(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Audit_Stability(){
    clear_window();
    write_title("稳定性统计","请手工刷新");
    hide_searchbar();
    $("#AuditStabilityView").css("display","block");
    query_audit_stability();
}
function Audit_Availability(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Audit_Error(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Audit_Quality(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Geo_InfoQuery(){
    clear_window();
    CURRENT_URL="Undefined";
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Geo_TrendAnalysis(){
    clear_window();
    CURRENT_URL="Undefined";
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Geo_DisaterForecast(){
    clear_window();
    CURRENT_URL="Undefined";
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Geo_EmergencyDirect(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Geo_DiffusionAnalysis(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Work_flowDesign(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Order_Management(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Unloading_Management(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function Order_Audit(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function AD_Conf(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function WEB_Conf(){
    clear_window();
    write_title("施工中","");
    hide_searchbar();
    $("#Undefined").css("display","block");
}
function key_auth(){
    clear_window();
    write_title("钥匙授权","");
    $("#KeyAuthView").css("display","block");
    key_auth_initialize();
}
function key_history(){
    clear_window();
    write_title("开锁历史查询","请输入查询条件");
    $("#KeyHistoryView").css("display","block");
    key_history_initialize();
}
function desktop(){
    clear_window();
    hide_searchbar();
    write_title("欢迎","请选择您需要的功能");
    $("#Desktop").css("display","block");
}