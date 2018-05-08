function receiverList(callback) {
    $.ajax({
        method: "GET",
        url: server + "receiver/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this,result)
        } else {
            alert(404)
        }
    });
}
function addReceiver(name,email,callback) {
    $.ajax({
        method: 'POST',
        url: server + "receiver/add",
        data: {
            name: name,
            email: email
        },
    }).done(function (data) {
       callback.call(this,data);
    });
}
function deleteReceiver(id,callback) {
    $.ajax({
        method: 'GET',
        url: server + "receiver/delete",
        data: {
            id:id
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}

function groupList(callback) {
    $.ajax({
        method: "GET",
        url: server + "group/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this,result)
        } else {
            alert(404)
        }
    });

}
function addReceiverGroup(groupName,receiverGroupIds,callback) {
    $.ajax({
        method: 'POST',
        url: server + "group/add",
        data: {
            name: groupName,
            receiverId: receiverGroupIds
        },
        traditional:true
    }).done(function (data) {
        callback.call(this,data);
    });
}
function deleteReceiverGroup(id,callback) {
    $.ajax({
        method: 'GET',
        url: server + "group/delete",
        data: {
            id:id
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}

function messageList(callback) {
    $.ajax({
        method: "GET",
        url: server + "message/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this,result)
        } else {
            alert(404)
        }
    });
}
function addMessage(subject,content,callback) {
    $.ajax({
        method: 'POST',
        url: server + "message/add",
        data: {
            subject: subject,
            content: content
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}
function deleteMessage(id,callback) {
    $.ajax({
        method: 'GET',
        url: server + "message/delete",
        data: {
            id:id
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}

function adminList(callback) {
    $.ajax({
        method: "GET",
        url: server + "admin/list",//确认列表前面的名字
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this,result)
        } else {
            alert(404)
        }
    });
}
function addAdmin(adminName, adminPassword,adminConfirmPassword,callback) {
    $.ajax({
        method: 'POST',
        url: server + "receiver/add",//确认列表前面的名字和字段
        data: {
        adminName: adminName,
            adminPassword: adminPassword,
            adminConfirmPassword:adminConfirmPassword
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}
function deleteAdmin(id,callback) {
    $.ajax({
        method: 'GET',
        url: server + "admin/delete",
        data: {
            id:id
        },
    }).done(function (data) {
        callback.call(this,data);
    });
}