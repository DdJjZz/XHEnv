var httphead = gethttphead();
var basic_address = getRelativeURL()+"/";
console.log(basic_address);
var wait_time_long =3000;
var wait_time_middle = 1000;
var wait_time_short= 500;
var cycle_time = 60000;
var show_time = 15000;
var request_head= basic_address+"request.php";
var jump_url = basic_address+"jump.php";
var upload_url=basic_address+"upload.php";
var screen_saver_address=basic_address+"screensaver/screen.html";
var show_image_url=basic_address+"imageshow/ImageShow.html";
var weather_info="";
var alarm_interval = null;
var alarm_interval_tab = null;
var ifPPTshow=false;
var usr;
usr = "";
var admin="";
var keystr="";
var table_row=5;
var usr_msg = "";
var usr_ifdev = "true";
var usr_img = [];//new Array();
var usr_favorate_city="";
//var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
var current_table;
var table_head;
var map_MPMonitor;
var map_AlarmMonitor;
var mark_MPMonitor_List=[];
var map_initialized = false;
var usr_faverate_list = [];
// user table control
var user_initial = false;
var user_start=0;
var user_total=0;
var project_pg_list=null;
var user_table=null;
var user_selected;
var user_selected_auth;
var user_selected_key;
var NewUserAuthDual2;
var user_module_status;
// pg table control
var pg_initial = false;
var pg_start=0;
var pg_total=0;
var pg_table=null;
var pg_selected;
var pg_selected_proj;
var NewPGProjDual2;
var pg_module_status;
var project_list=null;
// project table control
var project_initial = false;
var project_start=0;
var project_total=0;
var project_table=null;
var project_selected;
var project_selected_device;
var project_module_status;
// parameter management
var parameter_initial = false;
var software_version_list = null;
var  if_update_table_initialize = false;
// monitor point table control
var point_initial = false;
var point_start=0;
var point_total=0;
var point_table=null;
var point_selected;
var point_selected_device;
var point_selected_picture;
var project_selected_point;
var project_selected_key;
var point_module_status;
// device table control
var point_list=null;
var device_initial = false;
var device_start=0;
var device_total=0;
var device_table=null;
var device_selected;
var device_selected_sensor;
var device_module_status;
// key table control
var key_list=null;
var proj_user_list=null;
var key_initial = false;
var key_start=0;
var key_total=0;
var key_table=null;
var key_selected;
var key_selected_auth;
var key_module_status;
//warning Control
var monitor_map_list = null;
var monitor_handle;
var monitor_selected = null;
var monitor_list = null;
var monitor_string="";
var monitor_map_handle=null;

//warning table Control
var Monitor_table_initialized = false;
var Monitor_table_start=0;
var Monitor_table_total=0;
//warning Static table Control
var Monitor_Static_table_initialized = true;
var  if_static_table_initialize = false;
//key history table Control
var Key_History_table_initialized = false;
var  if_key_history_table_initialize = false;
//key auth Control
var Key_auth_initialized = false;
//alarm Control
var alarm_map_list = null;
var alarm_type_list = null;
var alarm_map_initialized = false;
var alarm_selected = null;
var alarm_map_handle=null;
var alarm_array = null;
//alarm handle control
var Warning_Handle_table_initialized = false;
var if_Warning_Handle_table_initialize = false;
//Export Control
var export_table_name = null;
var if_table_initialize = false;
var Audit_Stability_table_initialized= false;
var if_audit_stability_table_initialized =false;
//Sensor Control
var sensor_list=null;
var select_sensor_devcode=null;
var select_sensor = null;
//key module control
var select_key_auth = null;
//Camera Control
var camera_unit_h;
var camera_unit_v;

var Longitude = null;
var Latitude = null;

var global_key_word = "";
getLocation();
var CURRENT_URL = "desktop",
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');
function getLocation()
{
    console.log("正在获取位置！");
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("无法获得当前位置！");
    }
}
function showPosition(position)
{
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
}
$(document).ready(function() {
    console.log("comm_value.js is Start");
});

