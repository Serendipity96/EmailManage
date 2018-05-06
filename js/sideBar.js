var layoutArr = document.querySelector('body').children[1].children;

let $li = $('#siderBarTabs').children()
$li.on('click', function (currentClass) {
    if (currentClass !== "active") {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var layoutName = '.'+this.id+'-layout';
        for (let i = 0; i < layoutArr.length; i++) {
            layoutArr[i].style.display = 'none'
        }
        document.querySelector(layoutName).style.display = 'block';
    }

});

