let $li = $('#siderBarTabs').children()
$li.on('click',
    function (currentClass) {
    if (currentClass !== "active") {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        let html = this.id + ".html";
        let controller = this.id+'Controller';
        $('#layout').load(html, function () {
            eval(controller).init();
        });

    }
}
);

