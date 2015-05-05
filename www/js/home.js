$(document).delegate('#' + pages.Home, 'pageshow', function () {
	var url = domain + 'achievments/available';
	console.log(url);

    $.ajax({
	    url: url,
	    type: 'GET',
	    dataType: 'json',
	    error : function (){ navigator.notification.alert("You must enter a username and password", function() {}); }, 
	    success: function (achievements) {
	    	renderAchievements(achievements);
	    	console.log(achievements);
	    }
	});
});
function renderAchievements(achievements, id){
	var template = "";
	if(!achievements)return;
/*<div class="main-achievement">
                    <p class="achievement-description">Command the dog to sit</p>
                    <div class="achievement-author">Author: Boyan hristov</div>
                    <div class="achievement-points">Points: 20</div>
                </div>*/
	for(var i=0;i<achievements.length;i++){
		template += '<div class="main-achievement"><p class="achievement-description">'
		template += achievements[i].description + '</p>';
		template += '<div class="achievement-author">Author: ' + achievements[i].author.name +  '</div>';
		template += '<div class="achievement-points">Points: ' + achievements[i].points + '</div>';
		template += '</div>';
	}
	if(!id)
		$("#achievements-content").html(template);
	else
		$("#" + id).html(template);
}
function LoadFieldsProfile(){
	$("[name=profile-firstName]").val(curUser.firstName);
	$("[name=profile-lastName]").val(curUser.lastName);
	$("[name=profile-email]").val(curUser.email);
}