$('li').on('click',function (currentClass) {
    if ( currentClass !== "active" ) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    }
});

