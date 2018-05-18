let receiverGroupController = {
    view: {
        el: '.receiverGroup-layout',
        template: `
        <div class="manageGroup">
            <h2>接受组管理</h2>
            <label for="">
                组名称
                <input name="groupName" type="text">
            </label>
            <div class="label-container">
                <label for="" >
                    接收消息的人
                    <select multiple name="selectIds" class="select-people_0">
                    </select>
                </label>
                <div class="button-container">
                    <button class="button-right">>></button>
                    <button class="button-left"><<</button>
                </div>
                <label for="" class="no-receiver">
                    不接收消息的人
                    <select multiple class="noselect-people_0">
                    </select>
                </label >
            </div>
            <input id="receiverGroupButton" class="button" value="添加" type="submit">
        </div>
        <div class="receiverContent">
            <table>
                <thead>
                <tr>
                    <th class="name-td">组名</th>
                    <th class="email-td">成员数</th>
                    <th class="operate-td">操作</th>
                </tr>
                </thead>
                <tbody id="receiverGroup-tbody">
                </tbody>
            </table>
        </div>`,
        render() {
            $(this.el).html(this.template);
            receiverList((list) => {
                list.map((result) => {
                    $('.noselect-people_0').append(`
                    <option value="${result.id}">${result.name}</option>
                    `)
                })
            })
        },
        reload() {
            groupList((list) => {
                $('#receiverGroup-tbody').empty();
                list.map((result) => {
                    $('#receiverGroup-tbody').append(`
                    <tr>
                        <td class="nameField">${result.name}</td>
                        <td class="emailField">${result.receiverNumber}</td>
                        <td><span class="edit">修改</span>/<span class="delete" onclick="deleteReceiverGroupTr(${result.id})" >删除</span></td>
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


$("#receiverGroupButton").on('click', () => {
    let groupName = $("input[name='groupName']").val();
    let receiverGroupIds = [];
    let options = $('.select-people_0').find("option");
    for (let i = 0; i < options.length; i++) {
        let option = options.eq(i).val();
        if (option !== '') {
            receiverGroupIds.push(option);
        }
    }

    addReceiverGroup(groupName, receiverGroupIds, function () {
        receiverGroupController.view.reload();
    })
});

function deleteReceiverGroupTr(id) {
    deleteReceiverGroup(id, function (data) {
        receiverGroupController.view.reload();
    });
}


$('.button-right').on('click', () => {

    let option = $('.select-people_0').find("option:selected");
    let text = option.text();
    let value = option.val();
    if (text) {
        $('.noselect-people_0').prepend(`<option value='${value}'>${text}</option>`)
        $('.select-people_0').find("option:selected").remove();
    }
    else {
        alert('请选中一项')
    }
})


$('.button-left').on('click', () => {
    let option = $('.noselect-people_0').find("option:selected");
    let text = option.text();
    let value = option.val();
    if (option) {
        $('.noselect-people_0').find("option:selected").remove();
        $('.select-people_0').prepend(`<option value='${value}'>${text}</option>`)
    }
    else {
        alert('请选中一项')
    }
})