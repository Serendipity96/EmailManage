{
    let view = {
        el: '.message-layout',
        template: `
        <div class="addMessage">
            <h2>消息管理</h2>
            <label for="">
                消息名称
                <input type="text">
            </label>
            <label for="">
                消息内容
                <input type="text">
            </label>
            <input class="button" value="添加" type="submit">
        </div>
        <div class="messageContent">
            <table>
                <thead>
                <tr>
                    <th class="name-td">消息名</th>
                    <th class="operate-td">操作</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        `,
        render(data) {
            let $el = $(this.el);
            $el.html(this.template);
        },
        reload() {
            messageList(function (list) {
                $('#tdbody').empty();
                list.map((result) => {
                    $('#tdbody').append(`
                <tr>
                    <td>${result.subject}</td>
                    <td><span class="edit">修改</span>/<span class="delete" onclick="deleteMessageTr(${result.id})" >删除</span></td>
                </tr>
                    `);

                })
            });
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
            this.view.render(this.model);
            this.view.reload();
        }
    }
    controller.init(view, model);

    $("input[type='submit']").on('click', () => {
        let messageSubject = $("input[name='name']").val();
        let messageContent = $("input[name='email']").val();
        addMessage(messageSubject, messageContent, function (data) {
            $("input[type='text']").val('');
            view.reload();
        });
    });

    function deleteMessageTr(id) {
        deleteMessage(id,function (data) {
            view.reload();
        });
    }
}