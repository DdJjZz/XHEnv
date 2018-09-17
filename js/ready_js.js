$(document).ready(function() {
    console.log('Jerry is First');
    var items = document.querySelectorAll('.cycle-menuItem');
    console.log("items="+items.length);
    for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4)-(i+1)*15 + "%";
    }
    document.querySelector('.cycle-circle').classList.toggle('open');
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        $RIGHT_COL.css('min-height', $(window).height());
        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $FOOTER.outerHeight(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
        contentHeight -= $NAV_MENU.outerHeight() + footerHeight;
        $RIGHT_COL.css('min-height', contentHeight);
    };
    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();
        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            $li.addClass('active');
            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });
    $MENU_TOGGLE.on('click', function() {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }
        $BODY.toggleClass('nav-md nav-sm');
        setContentHeight();
    });
    $SIDEBAR_MENU.find('a[href="#"]').on('click',function(){
        if (!$BODY.hasClass('nav-md')){
            $(this).parent().parent().slideUp();
        }
    });
    $(window).smartresize(function(){
        setContentHeight();
    });
    setContentHeight();
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
    $(".camerazoom").ionRangeSlider({
        min: -180,
        max: 180,
        grid: true,
        force_edges: true,
        onFinish:function(data){
            var statcode = $("#VideoModuleStatCode_Input").val();
            var vorh = "z";
            var value = data.from;
            move_camera(statcode,vorh,value);
        }
    });
    $(".rtspzoom").ionRangeSlider({
        min: -10,
        max: 10,
        from:0,
        grid: true,
        force_edges: true,
    });
});
$(document).ready(function() {
    console.log('Tom is First');
    $("[data-toggle='modal']").click(function(){
        var _target = $(this).attr('data-target');
        t=setTimeout(function () {
            var _modal = $(_target).find(".modal-dialog");
            _modal.animate({'margin-top': parseInt(($(window).height() - _modal.height())/2)}, 300 );
        },wait_time_short);
    });
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    NewUserAuthDual2 = $('.NewUserAuthDual').bootstrapDualListbox(
        { nonSelectedListLabel: '全部项目（组）', selectedListLabel: '用户权限', preserveSelectionOnMove: 'moved', moveOnSelect: true, nonSelectedFilter: '',showFilterInputs: false,infoText:""});
    $("#showValue").click(function () { alert($('[name="duallistbox_demo1"]').val());});
    NewPGProjDual2 = $('.NewPGProjDual').bootstrapDualListbox(
        { nonSelectedListLabel: '全部项目', selectedListLabel: '本组包含', preserveSelectionOnMove: 'moved', moveOnSelect: true, nonSelectedFilter: '',showFilterInputs: false,infoText:""});
    DevUpdateDual2 = $('.DevUpdateAuthDual').bootstrapDualListbox(
        { nonSelectedListLabel: '当前设备', selectedListLabel: '需要升级', preserveSelectionOnMove: 'moved', moveOnSelect: true, nonSelectedFilter: '',showFilterInputs: false,infoText:""});
    $("#Desktop").css("min-height",window.screen.availHeight-300);
    $("#Undefined").css("min-height",window.screen.availHeight-300);
    var monitor_handle= setInterval(get_monitor_warning_on_map, cycle_time);
    var monitor_table_handle= setInterval(query_warning, cycle_time);
    var monitor_alarm_handle= setInterval(alarm_cycle, cycle_time);
    var monitor_pin_handle= setInterval(monitor_cycle, cycle_time);
    //var monitor_PPT_handle= setInterval(PPTshow, show_time);
    PageInitialize();
    $("#menu_logout").on('click',function(){
        logout();
    });
    //LEFT menu
    $("#UserManage").on('click',function(){
        CURRENT_URL = "UserManage";
        active_menu("UserManage");
        touchcookie();
        user_manager();
    });
    $("#KeyManage").on('click',function(){
        CURRENT_URL = "KeyManage";
        active_menu("KeyManage");
        touchcookie();
        key_manage();
    });
    $("#PGManage").on('click',function(){
        CURRENT_URL = "PGManage";
        active_menu("PGManage");
        touchcookie();
        pg_manage();
    });
    $("#ProjManage").on('click',function(){
        CURRENT_URL = "ProjManage";
        active_menu("ProjManage");
        touchcookie();
        proj_manage();
    });
    $("#ParaManage").on('click',function(){
        CURRENT_URL = "ParaManage";
        active_menu("ParaManage");
        touchcookie();
        para_manage();
    });
    $("#MPManage").on('click',function(){
        CURRENT_URL = "MPManage";
        active_menu("MPManage");
        touchcookie();
        mp_manage();
    });
    $("#DevManage").on('click',function(){
        CURRENT_URL = "DevManage";
        active_menu("DevManage");
        touchcookie();
        dev_manage();
    });
    $("#MPMonitor").on('click',function(){
        CURRENT_URL = "MPMonitor";
        active_menu("MPMonitor");
        touchcookie();
        mp_monitor();
    });
    $("#MPMonitorTable").on('click',function(){
        CURRENT_URL = "MPMonitorTable";
        active_menu("MPMonitorTable");
        touchcookie();
        mp_monitor_table();
    });
    $("#MPMonitorCard").on('click',function(){
        CURRENT_URL = "MPMonitorCard";
        active_menu("MPMonitorCard");
        touchcookie();
        mp_monitor_card();
    });
    $("#MPStaticMonitorTable").on('click',function(){
        CURRENT_URL = "MPStaticMonitorTable";
        active_menu("MPStaticMonitorTable");
        touchcookie();
        mp_static_monitor_table();
    });
    $("#WarningCheck").on('click',function(){
        CURRENT_URL = "WarningCheck";
        active_menu("WarningCheck");
        touchcookie();
        warning_check();
    });
    $("#WarningHandle").on('click',function(){
        CURRENT_URL = "WarningHandle";
        active_menu("WarningHandle");
        touchcookie();
        warning_handle();
    });
    $("#InstConf").on('click',function(){
        CURRENT_URL = "InstConf";
        active_menu("InstConf");
        touchcookie();
        Inst_Conf();
    });
    $("#InstRead").on('click',function(){
        CURRENT_URL = "InstRead";
        active_menu("InstRead");

        touchcookie();
        Inst_Read();
    });
    $("#InstDesign").on('click',function(){
        CURRENT_URL = "InstDesign";
        active_menu("InstDesign");
        touchcookie();
        Inst_Design();
    });
    $("#InstControl").on('click',function(){
        CURRENT_URL = "InstControl";
        active_menu("InstControl");
        touchcookie();
        Inst_Control();
    });
    $("#InstSnapshot").on('click',function(){
        CURRENT_URL = "InstSnapshot";
        active_menu("InstSnapshot");
        touchcookie();
        Inst_Snapshot();
    });
    $("#InstVideo").on('click',function(){
        CURRENT_URL = "InstVideo";
        active_menu("InstVideo");
        touchcookie();
        Inst_Video();
    });
    $("#AuditTarget").on('click',function(){
        CURRENT_URL = "AuditTarget";
        active_menu("AuditTarget");
        touchcookie();
        Audit_Target();
    });
    $("#AuditStability").on('click',function(){
        CURRENT_URL = "AuditStability";
        active_menu("AuditStability");
        touchcookie();
        Audit_Stability();
    });
    $("#AuditAvailability").on('click',function(){
        CURRENT_URL = "AuditAvailability";
        active_menu("AuditAvailability");
        touchcookie();
        Audit_Availability();
    });
    $("#AuditError").on('click',function(){
        CURRENT_URL = "AuditError";
        active_menu("AuditError");
        touchcookie();
        Audit_Error();
    });
    $("#AuditQuality").on('click',function(){
        CURRENT_URL = "AuditQuality";
        active_menu("AuditQuality");
        touchcookie();
        Audit_Quality();
    });
    $("#GeoInfoQuery").on('click',function(){
        CURRENT_URL = "GeoInfoQuery";
        active_menu("GeoInfoQuery");
        touchcookie();
        Geo_InfoQuery();
    });
    $("#GeoTrendAnalysis").on('click',function(){
        CURRENT_URL = "GeoTrendAnalysis";
        active_menu("GeoTrendAnalysis");
        touchcookie();
        Geo_TrendAnalysis();
    });
    $("#GeoDisaterForecast").on('click',function(){
        CURRENT_URL = "GeoDisaterForecast";
        active_menu("GeoDisaterForecast");
        touchcookie();
        Geo_DisaterForecast();
    });
    $("#GeoEmergencyDirect").on('click',function(){
        CURRENT_URL = "GeoEmergencyDirect";
        active_menu("GeoEmergencyDirect");
        touchcookie();
        Geo_EmergencyDirect();
    });
    $("#GeoDiffusionAnalysis").on('click',function(){
        CURRENT_URL = "GeoDiffusionAnalysis";
        active_menu("GeoDiffusionAnalysis");
        touchcookie();
        Geo_DiffusionAnalysis();
    });
    $("#WorkflowDesign").on('click',function(){
        CURRENT_URL = "WorkflowDesign";
        active_menu("WorkflowDesign");
        touchcookie();
        Work_flowDesign();
    });
    $("#OrderManagement").on('click',function(){
        CURRENT_URL = "OrderManagement";
        active_menu("OrderManagement");
        touchcookie();
        Order_Management();
    });
    $("#UnloadingManagement").on('click',function(){
        CURRENT_URL = "UnloadingManagement";
        active_menu("UnloadingManagement");
        touchcookie();
        Unloading_Management();
    });
    $("#OrderAudit").on('click',function(){
        CURRENT_URL = "OrderAudit";
        active_menu("OrderAudit");
        touchcookie();
        Order_Audit();
    });
    $("#ADConf").on('click',function(){
        CURRENT_URL = "ADConf";
        active_menu("ADConf");
        touchcookie();
        AD_Conf();
    });
    $("#WEBConf").on('click',function(){
        CURRENT_URL = "WEBConf";
        active_menu("WEBConf");
        touchcookie();
        WEB_Conf();
    });
    $("#KeyManage").on('click',function(){
        CURRENT_URL = "KeyManage";
        active_menu("KeyManage");
        touchcookie();
        key_manage();
        //KEY_Manage();
    });
    $("#KeyAuth").on('click',function(){
        CURRENT_URL = "KeyAuth";
        active_menu("KeyAuth");
        touchcookie();
        key_auth();
    });
    $("#KeyHistory").on('click',function(){
        CURRENT_URL = "KeyHistory";
        active_menu("KeyHistory");
        touchcookie();
        key_history();
    });
    //user view buttons
    $("#UserfreshButton").on('click',function(){
        touchcookie();
        clear_user_detail_panel();
        user_intialize(0);
    });
    $("#UserExportButton").on('click',function(){
        touchcookie();
        //alert("Not support yet");
        var condition_user = [];//new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("用户表导出","usertable",condition_user,[]);
    });
    $("#UserNewButton").on('click',function(){
        touchcookie();
        show_new_user_module();
    });
    $("#UserDelButton").on('click',function(){
        touchcookie();
        if(user_selected === null){
            show_alarm_module(true,"请选择一个用户",null);
        }else{
            modal_middle($('#UserDelAlarm'));
            $('#UserDelAlarm').modal('show');
        }
    });
    $("#UserModifyButton").on('click',function(){
        touchcookie();
        if(user_selected === null){
            show_alarm_module(true,"请选择一个用户",null);
        }else{
            show_mod_user_module(user_selected,user_selected_auth);
        }
    });
    $("#delUserCommit").on('click',function(){
        del_user(user_selected.id);
        touchcookie();
    });
    $("#newUserCommit").on('click',function(){
        if(user_module_status){
            submit_new_user_module();
            touchcookie();
        }else{
            submit_mod_user_module();
            touchcookie();
        }
    });
    //pg view buttons
    $("#PGfreshButton").on('click',function(){
        touchcookie();
        clear_pg_detail_panel();
        pg_intialize(0);
    });
    $("#PGExportButton").on('click',function(){
        touchcookie();
        var condition_user = [];//new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("项目组表导出","PGtable",condition_user,[]);//new Array());
    });
    $("#PGNewButton").on('click',function(){
        touchcookie();
        show_new_pg_module();
    });
    $("#PGDelButton").on('click',function(){
        touchcookie();
        if(pg_selected === null){
            show_alarm_module(true,"请选择一个项目组",null);
        }else{
            modal_middle($('#PGDelAlarm'));
            $('#PGDelAlarm').modal('show');
        }
    });
    $("#PGModifyButton").on('click',function(){
        touchcookie();
        if(pg_selected === null){
            show_alarm_module(true,"请选择一个项目组",null);
        }else{
            show_mod_pg_module(pg_selected,pg_selected_proj);
        }
    });
    $("#delPGCommit").on('click',function(){
        del_pg(pg_selected.PGCode);
        touchcookie();
    });
    $("#newPGCommit").on('click',function(){
        if(pg_module_status){
            submit_new_pg_module();
            touchcookie();
        }else{
            submit_mod_pg_module();
            touchcookie();
        }
    });
// project view buttons


    $("#ProjfreshButton").on('click',function(){
        touchcookie();
        clear_proj_detail_panel();
        proj_intialize(0);
    });
    $("#ProjExportButton").on('click',function(){
        touchcookie();
        var condition_user = [];//new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("项目表导出","Projtable",condition_user,[]);//new Array());
    });
    $("#ProjNewButton").on('click',function(){
        touchcookie();
        show_new_proj_module();
    });
    $("#ProjDelButton").on('click',function(){
        touchcookie();
        if(project_selected === null){
            show_alarm_module(true,"请选择一个项目",null);
        }else{
            modal_middle($('#ProjDelAlarm'));
            $('#ProjDelAlarm').modal('show');
        }
    });
    $("#ProjModifyButton").on('click',function(){
        touchcookie();
        if(project_selected === null){
            show_alarm_module(true,"请选择一个项目",null);
        }else{
            show_mod_proj_module(project_selected);
        }
    });
    $("#delProjCommit").on('click',function(){
        del_proj(project_selected.ProjCode);
        touchcookie();
    });
    $("#newProjCommit").on('click',function(){
        if(project_module_status){
            submit_new_proj_module();
            touchcookie();
        }else{
            submit_mod_proj_module();

            touchcookie();
        }
    });
    $("#PointfreshButton").on('click',function(){
        touchcookie();
        clear_point_detail_panel();
        point_intialize(0);
    });
    $("#PointExportButton").on('click',function(){
        touchcookie();
        var condition_user = [];// new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("站点导出","Pointtable",condition_user,[]);//new Array());
    });
    $("#PointNewButton").on('click',function(){
        touchcookie();
        show_new_point_module();
    });
    $("#PointDelButton").on('click',function(){
        touchcookie();
        if(point_selected === null){
            show_alarm_module(true,"请选择一个站点",null);
        }else{
            modal_middle($('#PointDelAlarm'));
            $('#PointDelAlarm').modal('show');
        }
    });
    $("#PointModifyButton").on('click',function(){
        touchcookie();
        if(point_selected === null){
            show_alarm_module(true,"请选择一个站点",null);
        }else{
            show_mod_point_module(point_selected);
        }
    });
    $("#delPointCommit").on('click',function(){
        //发送请求并且告知成功失败
        //刷新表格
        del_point(point_selected.StatCode);
        touchcookie();
    });
    $("#newPointCommit").on('click',function(){
        //检查输入项目
        //发送请求
        //刷新表格
        if(point_module_status){
            submit_new_point_module();
            touchcookie();
        }else{
            submit_mod_point_module();

            touchcookie();
        }
    });


// device view buttons
    $("#DevfreshButton").on('click',function(){
        touchcookie();
        clear_dev_detail_panel();
        dev_intialize(0);
    });
    $("#DevExportButton").on('click',function(){
        touchcookie();
        var condition_user = [];//new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("设备表导出","Devtable",condition_user,[]);//new Array());
    });
    $("#DevNewButton").on('click',function(){
        touchcookie();
        show_new_dev_module();
    });
    $("#DevDelButton").on('click',function(){
        touchcookie();
        if(device_selected === null){
            show_alarm_module(true,"请选择一个设备",null);
        }else{
            modal_middle($('#DevDelAlarm'));
            $('#DevDelAlarm').modal('show');
        }
    });
    $("#DevModifyButton").on('click',function(){
        touchcookie();
        if(device_selected === null){
            show_alarm_module(true,"请选择一个设备",null);
        }else{
            show_mod_dev_module(device_selected);
        }
    });
    $("#delDevCommit").on('click',function(){
        //发送请求并且告知成功失败
        //刷新表格
        del_dev(device_selected.DevCode);
        touchcookie();
    });
    $("#newDevCommit").on('click',function(){
        //检查输入项目
        //发送请求
        //刷新表格
        if(device_module_status){
            submit_new_dev_module();
            touchcookie();
        }else{
            submit_mod_dev_module();

            touchcookie();
        }
    });

    $("#DevProjCode_choice").change(function(){
        get_proj_point_option($("#DevProjCode_choice").val(),$("#DevStatCode_choice"),"");
    });
    $("#QueryProjCode_choice").change(function(){
        get_proj_point_option($("#QueryProjCode_choice").val(),$("#QueryStatCode_choice"),"");
    });
    $("#AlarmQueryCommit").on('click',function(){

        touchcookie();
        if(alarm_selected === null){
            $("#WCStatCode_Input").attr("placeholder","请先在地图上选择一个点");
            return;
        }

        if($("#Alarm_query_Input").val()==="" || $("#Alarm_query_Input").val() === null){
            $("#Alarm_query_Input").attr("placeholder","请输入日期");
            return;
        }

        if(alarm_type_list!== null){
            unhide_all_chart();
            for(var i=0;i<alarm_type_list.length;i++){
                query_alarm($("#Alarm_query_Input").val(),alarm_type_list[i].id,alarm_type_list[i].name);
            }
        }
        //window.setTimeout(show_table_tags, wait_time_long);


    });
    $('#Alarm_query_choice').change(function(){
        var temp = $(this).val();
        if(temp === "0"){
            $("#Alarm_query_Input2").val("");
            $("#Alarm_date_button").css("display","none");
            $("#Alarm_chart_view2").css('display','none');
            $("#Alarm_chart_realtime_view2").css('display','block');
        }else{
            $("#Alarm_date_button").css("display","block");

            $("#Alarm_chart_view2").css('display','block');
            $("#Alarm_chart_realtime_view2").css('display','none');
        }
    });
    $("#AlarmQueryCommit2").on('click',function(){

        touchcookie();
        if(alarm_selected === null){
            $("#WCStatCode_Input2").attr("placeholder","请先在地图上选择一个点");
            return;
        }
        var temp = $('#Alarm_query_choice').val();
        if(temp === "1"){
            if($("#Alarm_query_Input2").val()==="" || $("#Alarm_query_Input2").val() === null){
                $("#Alarm_query_Input2").attr("placeholder","请输入日期");
                return;
            }
        }
        var i;
        if(alarm_type_list!== null&temp === "1"){
            unhide_all_chart();
            alarm_interval_tab = null;
            if(alarm_interval!== null){ clearInterval(alarm_interval);alarm_interval= null;}
            for(i=0;i<alarm_type_list.length;i++){
                query_alarm2($("#Alarm_query_Input2").val(),alarm_type_list[i].id,alarm_type_list[i].name);
            }
        }else{
            unhide_all_chart();
            alarm_interval_tab = null;
            if(alarm_interval!== null){ clearInterval(alarm_interval);}
            for(i=0;i<alarm_type_list.length;i++){
                query_alarm3(alarm_type_list[i].id,alarm_type_list[i].name);
            }
            alarm_interval = setInterval(function(){
                for(i=0;i<alarm_type_list.length;i++){
                    query_alarm3(alarm_type_list[i].id,alarm_type_list[i].name);
                }
            },cycle_time);
        }


    });
    $("#Video_query_Input").change(function(){
        $("#Video_query_Input").val(date_compare_today($("#Video_query_Input").val()));
        video_selection_change();
    });
    $("#VideoHour_choice").change(function(){
        video_selection_change();
    });
    $("#VideoModuleHour_choice").change(function(){
        video_Module_selection_change();
    });
    $("#VideoModule_query_Input").change(function(){
        video_Module_selection_change();
    });
    $("#Alarm_query_Input").change(function(){
        $("#Alarm_query_Input").val(date_compare_today($("#Alarm_query_Input").val()));
    });
    $("#Alarm_query_Input2").change(function(){
        $("#Alarm_query_Input2").val(date_compare_today($("#Alarm_query_Input2").val()));
    });
    $("#AlarmExport").on('click',function() {
        touchcookie();
        Data_export_alarm();
    });
    $("#AlarmExport2").on('click',function() {
        touchcookie();
        Data_export_alarm2();
    });
    $("#AlarmQuery_Commit").on('click',function() {
        touchcookie();
        submit_alarm_query();
    });
    $("#SensorUpdateCommit").on('click',function() {
        touchcookie();
        submit_sensor_module();
    });
    $("#ExpiredConfirm").on('click',function() {
        logout();
    });
    $("#QueryStartTime_Input").change(function(){
        $("#QueryStartTime_Input").val(date_compare_today($("#QueryStartTime_Input").val()));
        if( $("#QueryEndTime_Input").val()===""){
            $("#QueryEndTime_Input").val($("#QueryStartTime_Input").val());
        }else{
            $("#QueryEndTime_Input").val(date_compare($("#QueryEndTime_Input").val(),$("#QueryStartTime_Input").val()));
        }
    });
    $("#QueryEndTime_Input").change(function(){
        if( $("#QueryStartTime_Input").val()==="") {
            $("#QueryEndTime_Input").val(date_compare_today($("#QueryEndTime_Input").val()));
            $("#QueryStartTime_Input").val($("#QueryStartTime_Input").val());
        }else{
            $("#QueryEndTime_Input").val(date_compare($("#QueryEndTime_Input").val(),$("#QueryStartTime_Input").val()));
        }
    });
    $("#VCRshow").on('click',function() {
        var vcraddress = $("#VCRStatus_choice").val();
        if(vcraddress === "") return;
        video_windows(vcraddress);
    });
    $("#VideoWindow").on('click',function() {
        if(monitor_selected === null) return;
        get_camera_and_video_web(monitor_selected.StatCode,false,true);
    });
    $("#CameraWindow").on('click',function() {
        if(monitor_selected === null) return;
        get_camera_and_video_web(monitor_selected.StatCode,true,false);
    });
    $("#ModuleVCRshow").on('click',function() {
        var vcraddress = $("#ModuleVCRStatus_choice").val();
        if(vcraddress === "") return;
        window.open(httphead+"//"+vcraddress,'监控照片',"height=480, width=640, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
    });
    $("#ModuleVCRreset").on('click',function() {
        reset_camera($("#VideoModuleStatCode_Input").val());
    });
    $("#MonitorTableFlash").on('click',function() {
        query_static_warning();
    });
    $("#WarningHandleTableFlash").on('click',function() {
        query_warning_handle_list();
    });
    $("#AuditStabilityFlash").on('click',function() {
        query_audit_stability();
    });

    $("#menu_user_profile").on('click',function() {
        touchcookie();
        show_usr_msg_module();
    });
    $("#ScreenSaver").on('click',function() {
        if(monitor_selected === null) return;
        screen_windows();
    });
    $("#UsrMsgCommit").on('click',function() {
        touchcookie();
        user_message_update();
    });

    $("#UsrImgClean").on('click',function() {
        touchcookie();
        clear_user_image();
    });
    $("#UsrImgFlash").on('click',function() {
        touchcookie();
        get_user_image();
    });
    $("#UpdateConfirm_button").on('click',function() {
        touchcookie();
        update_version();
    });
    $("#btn_camera_up").on('click',function() {
        var camera_state_code = $('#VideoModuleStatCode_Input').val();
        if(camera_state_code!==undefined && camera_state_code!==""){
            move_camera(camera_state_code,"v","1");
        }
    });
    $("#btn_camera_down").on('click',function() {
        var camera_state_code = $('#VideoModuleStatCode_Input').val();
        if(camera_state_code!==undefined && camera_state_code!==""){
            move_camera(camera_state_code,"v","-1");
        }
    });
    $("#btn_camera_right").on('click',function() {
        var camera_state_code = $('#VideoModuleStatCode_Input').val();
        if(camera_state_code!==undefined && camera_state_code!==""){
            move_camera(camera_state_code,"h","1");
        }
    });
    $("#btn_camera_left").on('click',function() {
        var camera_state_code = $('#VideoModuleStatCode_Input').val();
        if(camera_state_code!==undefined && camera_state_code!==""){
            move_camera(camera_state_code,"h","-1");
        }
    });
    $(".lock_monitor_btn").on('click',function() {
        monitor_lock();
    });
    $('#UnlockConfirmBtn').on('click',function() {
        var statcode = $(this).attr("StateCode");
        //console.log("["+statcode+"]");
        if(statcode!==undefined&&statcode!=="" ){
            openlock(statcode);
        }
    });
    $('.keyrow').on('click',function() {
        var keyid = $(this).attr("id");
        if(keyid!==undefined&&keyid!=="" ){
            get_key_auth_list(keyid);
        }
    });


// key view buttons
    $("#KeyfreshButton").on('click',function(){
        touchcookie();
        clear_key_detail_panel();
        key_intialize(0);
    });
    $("#KeyExportButton").on('click',function(){
        touchcookie();
        var condition_user = [];//new Array();
        var temp ={
            ConditonName: "UserId",
            Equal:usr.id,
            GEQ:"",
            LEQ:""
        };
        condition_user.push(temp);
        Data_export_Normal("钥匙表导出","keytable",condition_user,[]);//new Array());
    });
    $("#KeyNewButton").on('click',function(){
        touchcookie();
        show_new_key_module();
    });
    $("#KeyDelButton").on('click',function(){
        touchcookie();
        if(key_selected === null){
            show_alarm_module(true,"请选择一把钥匙",null);
        }else{
            modal_middle($('#KeyDelAlarm'));
            $('#KeyDelAlarm').modal('show');
        }
    });
    $("#KeyModifyButton").on('click',function(){
        touchcookie();
        if(key_selected === null){
            show_alarm_module(true,"请选择一把钥匙",null);
        }else{
            show_mod_key_module(key_selected);
        }
    });
    $("#delKeyCommit").on('click',function(){
        del_key(key_selected.KeyCode);
        touchcookie();
    });
    $("#newKeyCommit").on('click',function(){
        if(key_module_status){
            submit_new_key_module();
            touchcookie();
        }else{
            submit_mod_key_module();
            touchcookie();
        }
    });
    $("#KeyHistoryTableFlash").on('click',function(){
        query_open_lock_history();

        touchcookie();
    });
    $("#KeyAuthQuery").on('click',function(){
        get_domain_auth_list($("#KeyAuthPoint_choice").val());
        touchcookie();
    });
    $("#KeyAuthNew").on('click',function(){
        show_auth_new_module($("#KeyAuthProj_choice").val(),$("#KeyAuthPoint_choice").val(),$("#KeyAuthPoint_choice").find("option:selected").text());
        touchcookie();
    });
    $("#KeyUserChange").on('click',function(){
        show_key_grant_module($("#KeyUserKey_choice").val(),$("#KeyUserUser_choice").val(),$("#KeyUserKey_choice").find("option:selected").text(),$("#KeyUserUser_choice").find("option:selected").text());
        touchcookie();
    });
    $("#delKeyAuthCommit").on('click',function(){
        //console.log("click"+$(this).attr("AuthId"));
        $('#KeyAuthDelAlarm').modal('hide');
        key_auth_delete($(this).attr("AuthId"));
        touchcookie();
    });
    $("#newKeyAuthCommit").on('click',function(){
        click_new_key_auch_commit();
        touchcookie();
    });
    $("#NewKeyAuthEndTime_Input").change(function(){
        $("#NewKeyAuthEndTime_Input").val(check_key_auth_date($(this).val()));
    });
    $("#KeyGrantCommit").on('click',function(){
        $('#KeyGrantAlarm').modal('hide');
        click_key_grant_commit($(this).attr("KeyId"),$(this).attr("UserId"));
    });

    $("#AlarmHandleUpdateCommit").on('click',function(){
        AlarmHandleUpdateCommit_button_commit();
    });
    $("#CommonQueryCommit").on('click',function(){
        if(global_key_word == $("#CommonQueryInput").val()) return;
        global_key_word = $("#CommonQueryInput").val();
        switch (CURRENT_URL){
            case "UserManage":
                user_intialize(0);
                break;
            case "KeyManage":
                key_intialize(0);
                break;
            case "PGManage":
                pg_intialize(0);
                break;
            case "ProjManage":
                proj_intialize(0);
                break;
            case "MPManage":
                point_intialize(0);
                break;
            case "DevManage":
                dev_intialize(0);
                break;
            default:

                break;
        }
        return;
    });
    $("#RTSPHistoryshow").on('click',function(){
        var dateRTSP = new Date($("#RTSPHistoryAlarmTime_Input").val());
        dateRTSP = date_addminutes(dateRTSP,parseInt($("#rtsp_zoom").val()));
        var alarmstart = dateRTSP.Format("yyyyMMddThhmmss");

        dateRTSP = date_addminutes(dateRTSP,1);

        var alarmend = dateRTSP.Format("yyyyMMddThhmmss");
        var href = $(this).attr("data-url")+"?starttime="+alarmstart+"Z&endtime="+alarmend+"Z";
        console.log(href);
        window.location.href = href;
    });
    $("#DevCaliButton").on('click',function(){
        if(device_selected === null) return;
        getdevcali(device_selected.DevCode);
    });
    $("#DeviceCalibrationTableCommit").on('click',function(){
        setdevcali(device_selected.DevCode);
    });
    clear_window();
    desktop();
    calculate_row();
    clear_user_detail_panel();
    clear_proj_detail_panel();
    $(window).resize();
});