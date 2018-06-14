let accountController = {
    view: {
        el: '.account-layout',
        template: `
            <div class="addAccount">
        <h2>修改密码</h2>
        <h3>admin，您好！</h3>
        <label class="label-first" for="">
            原密码
            <input type="hidden" name="id">
            <input name="oldPwd" type="password">
        </label>
        <label for="">
            新密码
            <input name="newPwd" type="password">
        </label>
        <label for="">
            确认密码
            <input name="confirmPwd" type="password">
        </label>
        <input id="accountButton" onclick="editPwd(this)" class="button" value="修改" type="submit">
    </div>

        `,
        render() {
            let $el = $(this.el);
            $el.html(this.template);
        }
    },
    model: {},
    controller: {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model);
        }
    },
    init() {
        this.controller.init(this.view, this.model);
    }
}

function editPwd(edit) {
    let id = 1;
    let oldPwd = $("input[name='oldPwd']").val();
    let newPwd = $("input[name='newPwd']").val();
    let confirmPwd = $("input[name='confirmPwd']").val();
    let username = 'admin';

    if (oldPwd === '') {
        alert('请输入原密码')
    } else if (newPwd === '') {
        alert('密码不能为空');
    } else if (confirmPwd === '') {
        alert('请确认密码');
    } else if (newPwd !== '' && confirmPwd !== '') {
        if (newPwd === confirmPwd) {
            let oldHashPwd = md5(oldPwd);
            login(username, oldHashPwd, function (data) {
                if (data.status === 400) {
                    alert(data.errMsg)
                    $("input[type='password']").val('');
                } else {
                    let newHashPwd = md5(newPwd);
                    modifyAccount(id, username, newHashPwd, function (data) {
                        accountController.view.render();
                        alert('修改成功！')
                    });
                }
            })
        }
        else {
            alert('两次密码不一致');
            $("input[type='password']").val('');
        }
    }
}





