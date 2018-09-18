function show_mod_user_module(user,user_auth){
    $("#newModalLabel").text("用户信息修改：密码栏不输入表示不修改密码");
    user_module_status = false;
    $("#NewUsername_Input").val(user.name);
    $("#NewUserNick_Input").val(user.nickname);
    $("#NewPassword_Input").val("");
    $("#NewRePassword_Input").val("");
    $("#NewUserMobile_Input").val(user.mobile);
    $("#NewUserMail_Input").val(user.mail);
    $("#NewUserMemo_Input").val(user.memo);
    $("#NewUsername_Input").attr("placeholder","用户名");
    $("#NewPassword_Input").attr("placeholder","密码");
    $("#NewRePassword_Input").attr("placeholder","重复密码");
    $("#NewUserMobile_Input").attr("placeholder","电话号码");
    $("#NewUserMail_Input").attr("placeholder","邮箱");
    $("#NewUserType_choice").val(user.type);
    $("#duallistboxUserAuth_new").empty();
    var txt = "";
    if(project_pg_list === null) project_pg_list = [];
    for(var i =0;i<project_pg_list.length;i++){
        txt = "<option value='"+project_pg_list[i].id+"'";
        for(var j=0;j<user_auth.length;j++){
            if(user_auth[j].id == project_pg_list[i].id){
                txt = txt +"selected='selected'";
                break;
            }
        }
        txt = txt +">"+project_pg_list[i].name+"</option>";
        $("#duallistboxUserAuth_new").append(txt);
    }
    $('.NewUserAuthDual').bootstrapDualListbox('refresh', true);
    modal_middle($('#newUserModal'));
    $('#newUserModal').modal('show');
}

function submit_mod_user_module(){
    var new_usr_name = $("#NewUsername_Input").val();
    var new_usr_nick = $("#NewUserNick_Input").val();
    var new_usr_password = $("#NewPassword_Input").val();
    var new_usr_repassword = $("#NewRePassword_Input").val();
    var new_usr_mobile = $("#NewUserMobile_Input").val();
    var new_usr_mail = $("#NewUserMail_Input").val();
    var new_usr_memo = $("#NewUserMemo_Input").val();

    if(new_usr_password!==""&&new_usr_repassword!==""&&new_usr_password!=new_usr_repassword){
        $("#NewPassword_Input").val("");
        $("#NewRePassword_Input").val("");
        $("#NewPassword_Input").attr("placeholder","密码不正确，请重新输入");
        $("#NewRePassword_Input").attr("placeholder","密码不正确，请重新输入");
        $("#NewPassword_Input").focus();
        return;
    }
    if(new_usr_repassword!=="")new_usr_repassword= b64_sha1(new_usr_repassword);
    var user = {
        id: user_selected.id,
        name: new_usr_name,
        nickname: new_usr_nick,
        password: new_usr_repassword,
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
    modify_user(user,auth);
}
function modify_user(user,auth){
    var body={
        userid: user.id,
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
        action:"UserMod",
        type:"mod",
        body: body,
        user:usr.id
    };
    var modify_user_callback = function(result){
        var ret = result.status;
        if(ret == "true"){

            $('#newUserModal').modal('hide');
            mod_user_flash = function(){
                clear_user_detail_panel();
                user_intialize(0);

            };

            setTimeout(function() {
                show_alarm_module(false, "修改成功！", mod_user_flash);
            },500);
        }else{

            setTimeout(function() {
                show_alarm_module(true, "修改失败！" + result.msg, null);
            },500);
        }
    };
    JQ_get(request_head,map,modify_user_callback);
}