let taskCrontroller = {
    init() {

    }
}


$('.chooseCron').on('click', function () {
    $('.chooseCron-layout-bg').show();
    $('.chooseCron-container').show();
    let $liTabs = $('.tabs').children();
    $liTabs.on('click', function (currentClass) {
        if (currentClass !== 'tab-selected') {
            $(this).addClass('tab-selected');
            $(this).siblings().removeClass('tab-selected')
            var panelLayout = '.' + this.id + '-panel';
            let $panels = $('.panel').children();
            for (let i = 0; i < $panels.length; i++) {
                $panels[i].style.display = 'none';
            }
            document.querySelector(panelLayout).style.display = 'block';
        }
    })

});
$('#closeButton').on('click', () => {
    $('.chooseCron-layout-bg').hide();
    $('.chooseCron-container').hide();
});
