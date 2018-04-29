{
    let view = {
        el: '.receiver-layout',
        template: `
        <div class="addReceiver">
            <h2>添加接受者</h2>
                <label for="">
                    姓名
                    <input name="name" type="text">
                </label>
                <label for="">
                    Email
                    <input name="email" type="text">
                </label>
                <input class="button" value="添加" type="submit">
        </div>
        <div class="receiverContent">
            <table>
                <thead>
                <tr>
                    <th class="name-td">姓名</th>
                    <th class="email-td">Email</th>
                    <th class="operate-td">操作</th>
                </tr>
                </thead>
                <tbody id = "tdbody">
                </tbody>
            </table>
        </div>
        `,
        render(data) {
            let $el = $(this.el);
            $el.html(this.template);
        }
    };

    let model = {
        status: '',
        result: []
    };

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            this.reload();
        },
        reload() {
            receiverList(function (list) {
                $('#tdbody').empty();
                list.map((result) => {
                    $('#tdbody').append(`
                    <tr>
                        <td class="nameField">${result.name}</td>
                        <td class="emailField">${result.email}</td>
                        <td><span class="edit">修改</span>/<span class="delete" onclick="deleteReceiverTr(${result.id})" >删除</span></td>
                    </tr>
                    `);

                })
            });
        }
    };
    controller.init(view, model);


    $("input[type='submit']").on('click', () => {
        let name = $("input[name='name']").val();
        let email = $("input[name='email']").val();
        addReceiver(name, email, function (data) {
            $("input[type='text']").val('');
            controller.reload();
        });
    });


    function deleteReceiverTr(id) {
        deleteReceiver(id,function (data) {
            controller.reload();
        });
    }
}
