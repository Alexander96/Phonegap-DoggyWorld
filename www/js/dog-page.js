$(document).delegate('#' + pages.Dogs, 'pagebeforeshow', function () {
    $.ajax({
	    url: domain + 'dogs/' + curUser._id,
	    type: 'GET',
	    error : function (){ document.title='error'; }, 
	    success: function (data) {
	    	if(data){
	    		dogs = data;
	    		console.log(data);
	    		for(var i=0;i<dogs.length;i++){
	    			dogs[i].profPhoto = domain + "curUser._id"+"/imgdog/"+dogs[i]._id;
	    		}
	    		loadDogs();
	    	}
	    }
	});
});
var clickedDog;
function loadDogs(){
	var template = '';
	for(var i=0;i<dogs.length;i++){
		template += '<div class="dog-container" onclick="dogClick(' +"'" +dogs[i]._id+ "'" + ')">';
		template += '<h3 class="dog-field">' + dogs[i].name + '</h3>';
		template += '<p class="dog-field">' + dogs[i].breed+'</p>';
		template += '<p class="dog-field">'+dogs[i].birthDate+'</p>';
		template += '<div class="dog-img-container"><img src="' + dogs[i].profPhoto + '" /></div>';
		template += '<p class="dog-field">'+dogs[i].description+'</p>';
		template += '<a href="#edit-dog-dialog" class="edit-btn ui-btn ui-icon-edit ui-btn-icon-right" data-rel="dialog" data-transition="slide">Edit</a>';
		template += '</div>';

	}
	$("#dogs-content").html(template);

}
/*function dogClick(dogId){
	for(var i=0;i<dogs.length;i++){
		if(dogs[i]._id == dogId){
			clickedDog = dogs[i];
			break;
		}
	}
	$("#" + pages.OneDog +"-title").html(clickedDog.name);
	loadDogCurDog();
	
	goToPage(pages.OneDog);

}*/
function loadDogCurDog(){
	$("h3[name=dog-name]").html(clickedDog.name);
	$("p[name=dog-breed]").html(clickedDog.breed);
	$("p[name=dog-birthdate]").html(clickedDog.birthDate);
	$("div[name=dog-image]>img").attr("src", clickedDog.profPhoto);
	$("p[name=dog-description]").html(clickedDog.description);
}
function saveDog(){
	$( "#edit-dog-dialog" ).dialog( "close" );
}
$("input[name=dog-image]").change(function(){
    var file = $("input[type=file]")[0].files[0];
    alert(file.name + "\n" +
          file.type + "\n" + 
          file.size + "\n" + 
          file.lastModifiedDate);
});