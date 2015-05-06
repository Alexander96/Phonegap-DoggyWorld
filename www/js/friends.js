var chatWithId = "",
	chatWithUsername = "";
function renderFriendsList(friends){
	var template='';

	for(var i=0;i<friends.length;i++){
		template += '<li data-corners="false" data-shadow="false" data-wrapperels="div"  data-theme="b">';
        template += '<div onclick="openChat(' + "'" + friends[i]._id+ "'" + "," + "'" + friends[i].username+ "'" + ')" class="ui-btn ui-badge-container">';
        template += '<span>' + friends[i].username + '</span>';
        template += '<span class="badge" id=' +"'friend-" +friends[i]._id+ "'" + '>0</span>';
        template += '</div></li>';
	}

	$("#chat-friends-ul").html(template);
}
function openChat(personId, personUsername){
	chatWithId = personId;
	chatWithUsername = personUsername;
	
	$("#chat-name").text(personUsername);
	$.mobile.changePage("#" + pages.Chat);
}
function changeBadge(friendId, number){
	$("#friend-" + friendId).text(number);
}
function sendMessage(){
	var text = $("#chat-message").val().trim();
	renderMyMessage(text);
	renderOtherMessage(text);
	$("#chat-message").val("");
}
function renderMyMessage(msg){
	var template = "";
	template += '<div><div class="my-message">'+msg+'</div></div><div class="clearfix"></div>';
	$("#chat-content").append(template);
}
function renderOtherMessage(msg){
	var template = '<div><div class="other-person-message">'+msg+'</div></div><div class="clearfix"></div>';
	$("#chat-content").append(template);	

}