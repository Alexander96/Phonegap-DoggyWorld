var socketSystem = (function () {

	var socket = io(domain);

    function getMessages(toId, beforeNth, count) {

        socket.emit('get private messages',
            {
                from: curUser._id,
                to: toId,
                before: beforeNth,
                count: count
            }
        );     
    }

    function seePrivateMessage (message) {

        if(message.to === curUser._id && !message.seen) {

            socket.emit('see private message', message);
        }
        
    }

    function sendMessage(to, text) {

    	var newMessage = {
            from: curUser._id,
            content: text,
            to: to
        };

		socket.emit('send private message', newMessage);
    }

    socket.on('new message', function (message) {

    	console.log(message);

    	var recipient = message.to == curUser._id ? message.from : message.to;

    	allMessages[recipient].push(message);

    	if(recipient == chatWithId) {

    		renderOtherMessage(message.content);
    	}
    });

    socket.on('see private message done', function (message) {

        if(message.to == chatWithId) {

        	//DISPLAY SEEN IN CHAT
        }
    });

    socket.on('messages chunk', function (data) {

        console.log(data);

        if(!data.messages) {
            return;
        }
        else if(data.messages.length == 0) {
            return;
        }

        if(data.messages[0].from == chatWithId || data.messages[0].to == chatWithId) {

        	for (var i = 0; i < data.messages.length; i++) {
        		
        		if(data.messages[i].from == curUser._id) {

        			renderMyMessage(data.messages[i].content);
        		}
	        		else {
	        			renderOtherMessage(data.messages[i].content);		
	        		}

	        	if(i + 1 == data.messages.length && data.messages[i].seen && data.messages.from == curUser._id) {

	        		//DISPLAY SEEN IN CHAT
	        	} 
        	};
        }

        var friend = data.messages[0].from == curUser._id ? data.messages[0].to : data.messages[0].from;

        if(!allMessages[friend]) {

        	allMessages[friend] = data.messages;
        }
	        else {

	        	allMessages.push(data.messages);
	        }

    });

    return {
    	getMessages: getMessages,
    	sendMessage: sendMessage
    }

})();