function clear_user_detail_panel() {
    user_selected = null;
    var txt = "<p></p><p></p>" +
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>" +
        "<dl >" +
        "<dt >用户名：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "<dt >用户类型：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "<dt >联系方式：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "</dl>" +
        "</div>" +
        "<div class='col-md-6 col-sm-6 col-xs-12 column'>" +
        "<dl >" +
        "<dt>用户昵称：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "<dt>修改日期：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "<dt>邮箱：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "</dl>" +
        "</div>" +
        "<div class='col-md-12 col-sm-12 col-xs-12 column'>" +
        "<dl >" +
        "<dt>备注：</dt><dd>&nbsp&nbsp&nbsp&nbsp</dd>" +
        "</dl>" +
        "</div>";

    $("#Label_user_detail").empty();
    $("#Label_user_detail").append(txt);
    $("#Table_user_authed").empty();
}

function user_intialize(start) {
    user_initial = true;
    user_table = null;
    get_user_table(start, table_row * 5);
    get_project_pg_list();
}

function get_user_table(start, length) {
    var body = {
        startseq: start,
        length: length,
        keyword: global_key_word
    };
    var map = {
        action: "UserTable",
        type: "query",
        body: body,
        user: usr.id
    };
    var get_user_table_callback = function (result) {
        if (result.status == "false") {
            show_expiredModule();
            return;
        }
        user_table = result.ret.usertable;

        user_start = parseInt(result.ret.start);
        user_total = parseInt(result.ret.total);

        //HYj add for server slow
        draw_user_table_head();
    };
    JQ_get(request_head, map, get_user_table_callback);
}

function get_project_pg_list() {
    var map = {
        action: "ProjectPGList",
        type: "query",
        user: usr.id
    };
    var get_project_pg_list_callback = function (result) {
        if (result.status == "false") {
            show_expiredModule();
            return;
        }
        project_pg_list = result.ret;
    };
    JQ_get(request_head, map, get_project_pg_list_callback);
}

function show_expiredModule() {
    modal_middle($('#ExpiredAlarm'));
    $('#ExpiredAlarm').modal('show');
}

function draw_user_table_head() {
    if (null === user_table) return;
    var page_number = Math.ceil((user_table.length) / table_row);

    $("#User_Page_control").empty();
    var txt = "<li>" +
        "<a href='#' id='user_page_prev'>Prev</a>" +
        "</li>";
    var page_start_number = Math.ceil(user_start / table_row);
    var i;
    for (i = 0; i < page_number; i++) {
        txt = txt + "<li>" +
            "<a href='#' id='user_page_" + i + "'>" + (i + page_start_number + 1) + "</a>" +
            "</li>";
    }
    txt = txt + "<li>" +
        "<a href='#' id='user_page_next'>Next</a>" +
        "</li>";
    $("#User_Page_control").append(txt);
    table_head = "<thead>" +
        "<tr>" + "<th>序号</th>" + "<th>用户名</th>" + "<th>昵称</th>" + "<th>电话</th>" + "<th>属性</th>" + "<th>更新日期</th>";
    table_head = table_head + "</tr></thread>";
    click_draw_user_table = function () {
        draw_user_table($(this));
    };
    for (i = 0; i < page_number; i++) {
        $("#user_page_" + i).on('click', click_draw_user_table);
    }
    if (user_start <= 0) {
        $("#user_page_prev").css("display", "none");
    } else {
        $("#user_page_prev").css("display", "block");
        $("#user_page_prev").on('click', function () {
            var new_start = user_start - (table_row * 5);
            if (new_start < 0) new_start = 0;
            user_intialize(new_start);
        });
    }

    if ((user_start + (table_row * 5)) >= user_total) {
        $("#user_page_next").css("display", "none");
    } else {
        $("#user_page_next").css("display", "block");
        $("#user_page_next").on('click', function () {
            user_intialize(user_start + (table_row * 5));
        });
    }
    draw_user_table($("#user_page_0"));
}