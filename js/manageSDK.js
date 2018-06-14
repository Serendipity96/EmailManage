function receiverList(callback) {
    $.ajax({
        method: "GET",
        url: server + "receiver/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}

function addReceiver(name, email, callback) {
    $.ajax({
        method: 'POST',
        url: server + "receiver/add",
        data: {
            name: name,
            email: email
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function deleteReceiver(id, callback) {
    $.ajax({
        method: 'GET',
        url: server + "receiver/delete",
        data: {
            id: id
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function modifyReceiver(id, name, email, callback) {
    $.ajax({
        method: 'POST',
        url: server + "receiver/set",
        data: {
            id: id,
            name: name,
            email: email
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function groupList(callback) {
    $.ajax({
        method: "GET",
        url: server + "group/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });

}

function addReceiverGroup(groupName, receiverGroupIds, callback) {
    $.ajax({
        method: 'POST',
        url: server + "group/add",
        data: {
            name: groupName,
            receiverId: receiverGroupIds
        },
        traditional: true
    }).done(function (data) {
        callback.call(this, data);
    });
}

function modifyReceiverGroup(id, groupName, receiverGroupIds, callback) {
    $.ajax({
        method: 'POST',
        url: server + "group/set",
        data: {
            id: id,
            name: groupName,
            receiverId: receiverGroupIds
        },
        traditional: true
    }).done(function (data) {
        callback.call(this, data);
    });
}

function getGroup(id, callback) {
    $.ajax({
        method: "GET",
        url: server + "group/get",
        data: {
            id: id
        }
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}

function deleteReceiverGroup(id, callback) {
    $.ajax({
        method: 'GET',
        url: server + "group/delete",
        data: {
            id: id
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function messageList(callback) {
    $.ajax({
        method: "GET",
        url: server + "message/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}

function addMessage(subject, content,fileName,fileResult, callback) {
    $.ajax({
        method: 'POST',
        url: server + "message/add",
        data: {
            subject: subject,
            content: content,
            attachmentName:fileName,
            attachmentPath:fileResult,
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function fileUpLoad(file,callback) {
    $.ajax({
        method: 'POST',
        url: server + "message/attachment",
        contentType: false,
        processData: false,
        data: file
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}
function modifyMessage(id, subject, content, callback) {
    $.ajax({
        method: 'POST',
        url: server + "message/set",
        data: {
            id: id,
            subject: subject,
            content: content
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function deleteMessage(id, callback) {
    $.ajax({
        method: 'GET',
        url: server + "message/delete",
        data: {
            id: id
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}


function taskList(callback) {
    $.ajax({
        method: "GET",
        url: server + "task/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}

function addTask(taskName, messageId, taskCron, senderId, groupIds, callback) {
    $.ajax({
        method: 'POST',
        url: server + "task/add",
        data: {
            name: taskName,
            messageId: messageId,
            cron: taskCron,
            senderId: senderId,
            groupId: groupIds
        },
        traditional: true
    }).done(function (data) {
        callback.call(this, data);
    });
}

function deleteTask(id, callback) {
    $.ajax({
        method: 'GET',
        url: server + "task/delete",
        data: {
            id: id
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function modifyTask(id, taskName, messageId, taskCron, senderId, groupIds, callback) {
    $.ajax({
        method: 'POST',
        url: server + "task/set",
        data: {
            id: id,
            name: taskName,
            messageId: messageId,
            cron: taskCron,
            senderId: senderId,
            groupId: groupIds
        },
        traditional: true
    }).done(function (data) {
        callback.call(this, data);
    });
}

function getTask(id, callback) {
    $.ajax({
        method: "GET",
        url: server + "task/get",
        data: {
            id: id
        }
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}

function senderList(callback) {
    $.ajax({
        method: "GET",
        url: server + "sender/list",
    }).done(function (data) {
        if (data.status === 200) {
            let {result} = data;
            callback.call(this, result)
        } else {
            alert(404)
        }
    });
}



function modifyAccount(id, username, password, callback) {
    $.ajax({
        method: 'POST',
        url: server + "account/set",
        data: {
            id: id,
            username: username,
            password: password
        },
    }).done(function (data) {
        callback.call(this, data);
    });
}

function login(username, password, callback) {
    $.ajax({
        method: "POST",
        url: server + "login",
        data: {
            username: username,
            password: password
        }
    }).done(function (data) {
        callback.call(this, data);
    });
}

function logout(callback) {
    $.ajax({
        method: 'GET',
        url: server + "/logout",
    }).done(function (data) {
        callback.call(this, data);
    });
}