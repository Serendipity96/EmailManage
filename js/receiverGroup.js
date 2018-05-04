{
    let view = {
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
                    <select multiple name="selectIds" class="select-people">
                    </select>
                </label>
                <div class="button-container">
                    <button class="button-right">>></button>
                    <button class="button-left"><<</button>
                </div>
                <label for="" class="no-receiver">
                    不接收消息的人
                    <select multiple class="noselect-people">
                    </select>
                </label >
            </div>
            <input class="button" value="添加" type="submit">
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
            $(this.el).html(this.template)
            receiverList((list) => {
                list.map((result) => {
                    $('.noselect-people').append(`
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
                        <td><span class="edit">修改</span>/<span class="delete" onclick="deleteReceiverTr(${result.id})" >删除</span></td>
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
    };

    controller.init(view, model);

    $("input[type='submit']").on('click', () => {
        let groupName = $("input[name='groupName']").val();
        let receiverGroupIds = [];
        let options = $('.select-people').find("option");
        for (let i = 0; i < options.length; i++) {
            let option = options.eq(i).val();
            console.log(option)
            if (option !== '') {
                receiverGroupIds.push(option);
            }
        }
        console.log(receiverGroupIds)
        addReceiverGroup(groupName, receiverGroupIds, () => {
            view.reload();
        })
    });

    function deleteReceiverTr(id) {
        deleteReceiverGroup(id, function (data) {
            view.reload();
        });
    }


    $('.button-right').on('click', () => {

        let option = $('.select-people').find("option:selected");
        let text = option.text();
        let value = option.val();
        if (text) {
            $('.noselect-people').prepend(`<option value='${value}'>${text}</option>`)
            $('.select-people').find("option:selected").remove();
        }
        else {
            alert('请选中一项')
        }
    })


    $('.button-left').on('click', () => {
        let option = $('.noselect-people').find("option:selected");
        let text = option.text();
        let value = option.val();
        if (option) {
            $('.noselect-people').find("option:selected").remove();
            $('.select-people').prepend(`<option value='${value}'>${text}</option>`)
        }
        else {
            alert('请选中一项')
        }
    })


}