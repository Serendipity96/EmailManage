let emailSenderController = {
    view: {
        el: '.emailSender-layout',
        template: `
            <h2>邮件发送器</h2>
        <div class="emailSenderContent">
        <table>
            <thead>
            <tr>
                <th class="name-td">IP</th>
                <th class="email-td">状态</th>
            </tr>
            </thead>
            <tbody id="emailSender-tbody"></tbody>
        </table>
    </div>
        `,
        render(data) {
            $(this.el).html(this.template);
            senderList((list) => {
                $('#emailSender-tbody').empty();
                list.map((result) => {
                    let alive = false;
                    if (result.alive === true) {
                        alive = '在线'
                    } else {
                        alive = '离线'
                    }
                    $('#emailSender-tbody').append(`
                    <tr>
                        <td hidden>${result.id}</td>
                        <td>${result.addr}</td>
                        <td>${alive}</td>
                    </tr>
                    `)
                })
            })
        }
    },

    controller:{
        init(view) {
            this.view = view;
            this.view.render();
        }
    },
    init(){
        this.controller.init(this.view);
    }
}