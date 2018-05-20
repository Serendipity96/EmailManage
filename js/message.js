let messageController = {
    view: {
        el: '.message-layout',
        template: `
        <div class="addMessage">
            <h2>消息管理</h2>
            <label for="">
                消息名称
                <input type="hidden" name="id">
                <input name="subject" type="text">
            </label>
            <label for="">
                消息内容
                <input name="content" type="text">
            </label>
            <input id="messageButton" onclick="addMessageItem(this)" class="button" value="添加" type="submit">
            <input style="display: none" id="messageConfirm" onclick="confirmMessage(this)" class="button" value="确认" type="submit">
        </div>
        <div class="messageContent">
            <table>
                <thead>
                <tr>
                    <th class="name-td">消息名</th>
                    <th class="operate-td">操作</th>
                </tr>
                </thead>
                <tbody id="message-tbody">
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
                $('#message-tbody').empty();
                list.map((result) => {
                    $('#message-tbody').append(`
                <tr>
                    <td hidden>${result.id}</td>
                    <td>${result.subject}</td>
                    <td><span class="edit" onclick="editMessage(this)">修改</span>/<span class="delete" onclick="deleteMessageTr(${result.id})" >删除</span></td>
                </tr>
                    `);

                })
            });
        }
    },
    model: {
        status: '',
        result: []
    },
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

function addMessageItem(edit) {
    let messageSubject = $("input[name='subject']").val();
    let messageContent = $("input[name='content']").val();
    addMessage(messageSubject, messageContent, function (data) {
        $("input[type='text']").val('');
        messageController.view.reload();
    });
}
function deleteMessageTr(id) {
    deleteMessage(id, function (data) {
        messageController.view.reload();
    });
}

function editMessage(edit) {
    $("#messageButton").hide();
    $("#messageConfirm").show();
    let id = edit.parentNode.parentNode.children[0].textContent;
    messageList(function (list) {
        list.forEach((result) => {
            if (result.id == id) {
                $("input[name='id']").val(result.id);
                $("input[name='subject']").val(result.subject);
                $("input[name='content']").val(result.content);
            }
        })
    })
}
function confirmMessage(edit) {
        let id = $("input[name='id']").val();
        let messageSubject = $("input[name='subject']").val();
        let messageContent = $("input[name='content']").val();
        modifyMessage(id, messageSubject, messageContent, function (data) {
            $("input[type='text']").val('');
            messageController.view.render();
            messageController.view.reload();
        });
}