var dogs = [];
var clickedDog;
function loadDogs(id, d){
	var template = '';
	for(var i=0;i<d.length;i++){
		template += '<div class="dog-container" onclick="dogClick(' +"'" +d[i]._id+ "'" + ')">';
		template += '<h3 class="dog-field">' + d[i].name + '</h3>';
		template += '<p class="dog-field">' + d[i].breed+'</p>';
		template += '<p class="dog-field">'+d[i].birthDate+'</p>';
		template += '<div class="dog-img-container"><img src="' + d[i].url + '" /></div>';
		template += '<p class="dog-field">'+d[i].description+'</p>';
		if(!id)
			template += '<a href="#edit-dog-dialog" class="edit-btn ui-btn ui-icon-edit ui-btn-icon-right" data-rel="dialog" data-transition="slide">Edit</a>';
		template += '</div>';

	}
	if(!id)
		$("#dogs-content").html(template);
	else $("#"+id).html(template);

}

function getDogs(){
	$.mobile.loading("show");
    $.ajax({
	    url: domain + 'dogs/' + curUser._id,
	    type: 'GET',
	    error : function (){ document.title='error'; $.mobile.loading("hide"); }, 
	    success: function (data) {
	    	if(data){
	    		dogs = data;
	    		console.log("-----dogs-----");
	    		console.log(dogs);
	    		for(var i=0;i<dogs.length;i++){
	    			dogs[i].url = domain + curUser._id +"/imgdog/"+dogs[i]._id;
	    		}
	    		loadDogs(null, dogs);
	    		$.mobile.loading("hide");
	    	}
	    }
	});
}
$(document).delegate('#' + pages.Dogs, 'pageshow', getDogs);

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
	// updateDog/:userId/:dogId
	clickedDog.name = $("[name=dog-name]").val();
	clickedDog.breed = $("[name=dog-breed]").val();
	var br = $("[name=dog-birthdate]").val().split("-");
	clickedDog.birthDate = br[2] + "/" + br[1] + "/" + br[0];
	//alert(clickedDog.birthDate);
	if(profPhoto.data){
		clickedDog.profPhoto = profPhoto;
	}
	else{
	}
	clickedDog.description = $("[name=dog-description]").val();

	$.ajax({
      url: domain + "updateDog/" + curUser._id + "/" + clickedDog._id + "?user_id_access_token=" + user_id_access_token,
      type: 'PUT',
      data: clickedDog,
      dataType: 'json',
      error : function (xhr, ajaxOptions, thrownError) {
        if(xhr.status == 200){
        	$( "#edit-dog-dialog" ).dialog( "close" );
        	loadDogs(null, dogs);
        }
        $.mobile.loading("hide");
      }, 
      success: function () {
      	console.log(response);
      	$( "#edit-dog-dialog" ).dialog( "close" );
      }
  	});

  	return false;

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