let receiverController = {
    view: {
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
                <input id="receiverButton"  onclick="addReceiverItem(this)" class="button" value="添加" type="submit">
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
        },
        reload() {
            receiverList(function (list) {
                $('#tdbody').empty();
                list.map((result) => {
                    $('#tdbody').append(`
                    <tr>
                        <td style="display: none">${result.id}</td>
                        <td class="nameField">${result.name}</td>
                        <td class="emailField">${result.email}</td>
                        <td><span style="display: none" class="confirm" onclick="confirm(this)">确认</span><span class="edit" onclick="editReceiver(this)">修改</span><span class="delete" onclick="deleteReceiverTr(${result.id})" >/删除</span></td>
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
            view.render(model);
            view.reload();

        }

    },
    init() {
        this.controller.init(this.view, this.model)
    }
}

function addReceiverItem(edit) {
    let name = $("input[name='name']").val();
    let email = $("input[name='email']").val();
    if(name === ''){
        alert('姓名不能为空')
    }else if (email === ''){
        alert('Email不能为空')
    }else if(email.indexOf("@") === -1){
        alert('Email不合法')
    }else {
        addReceiver(name, email, function (data) {
            $("input[type='text']").val('');
            receiverController.view.reload();
        });
    }
}

function deleteReceiverTr(id) {
    deleteReceiver(id, function (data) {
        receiverController.view.reload();
    });
}


function editReceiver(edit) {
    edit.parentNode.firstChild.style.display = 'block';
    edit.parentNode.firstChild.nextSibling.style.display = 'none'
    edit.parentNode.lastChild.style.display = 'none'
    let editName = edit.parentNode.parentNode.children[1];
    let textName = editName.textContent;
    let editEmail = edit.parentNode.parentNode.children[2];
    let textEmail = editEmail.textContent;
    editName.innerHTML = '<input type="text" name="n" value="' + textName + '">';
    editEmail.innerHTML = '<input type="text" name="e" value="' + textEmail + '">';
}

function confirm(edit) {
    let id = edit.parentNode.parentNode.children[0].textContent;
    let name = $("input[name='n']").val();
    let email = $("input[name='e']").val();
    modifyReceiver(id, name, email, function (data) {
        receiverController.view.reload();
    });

}









