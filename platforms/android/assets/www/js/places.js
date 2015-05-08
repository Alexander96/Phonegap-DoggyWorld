var map,
  markersCurUser = [],
  placesCurUser = [],
  markersOtherUsers = [],
  placesOtherUsers = [],
  curLatLng,
  curLat,
  curLon,
  viewLatLng,
  ratedPlaces,
  placeToDelete,
  placeToDeleteIndex;



function initialize() {
    var latlng = new google.maps.LatLng(42.4192551, 25.6248617);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        zoomControl: false,
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
            myOptions);
}
function renderPlaces(places, curUser){
  var template = "";
  for(var i=0;i<places.length;i++){
    template += '<div class="places-container" id=' +"'place-" +places[i]._id+ "'" + '><div class="places-img-container">';
    if(curUser) template += '<img src="http://pupmates.net/img/marker-blue.png">';
    else template += '<img src="http://pupmates.net/img/marker-green.png">';
    template +='</div><div class="places-name">' + places[i].name + "</div>";
    template += '<div class="places-rate"> | rate: ' +'<span id=' +"'" +places[i]._id+ "'" + '>' + places[i].rate + "</span>" + '</div>';
    template += '<div class="places-description">' + places[i].description + '</div>';
    template += '<div class="places-buttons"><button class="ui-btn ui-icon-navigation ui-btn-icon-right" onclick="viewPlace(' +"'" +places[i]._id+ "'" + ')">View on Map</button>';
    if(curUser)
      template += '<button class="ui-btn ui-icon-delete ui-btn-icon-right" onclick="deletePlace(' +"'" +places[i]._id+ "'" + ')">Delete</button>';
    else
      template += '<button class="ui-btn ui-icon-heart ui-btn-icon-right"  onclick="ratePlace(' +"'" +places[i]._id+ "'" + ')">Rate +1</button>';
    template += '</div>';
    template += '</div>';
  }
  if(curUser) $("#fragment-1").html(template);
  else $("#fragment-2").html(template);
}
$(document).delegate('#' + pages.Places, 'pageshow', function () {
	initialize();
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

  ratedPlaces = window.localStorage.getItem("ratedPlaces" + curUser._id);
  if(!ratedPlaces) ratedPlaces = {places:[]};
  else{
    ratedPlaces = JSON.parse(ratedPlaces);
  }

  $.ajax({
      url: domain + "places/" + curUser._id,
      type: 'GET',
      data: {user_id_access_token: user_id_access_token},
      dataType: 'json',
      error : function (){ document.title='error'; }, 
      success: function (places) {
        //console.log(places);
        placesCurUser = places;
        markersCurUser = PlacesService.displayPlaces(map, places, true);
        PlacesService.openInfoMarkerArray(map, markersCurUser, placesCurUser);
        PlacesService.setCenter(map, curLatLng);
        renderPlaces(placesCurUser, true);

        //console.log("Markers");
        //console.log(markersCurUser);
      }
  });
  $.ajax({
      url: domain + "places/allexceptofuser/" + curUser._id,
      type: 'GET',
      data: {user_id_access_token: user_id_access_token},
      dataType: 'json',
      error : function (){ document.title='error'; }, 
      success: function (places) {
        //console.log(places);
        placesOtherUsers = places;
        markersOtherUsers = PlacesService.displayPlaces(map, places, false);
        PlacesService.openInfoMarkerArray(map, markersOtherUsers, placesOtherUsers);
        PlacesService.setCenter(map, curLatLng);
        renderPlaces(placesOtherUsers, false);
      }
  });
});
var onSuccess = function(position) {
	curLat = position.coords.latitude,
	curLon = position.coords.longitude;
  curLatLng = new google.maps.LatLng(curLat, curLon);
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
    map.setCenter(curLatLng);
};

// onError Callback receives a PositionError object
//
function onError(error) {
	//error.code
	//error.message
	console.log("couldnt get current location");
}
function viewPlace(id){
  var i=0;
  for(;i<placesCurUser.length;i++){
    if(placesCurUser[i]._id == id){
      viewLatLng = new google.maps.LatLng(markersCurUser[i].position.A, markersCurUser[i].position.F);
      map.setCenter(viewLatLng);
      return;
    }
  }
  for(i=0;i<placesOtherUsers.length;i++){
    if(placesOtherUsers[i]._id == id){
      viewLatLng = new google.maps.LatLng(markersOtherUsers[i].position.A, markersOtherUsers[i].position.F);
      map.setCenter(viewLatLng);
      return;
    }
  }
}
function ratePlace(id){
  // rateplace/:placeId
  for(var i=0;i<ratedPlaces.places.length;i++){
    if(ratedPlaces.places[i]==id){
      //navigator.notification.alert("You have already rated that place :)", function(){});
      return;
    }
  }

  $.ajax({
    url: domain + "rateplace/" + id + "?user_id_access_token=" + user_id_access_token,
    type: "PUT",
    data: {placeId: id},
    dataType: 'json',
    error:function(xhr, ajaxOptions, thrownError){
      if(xhr.status==200){

        ratedPlaces.places.push(id);
        window.localStorage.setItem("ratedPlaces"+curUser._id, JSON.stringify(ratedPlaces));
        $("#" + id).text($("#" +id).text() * 1 + 1);
      }
      //console.log(ratedPlaces.places);
    },
    success:function(res){
      console.log(res);

      ratedPlaces.places.push(id);
      window.localStorage.setItem("ratedPlaces"+curUser._id, JSON.stringify(ratedPlaces));
      $("#" + id).text($("#" +id).text() * 1 + 1);
    }

  });
}
function deletePlace(id){
  placeToDelete = id;
  for(var i=0;i<placesCurUser.length;i++){
    if(placesCurUser[i]._id == id){
      placeToDeleteIndex = i;
      break;
    }
  }
  $("#popup-delete").popup("open");
}
function confirmDelete(){
  $("#place-" + placeToDelete).remove();
  $("#popup-delete").popup("close");
  
  $.ajax({
    url: domain + "places" + "?user_id_access_token=" + user_id_access_token,
    type: "DELETE",
    data: {placeId: placeToDelete},
    error:function(xhr, ajaxOptions, thrownError){
      console.log(xhr.status);
      console.log(thrownError);
    },
    success:function(){
      placesCurUser.splice(placeToDeleteIndex, 1);
      PlacesService.deletePlace(markersCurUser[placeToDeleteIndex]);
      markersCurUser.splice(placeToDeleteIndex, 1);
    }
  })
}
function cancelDelete(){
  placeToDelete = "";
  placeToDeleteIndex = -1;
}