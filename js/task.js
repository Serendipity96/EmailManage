let taskController = {
    view: {
        el: '.task-layout',
        template: `
            <div class="publishTask">
                <h2>发布任务</h2>
                <div class="row">
                <label for="">
                任务名称
                <input name="taskName" type="text">
                </label>
            <label class="sendMessage" for="">
                发送消息
                <input name="taskMessage" type="text">
            </label>
            <button class="chooseCron">选择Cron</button>
            <input type="text" disabled="disabled">
        </div>
        <div class="row" style="margin-top: 15px">
            <label for="">
                指派发送器
                <select class="appointTransmitter ">
                    <option value="volvo" selected>A</option>
                    <option value="saab">B</option>
                    <option value="opel">C</option>
                    <option value="audi">D</option>
                </select>
            </label>
            <div class="label-container">
                <label for="" class="select-label">
                    接收消息的人
                    <select multiple class="select-people">
                    </select>
                </label>
                <div class="button-container task-button-container">
                    <button class="button-right">>></button>
                    <button class="button-left"><<</button>
                </div>
                <label for="" class="no-receiver no-select-label">
                    不接收消息的人
                    <select multiple class="select-people">
                    </select>
                </label>
            </div>
            <button id="taskButton" onclick="addTaskItem(this)" type="submit">添加</button>
        </div>
    </div>
            <div class="taskContent">
        <table>
            <thead>
            <tr>
                <th class="name-td">任务名</th>
                <th class="email-td">状态</th>
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
            taskList((list) => {
                $('#task-tbody').empty();
                list.map((result) => {
                    $('.noselect-people').append(`
                    <option value="${result.id}">${result.name}</option>
                    `)
                })
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
                });
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
                });
            })
        },
        reload() {
            taskList((list) => {
                $('#task-tbody').empty();
                list.map((result) => {
                    $('#task-tbody').append(`
                        <tr>
                            <td class="task-name">${result.name}</td>
                            <td class="task-number">${result.receiverNumber}</td>
                            <td><span class="edit">修改</span>/<span class="delete">删除</span></td>
                        </tr>
                    `);
                });
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
    let taskMessage = $("input[name='taskMessage']").val();
    let taskCron;
    let taskSender;
    //Cron值的获取
    //发送器的值
    let receiverIds = [];
    let options = $('.select-people').find("option");
    for (let i = 0; i < options.length; i++) {
        let option = options.eq(i).val();
        if (option !== '') {
            receiverIds.push(option);
        }
    }
    addTask(taskName, taskMessage, taskCron, taskSender, receiverIds, function () {
        taskController.view.render();
        taskController.view.reload();
    })


}
