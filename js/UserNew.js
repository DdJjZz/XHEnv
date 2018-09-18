function show_new_user_module(){
    $("#newModalLabel").text("创建新用户");
    user_module_status = true;
    $("#NewUsername_Input").val("");
    $("#NewUserNick_Input").val("");
    $("#NewPassword_Input").val("");
    $("#NewRePassword_Input").val("");
    $("#NewUserMobile_Input").val("");
    $("#NewUserMail_Input").val("");
    $("#NewUserMemo_Input").val("");
    $("#NewUserType_choice").val("false");
    $("#NewUsername_Input").attr("placeholder","用户名");
    $("#NewPassword_Input").attr("placeholder","密码");
    $("#NewRePassword_Input").attr("placeholder","重复密码");
    $("#NewUserMobile_Input").attr("placeholder","电话号码");
    $("#NewUserMail_Input").attr("placeholder","邮箱");
    $("#duallistboxUserAuth_new").empty();
    var txt = "";
    if(project_pg_list === null) project_pg_list = [];
    for(var i =0;i<project_pg_list.length;i++){
        txt = "<option value='"+project_pg_list[i].id+"'>"+project_pg_list[i].name+"</option>";
        $("#duallistboxUserAuth_new").append(txt);
    }
    $('.NewUserAuthDual').bootstrapDualListbox('refresh', true);

    modal_middle($('#newUserModal'));

    $('#newUserModal').modal('show');
}

function submit_new_user_module(){
    var new_usr_name = $("#NewUsername_Input").val();
    var new_usr_nick = $("#NewUserNick_Input").val();
    var new_usr_password = $("#NewPassword_Input").val();
    var new_usr_repassword = $("#NewRePassword_Input").val();
    var new_usr_mobile = $("#NewUserMobile_Input").val();
    var new_usr_mail = $("#NewUserMail_Input").val();
    var new_usr_memo = $("#NewUserMemo_Input").val();
    //console.log("new_usr_name:"+new_usr_name);
    if(new_usr_name === null || new_usr_name === ""){
        $("#NewUsername_Input").attr("placeholder","用户名不能为空");
        $("#NewUsername_Input").focus();
        return;
    }
    if(new_usr_password === null || new_usr_password === ""){
        $("#NewPassword_Input").attr("placeholder","密码不能为空");
        $("#NewRePassword_Input").attr("placeholder","密码不能为空");
        $("#NewPassword_Input").focus();
        return;
    }
    if(new_usr_password!=new_usr_repassword){
        $("#NewPassword_Input").val("");
        $("#NewRePassword_Input").val("");
        $("#NewPassword_Input").attr("placeholder","密码不正确，请重新输入");
        $("#NewRePassword_Input").attr("placeholder","密码不正确，请重新输入");
        $("#NewPassword_Input").focus();
        return;
    }
    if(new_usr_mobile === null || new_usr_mobile === ""){
        $("#NewUserMobile_Input").attr("placeholder","电话号码不能为空");
        $("#NewUserMobile_Input").focus();
        return;
    }
    if(new_usr_mail === null || new_usr_mail === ""){
        $("#NewUserMail_Input").attr("placeholder","邮箱不能为空");
        $("#NewUserMail_Input").focus();
        return;
    }

    var user = {
        name: new_usr_name,
        nickname: new_usr_nick,
        password: b64_sha1(new_usr_repassword),
        mobile: new_usr_mobile,
        mail: new_usr_mail,
        type: $("#NewUserType_choice").val(),
        memo: new_usr_memo
    };
    var auth = [];//new Array();
    $('#duallistboxUserAuth_new :selected').each(function(i, selected) {
        var temp = {
            id:$(selected).val(),
            name:$(selected).text()
        };
        auth.push(temp);
    });
    console.log(auth);
    new_user(user,auth);
}
function new_user(user,auth){
    var body = {
        name: user.name,
        nickname: user.nickname,
        password: user.password,
        mobile: user.mobile,
        mail: user.mail,
        type: user.type,
        memo: user.memo,
        auth: auth
    };

    var map={
        action:"UserNew",
        type:"mod",
        body: body,
        user:usr.id
    };
    var new_user_callback = function(result){
        var ret = result.status;
        if(ret == "true"){

            $('#newUserModal').modal('hide');
            create_user_flash = function(){
                clear_user_detail_panel();
                user_intialize(0);
            };
            setTimeout(function(){
                show_alarm_module(false,"创建成功！",create_user_flash);},500);
        }else{
            setTimeout(function(){
                show_alarm_module(true,"创建失败！"+result.msg,null);},500);
        }
    };
    JQ_get(request_head,map,new_user_callback);
}