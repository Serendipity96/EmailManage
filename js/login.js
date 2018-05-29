$('#submit').on('click', function () {
    let username = $('input[type="text"]').val();
    let $password = $('input[type="password"]').val();
    let hashPwd = md5($password);

    login(username, hashPwd, function (data) {
        if (data.status === 200) {
            window.location.href = "index.html"
        } else {
            alert('用户名或密码错误')
            $('input[type="text"]').val('');
            $('input[type="password"]').val('');
        }
    })
})
