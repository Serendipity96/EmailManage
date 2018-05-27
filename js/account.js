let accountController = {
    view: {
        el: '.account-layout',
        template: `
            <div class="addAccount">
        <h2>管理员账号</h2>
        <label class="label-first" for="">
            用户名
            <input type="hidden" name="id">
            <input name="username" type="text">
        </label>
        <label for="">
            密码
            <input name="password" type="password">
        </label>
        <label for="">
            确认密码
            <input name="confirmPassword" type="password">
        </label>
        <input id="accountButton" onclick="addAccountItem(this)" class="button" value="添加" type="submit">
        <input style="display: none" id="accountConfirm" onclick="confirmAccount(this)" class="button" value="确认" type="submit">
    </div>
            <div class="accountContent">
        <table>
            <thead>
            <tr>
                <th class="name-td">用户名</th>
                <th class="operate-td">操作</th>
            </tr>
            </thead>
            <tbody id="account-tbody"></tbody>
        </table>
    </div>
        `,
        render() {
            let $el = $(this.el);
            $el.html(this.template);
        },
        reload() {
            accountList(function (list) {
                $('#account-tbody').empty();
                list.map((result) => {
                    $('#account-tbody').append(`
                    <tr>
                         <td hidden>${result.id}</td>
                         <td>${result.username}</td>
                         <td><span class="edit" onclick="editAccount(this)">修改</span>/<span class="delete" onclick="deleteAccountTr(${result.id})">删除</span></td>
                    </tr>
                    `)
                })
            });
        }
    },
    model: {},
    controller: {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model);
            this.view.reload();
        }
    },
    init() {
        this.controller.init(this.view, this.model);
    }
}

function addAccountItem(edit) {
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    let confirmPassword = $("input[name='confirmPassword']").val();

    if (password !== '' && confirmPassword !== '') {
        if (password === confirmPassword) {
            addAccount(username, password, function (data) {
                $("input[type='text']").val('');
                $("input[type='password']").val('');
                accountController.view.reload();
            });
        } else {
            alert('两次密码不一致');
            $("input[type='password']").val('');
        }
    } else if (password !== '') {
        alert('密码不能为空');
    } else if (confirmPassword !== '') {
        alert('请确认密码');
    } else if (password === ''&& confirmPassword === '') {
        alert('请输入密码');
    }
}

function deleteAccountTr(id) {
    deleteAccount(id, function (data) {
        accountController.view.reload();
    });
}

function editAccount(edit) {
    $("#accountButton").hide();
    $("#accountConfirm").show();
    let id = edit.parentNode.parentNode.children[0].textContent;
    accountList(function (list) {
        list.forEach((result) => {
            if (result.id == id) {
                $("input[name='id']").val(result.id);
                $("input[name='username']").val(result.username);
                $("input[name='password']").val(result.password);
            }
        })
    })
}

function confirmAccount(edit) {
    let id = $("input[name='id']").val();
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    let confirmPassword = $("input[name='confirmPassword']").val();

    if (password !== '' && confirmPassword !== '') {
        if (password === confirmPassword) {
            modifyAccount(id, username, password, function (data) {
                accountController.view.render();
                accountController.view.reload();
            });
        } else {
            alert('两次密码不一致');
            $("input[type='password']").val('');
        }
    } else if (password === '') {
        alert('密码不能为空');
    } else if (confirmPassword === '') {
        alert('请确认密码');
    } else if (password === ''&& confirmPassword === '') {
        alert('请输入密码');
    }

}