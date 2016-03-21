$("#submit").click(function() {
    var intro = $("#intro").val();
    var code = escapeHtml($("#code").val());
    var lang = $("#lang").val().split('-')[1];
    if(intro == "" || code == "") {
        alert("介绍或者代码不能为空！");
    } else {
        $.post(url, {
            intro: intro,
            code: code,
            lang: lang
        }, function(data) {
            if(data.code == 500) {
                alert("添加或者修改失败！");
            }
            if(data.code == 200) window.location.href = "/";
        }, 'json');
    }
});

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
