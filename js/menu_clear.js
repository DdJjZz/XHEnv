function clear_window(){
    $("#UserManageView").css("display","none");
    $("#PGManageView").css("display","none");
    $("#ProjManageView").css("display","none");
    $("#ParaManageView").css("display","none");
    $("#MPManageView").css("display","none");
    $("#DevManageView").css("display","none");
    $("#MPMonitorView").css("display","none");
    $("#MPMonitorTableView").css("display","none");
    $("#MPMonitorCardView").css("display","none");
    $("#MPMonitorStaticTableView").css("display","none");
    $("#WarningCheckView").css("display","none");
    $("#WarningHandleView").css("display","none");
    $("#Desktop").css("display","none");
    $("#Undefined").css("display","none");
    $("#KeyManageView").css("display","none");
    $("#KeyHistoryView").css("display","none");
    $("#KeyAuthView").css("display","none");
    $("#AuditStabilityView").css("display","none");
}

function dev_intialize(start) {
    device_initial = true;
    device_table = null;
    get_dev_table(start, table_row * 5);
    get_project_list();
    get_proj_point_list();
    clear_dev_detail_panel();
}
function show_searchbar(){
    global_key_word = "";
    $("#CommonQueryInput").val("");
    $("#QueryBar").css("display","block");
}
function hide_searchbar(){
    $("#QueryBar").css("display","none");
}
function calculate_row(){
    var screen_high = $(window).height();
    var add_row = parseInt( ($(window).height()-650)/100);
    if(add_row<=0)
        table_row=5;
    else if(add_row>=5)
        table_row=10;
    else
        table_row=table_row+add_row;

}
function show_table_tags(){
    $('#Warning_'+alarm_type_list[0].id+'_day').css('display','block');
}
function show_table_tags2(){
    alarm_interval_tab = '#Warning_'+alarm_type_list[0].id+'_month2';
    $('#Warning_'+alarm_type_list[0].id+'_month2').css('display','block');
}
function show_table_tags3(){
    if(alarm_interval_tab === null){
        $('#Warning_'+alarm_type_list[0].id+'_minute2').css('display','block');

        alarm_interval_tab = '#Warning_'+alarm_type_list[0].id+'_minute2';
    }else{
        $tail = alarm_interval_tab.split('_');
        if($tail[2] === "day2"||$tail[2] === "week2" ||$tail[2] === "month2"){
            $("#Alarm_chart_view2").css('display','block');
            $("#Alarm_chart_realtime_view2").css('display','none');
        }else{
            $("#Alarm_chart_view2").css('display','none');
            $("#Alarm_chart_realtime_view2").css('display','block');

        }
        $(alarm_interval_tab).css('display','block');
    }
}