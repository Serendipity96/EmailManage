$('#submit').on('click', function () {
    let username = 'admin';
    let $password = $('input[type="password"]').val();
    let hashPwd = md5($password);

    login(username, hashPwd, function (data) {
        if (data.status === 200) {
            window.location.href = "admin.html"
        } else {
            alert('密码错误')
            $('input[type="password"]').val('');
        }
    })
})
