let taskController = {
    view: {
        el: '.task-layout',
        template: `
            <div class="publishTask">
                <h2>发布任务</h2>
                <div class="row">
                <label for="">
                任务名称
                <input type="hidden" name="id">
                <input name="taskName" type="text">
                </label>
            <label class="sendMessage" for="">
                发送消息
                <select class="taskMessage">
                </select>
            </label>
            <button class="chooseCron">选择Cron</button>
            <input type="text" disabled="disabled" name="taskCron">
        </div>
        <div class="row" style="margin-top: 15px">
            <label for="">
                指派发送器
                <select class="appointSender">
                </select>
            </label>
            <div class="label-container">
                <label for="" class="select-label">
                    接收消息的组
                    <select multiple class="select-people">
                    </select>
                </label>
                <div class="button-container task-button-container">
                    <button class="button-right">>></button>
                    <button class="button-left"><<</button>
                </div>
                <label for="" class="no-receiver no-select-label">
                    不接收消息的组
                    <select multiple class="noselect-people">
                    </select>
                </label>
            </div>
            <input style="display: none" id="taskConfirm" onclick="taskConfirm(this)" class="button" value="确认" type="submit">
            <button id="taskButton" onclick="addTaskItem(this)" type="submit">添加</button>
        </div>
    </div>
            <div class="taskContent">
        <table>
            <thead>
            <tr>
                <th class="name-td">任务名</th>
                <th class="email-td">失败次数</th>
                <th class="operate-td">操作</th>
            </tr>
            </thead>
            <tbody id="task-tbody">
            </tbody>
        </table>
    </div>
        `,
        render() {
            $(this.el).html(this.template);
            messageList((list)=>{
                list.map((result)=>{
                    $('.taskMessage').append(`<option value="${result.id}">${result.subject}</option>`)
                })
            });
            senderList((list)=>{
                list.map((result)=>{
                    $('.appointSender').append(`<option value="${result.id}">${result.addr}</option>`)
                })
            });
            groupList((list)=>{
                list.map((result)=>{
                    $('.noselect-people').append(`<option value="${result.id}">${result.name}</option>`)
                })
            });
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
            });
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
            });
        },
        reload() {
            taskList((list) => {
                $('#task-tbody').empty();
                list.map((result) => {
                    $('#task-tbody').append(`
                        <tr>
                            <td class="task-id" hidden>${result.id}</td>
                            <td class="task-name">${result.name}</td>
                            <td class="task-number">${result.failureTimes}</td>
                            <td><span class="edit" onclick="editTask(this)">修改</span>/<span class="delete"  onclick="deleteTaskTr(${result.id})">删除</span></td>
                        </tr>
                    `);
                })
                $('.chooseCron').on('click', function () {
                    $('.chooseCron-layout-bg').show();
                    $('.chooseCron-container').show();
                    let $liTabs = $('.tabs').children();
                    $liTabs.on('click', function (currentClass) {
                        if (currentClass !== 'tab-selected') {
                            $(this).addClass('tab-selected');
                            $(this).siblings().removeClass('tab-selected')
                            var panelLayout = '.' + this.id + '-panel';
                            let $panels = $('.panel').children();
                            for (let i = 0; i < $panels.length; i++) {
                                $panels[i].style.display = 'none';
                            }
                            document.querySelector(panelLayout).style.display = 'block';
                        }
                    })

                });
                $('#closeButton').on('click', () => {
                    $('.chooseCron-layout-bg').hide();
                    $('.chooseCron-container').hide();
                });

            })
        },

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

function addTaskItem() {
    let taskName = $("input[name='taskName']").val();
    let messageId = $('.taskMessage').find("option:selected").val();
    let taskCron = $("input[name='taskCron']").val();
    let senderId = $('.appointSender').find("option:selected").val();
    let groupIds = [];
    let options = $('.select-people').find("option");
    for (let i = 0; i < options.length; i++) {
        let option = options.eq(i).val();
        if (option !== undefined) {
            groupIds.push(option);
        }
    }
    addTask(taskName, messageId, taskCron, senderId, groupIds, function () {
        taskController.view.render();
        taskController.view.reload();
    })

}
function deleteTaskTr(id) {
    deleteTask(id, function (data) {
        taskController.view.reload();
    });
}

function editTask(edit) {
    $('#taskButton').hide();
    $('#taskConfirm').show();
    let id = edit.parentNode.parentNode.children[0].textContent;

    getTask(id, function (result) {
        $("input[name='id']").val(result.id);
        $("input[name='taskName']").val(result.name);
        $('.taskMessage').find("option:selected").val(result.messageId);
        $("input[name='taskCron']").val(result.cron);
        $('.appointSender').find("option:selected").val(result.senderId);
        let groupIds = result.groupId;
        let options = $('.noselect-people').find("option");
        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < groupIds.length; j++) {
                if (groupIds[j] == options[i].value) {
                    let text = options[i].textContent;
                    let value = options[i].value;
                    $('.select-people').prepend(`<option value='${value}'>${text}</option>`);
                    $(`.noselect-people option[value=${value}]`).remove();
                    break;
                }
            }

        }
    })
}

function taskConfirm(edit) {
    let id = $('input[name="id"]').val();
    let taskName = $("input[name='taskName']").val();
    let messageId = $('.taskMessage').find("option:selected").val();
    let taskCron = $("input[name='taskCron']").val();
    let senderId = $('.appointSender').find("option:selected").val();
    let groupIds = [];
    let options = $('.select-people').find("option");
    for (let i = 0; i < options.length; i++) {
        let option = options.eq(i).val();
        if (option !== undefined) {
            groupIds.push(option);
        }
    }
    modifyTask(id, taskName, messageId,taskCron,senderId,groupIds, function () {
        taskController.view.render();
        taskController.view.reload();
    })
}