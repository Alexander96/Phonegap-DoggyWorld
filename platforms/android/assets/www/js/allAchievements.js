function getAvaibleAchievements(){
	var url = domain + "achievments/available";
	$.ajax({
	    url: url,
	    type: 'GET',
	    dataType: 'json',
	    error : function (){ navigator.notification.alert("Connection Error", function() {}); }, 
	    success: function (achievements) {
	    	console.log(achievements);
	    	renderAchievements(achievements, 'all-achievements-content');
	    }
	});
}
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
		template += '<div class="achievement-author" onclick="viewProfile('+"'" +achievements[i].author.username+ "'" + ')">Author: ' + achievements[i].author.name +  '</div>';
		template += '<div class="achievement-points">Points: ' + achievements[i].points + '</div>';
		template += '</div>';
	}
	if(!id)
		$("#achievements-content").html(template);
	else
		$("#" + id).html(template);
}
$(document).delegate('#' + pages.AllAchievements, 'pageshow', getAvaibleAchievements);