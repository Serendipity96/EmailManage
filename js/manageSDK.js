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

function addMessage(subject, content, callback) {
    $.ajax({
        method: 'POST',
        url: server + "message/add",
        data: {
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


//
// let cal = {
//     sum: 0,
//     add(number) {
//         this.sum += number;
//         return this;
//     },
//     sub(number) {
//         this.sum -= number;
//         return this;
//     },
//     result() {
//         return this.sum;
//     }
// }
//
// cal.add(3).sub(1).result();
//
// setInterval(function () {
//     alert("hhh")
// }, 2000);
//
// receiver
//     .add("123", "345")
//     .andThen(function () {
//         //do something
//     }).do();
//
// let r = {
//     name: '',
//     email: '',
//     callbacks: [],
//     errCallbacks:[],
//     add(name, email) {
//         this.name = name;
//         this.email = email;
//         return this;
//     },
//     andThen(callback) {
//         this.callbacks.push(callback);
//         return this;
//     },
//     ifErr(errCallback){
//         this.errCallbacks.push(errCallback);
//         return this;
//     },
//     do() {
//         if(this.email不是email){
//             this.errCallbacks.map(function (callback) {
//                 callback()
//             })
//         }
//         $.ajax({
//             method: 'POST',
//             url: server + "receiver/add",
//             data: {
//                 name: this.name,
//                 email: this.email
//             },
//         }).done(function (data) {
//             if(data.status==200){
//                 this.callbacks.map(function (callback) {
//                     callback.call(this,data)
//                 })
//             }else{
//                 this.errCallbacks.map(function (callback) {
//                     callback.call(this,data)
//                 })
//             }
//         });
//     }
//
// }
// r.add("aaa","bbb")
// .andThen(function () {
//     //刷新页面
// }).andThen(function () {
//     //通知2222
// }).ifErr(function (data) {
//     if(data.status==300){
//         alert("111")
//     }
// }).ifErr(function (data) {
//     if(data.status==400){
//         alert("22")
//     }
// }).do();



