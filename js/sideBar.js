let $li = $('#siderBarTabs').children()
$li.on('click', function (currentClass) {
    if (currentClass !== "active") {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        let html = this.id + ".html";
        $('#layout').load(html, function () {
            receiverController.init();
        });

    }
});

