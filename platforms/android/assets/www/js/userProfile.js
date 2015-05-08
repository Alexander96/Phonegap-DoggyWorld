var userProfile = null;

function viewProfile(username){
	$.mobile.loading("show");
	$.ajax({
      url: domain + "api/user-all-data/" + username,
      type: 'GET',
      data: {user_id_access_token: user_id_access_token},
      dataType: 'json',
      error : function (){ document.title='error';$.mobile.loading("hide"); }, 
      success: function (data) {
      	userProfile = data;
      	console.log(userProfile);
      	userProfile.profPhoto = domain+"img/profPhoto/" + userProfile._id;

      	$("#user-main-names").html("<h3>" + userProfile.firstName + "</h3>" + "<h3>" + userProfile.lastName + "</h3>");
		$("#user-main-img-container").html('<img src="'+ userProfile.profPhoto +'">');
		
		$.mobile.changePage("#" + pages.Home, {reverse: false, transition: "slide"});
      	for(var i=0;i<userProfile.dogs.length;i++){
			userProfile.dogs[i].url = domain + userProfile._id +"/imgdog/"+userProfile.dogs[i]._id;
		}
      	loadDogs("user-dogs", userProfile.dogs);
      	renderAchievements(userProfile.achievements, "user-achievements-content");

      	$.mobile.loading("hide");
      	$.mobile.changePage("#" + pages.UserProfile, {reverse:false, transition:"pop"});
      }
  });
}