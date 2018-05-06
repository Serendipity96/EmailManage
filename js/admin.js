{
    let view = {
        el: '.administrators-layout',
        template: `
        <div class="addAdministrators">
            <h2>管理员账号</h2>
            <label class="label-first" for="">
                用户名
                <input name="name" type="text">
            </label>
            <label for="">
                密码
                <input name="password" type="password">
            </label>
            <label for="">
                确认密码
                <input name="confirm-password" type="password">
            </label>
            <input class="button" value="添加" type="submit">
        </div>
        <div class="administratorsContent">
            <table>
                <thead>
                <tr>
                    <th class="name-td">用户名</th>
                    <th class="operate-td">操作</th>
                </tr>
                </thead>
                <tbody id="admin-tbody">
                
                </tbody>
            </table>
        </div>
        `,
        render(data) {
            let $el = $(this.el);
            $el.html(this.template);
        },
        reload() {
            adminList(function (list) {
                $('#admin-tbody').empty();
                list.map((result) => {
                    $('#admin-tbody').append(`
                <tr>
                    <td>${result.name}</td> 确认文档里面用户字段
                    <td><span class="edit">修改</span>/<span class="delete" onclick="deleteAdminTr(${result.id})" >删除</span></td>
                </tr>
                    `);

                })
            });
        }
    };
    确认model类型
    let model = {
        status: '',
        result: []
    };
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model);
            this.view.reload();
        }
    }
    controller.init(view, model);

    $("input[type='submit']").on('click', () => {
        let adminName = $("input[name='name']").val();
        let adminPassword = $("input[name='password']").val();
        let adminConfirmPassword = $("input[name='confirm-password']").val();
        addAdmin(adminName, adminPassword,adminConfirmPassword, function (data) {
            $("input[type='text']").val('');
            view.reload();
        });
        console.log('success')
    });

    function deleteAdminTr(id) {
        deleteAdmin(id,function (data) {
            view.reload();
        });
    }
}