$("#currpage").html(currpage);
$("#count").html(count);
if (currpage == 1 && count == 1) {
    $("#fontPage").addClass("ban").attr("href", "###");
    $("#prePage").addClass("ban").attr("href", "###");
    $("#nextPage").addClass("ban").attr("href", "###");
    $("#tailPage").addClass("ban").attr("href", "###");
} else if (currpage == 1 && count != 1) {
    $("#fontPage").addClass("ban").attr("href", "###");
    $("#prePage").addClass("ban").attr("href", "###");
    $("#nextPage").attr("href", window.location.pathname + "?page=2");
    $("#tailPage").attr("href", window.location.pathname + "?page=" + count);
} else if (currpage != 1 && currpage < count) {
    $("#fontPage").attr("href", window.location.pathname + "?page=1");
    $("#prePage").attr("href", window.location.pathname + "?page=" + (currpage - 1));
    $("#nextPage").attr("href", window.location.pathname + "?page=" + (currpage + 1));
    $("#tailPage").attr("href", window.location.pathname + "?page=" + count);
} else if (currpage == count && currpage != 1) {
    $("#fontPage").attr("href", window.location.pathname + "?page=1");
    $("#prePage").attr("href", window.location.pathname + "?page=" + (currpage - 1));
    $("#nextPage").addClass("ban").attr("href", "###");
    $("#tailPage").addClass("ban").attr("href", "###");
}
$('.lang').click(function(event) {
    window.location.href = '/lang/' + $(this).text();
});
$('.edit').click(function(event) {
    window.location.href = '/edit?id=' + $(this).data("id");
});
$('.delete').click(function() {
    var dom = $("#" + $(this).data("id"));
    $.get('/delete', {
        id: $(this).data("id")
    }, function(data) {
        if (data.code == 200) {
            dom.addClass("animated slideOutUp");
        }
    });
})
