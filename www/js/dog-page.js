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
function dogClick(dogId){
	for(var i=0;i<dogs.length;i++){
		if(dogs[i]._id == dogId){
			clickedDog = dogs[i];
			break;
		}
	}
	loadDogCurDog();

}
function loadDogCurDog(){
	$("[name=dog-name]").val(clickedDog.name);
	$("[name=dog-breed]").val(clickedDog.breed);
	var splitted = clickedDog.birthDate.split("/");
	if(splitted[0] * 1 < 10) splitted[0] = "0" + splitted[0];
	if(splitted[1] * 1 < 10) splitted[1] = "0" + splitted[1];
	var d = splitted[2] + "-" + splitted[1] + "-" +splitted[0];
	console.log(d);
	$("[name=dog-birthdate]").val(d);
	$("[name=dog-description]").val(clickedDog.description);
}
function saveDog(){
	$( "#edit-dog-dialog" ).dialog( "close" );

	// /updateDog/:userId/:dogId
	//put
}
var files;

// Add events
$('input[type=file]').on('change', prepareUpload);

// Grab the files and set them to our variable
function prepareUpload(event)
{
  files = event.target.files;
  console.log(files);
  alert(files);
}
