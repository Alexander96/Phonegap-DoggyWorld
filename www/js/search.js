function searchExec(){
	var text = $('#search-input').val();
	$.mobile.loading("show");

	///api/dynamicSearch/:searchContent/:limit?
	$.ajax({
	    url: domain + 'api/dynamicSearch/'+text+"/5",
	    type: 'GET',
	    error : function (){ document.title='error';$.mobile.loading("hide"); }, 
	    success: function (data) {
	    	console.log(data);
	    	renderPeople(data.people);
	    	renderDogs(data.dogs);
	    	$.mobile.loading("hide");
	    }
	});

	return false;
}
function renderPeople(people){
	var template = '<h3 class="title-results">People results</h3>';

	for(var i=0;i<people.length;i++){
		if(people[i]._id == curUser._id) continue;
		template += '<div class="person-search"><div class="person-img-container-search">';
		template += '<img src="http://pupmates.net/img/profPhoto/' + people[i]._id + '"></div>';
		template += '<div class="person-info-search">' + people[i].firstName + ' ' + people[i].lastName +'</div>';
		template += '<div class="search-person-buttons search-first-button"><button class="ui-btn ui-icon-plus ui-btn-icon-right" onclick="addFriend('+"'" +people[i]._id+ "'" + ')" >Add friend</button></div>';
		template += '<div class="search-person-buttons"><button class="ui-btn ui-icon-user ui-btn-icon-right" onclick="viewProfile('+"'" +people[i].username+ "'" + ')" >View Profile</button></div>';
		template += '</div>';
	}
	$("#search-people").html(template);
}
function renderDogs(dogs){
	var template = '<h3 class="title-results">Dogs results</h3>';
	for(var i=0;i<dogs.length;i++){
		dogs[i].url = domain + "curUser._id"+"/imgdog/"+dogs[i]._id;

		template += '<div class="dog-container">';
		template += '<h3 class="dog-field">' + dogs[i].name + '</h3>';
		template += '<p class="dog-field">' + dogs[i].breed+'</p>';
		template += '<p class="dog-field">'+dogs[i].birthDate+'</p>';
		template += '<div class="dog-img-container"><img src="' + dogs[i].url + '" /></div>';
		template += '<p class="dog-field">'+dogs[i].description+'</p>';
		template += '</div>';

	}
	$("#search-dogs").html(template);
}