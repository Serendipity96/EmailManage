let receiver = {
    list(callback) {
        let url = 'receiver/list';
        ajax.ajaxQuery(url, callback);
    },
    add(name, email, callback) {
        let url = 'receiver/add';
        let data = {
            name: name,
            email: email
        }
        ajax.ajaxAdd(url, data, callback)
    },
    delete(id, callback) {
        let url = 'receiver/delete';
        ajax.ajaxDelete(id, url, callback);
    }
};

let receiverGroup = {
    list(callback) {
        let url = 'group/list';
        ajax.ajaxQuery(url, callback);
    },
    add(groupName, receiverGroupIds, callback) {
        let url = 'group/add';
        let data = {
            name: groupName,
            receiverId: receiverGroupIds
        }
        ajax.ajaxAdd(url,data,callback)
    },
    delete(id, callback) {
        let url = 'group/delete';
        ajax.ajaxDelete(id, url, callback);
    }
}

let message = {
    list(callback) {
        let url = 'message/list';
        ajax.ajaxQuery(url, callback);
    },
    add(subject, content, callback) {
        let url = 'message/add';
        let data = {
            subject: subject,
            content: content
        };
        ajax.ajaxAdd(url,data,callback);
    },
    delete(id, callback) {
        let url = 'message/delete';
        ajax.ajaxDelete(id, url, callback)
    }
}

let ajax = {
    ajaxQuery(url, callback) {
        $.ajax({
            method: "GET",
            url: server + url,
        }).done(function (data) {
            if (data.status === 200) {
                let {result} = data;
                callback.call(this, result)
            } else {
                alert(404)
            }
        });
    },
    ajaxAdd(url, data, callback) {
        $.ajax({
            method: 'POST',
            url: server + url,
            data: data,
        }).done(function (data) {
            callback.call(this, data);
        });
    },
    ajaxDelete(id, url, callback) {
        $.ajax({
            method: 'GET',
            url: server + url,
            data: {
                id: id
            },
        }).done(function (data) {
            callback.call(this, data);
        });
    }
}