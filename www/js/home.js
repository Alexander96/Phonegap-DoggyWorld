$(document).delegate('#' + pages.Home, 'pageshow', function () {
	var url = domain + 'achievments/aquired/' + curUser._id;
	console.log(url);

    $.ajax({
	    url: url,
	    type: 'GET',
	    data: {user_id_access_token: user_id_access_token},
	    dataType: 'json',
	    error : function (){ navigator.notification.alert("You must enter a username and password", function() {}); }, 
	    success: function (achievements) {
	    	renderAchievements(achievements);
	    	console.log(achievements);
	    }
	});
});

function LoadFieldsProfile(){
	$("[name=profile-firstName]").val(curUser.firstName);
	$("[name=profile-lastName]").val(curUser.lastName);
	$("[name=profile-email]").val(curUser.email);
}