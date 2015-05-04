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
	$.mobile.loading("show");
	// /updateDog/:userId/:dogId
	clickedDog.name = $("[name=dog-name]").val();
	clickedDog.breed = $("[name=dog-breed]").val();
	clickedDog.birthDate = $("[name=dog-birthdate]").val();
	if(profPhoto.data){
		clickedDog.profPhoto = profPhoto;
	}
	else{
	}
	clickedDog.description = $("[name=dog-description]").val();
	alert(curUser._id);
	$.ajax({
      url: domain + "updateDog/" + curUser._id + "/" + clickedDog._id + "?user_id_access_token=" + user_id_access_token,
      type: 'PUT',
      data: clickedDog,
      dataType: 'json',
      error : function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        $.mobile.loading("hide");
      }, 
      success: function () {
      	console.log(response);
      	$( "#edit-dog-dialog" ).dialog( "close" );
      }
  	});

}

var data,
	contentType;
var profPhoto = {};
$(document).delegate('#' + pages.EditDog, 'pageshow', function () {
	var image = 
   $( '#edit-dog-img' ).on("change", function(){
		var files = this.files;
		var reader = new FileReader();
		name=this.value;
         
		reader.onload = function (e) {
		    console.log(e);
		    var result = e.target.result;
			data = result.slice(result.indexOf(",") +1, result.length);
		    contentType = result.slice(result.indexOf(":") + 1, result.indexOf(";base64"));

            profPhoto.data = data;
            profPhoto.contentType = contentType;
            console.log(profPhoto);
		};
		reader.readAsDataURL(files[0]);
	});
});