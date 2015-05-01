var map,
  markersCurUser = [],
  placesCurUser = [],
  markersOtherUsers = [],
  placesOtherUsers = [],
  curLatLng,
  curLat,
  curLon,
  viewLatLng;
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
    template += '<div class="places-container"><div class="places-img-container">';
    if(curUser) template += '<img src="http://pupmates.net/img/marker-blue.png">';
    else template += '<img src="http://pupmates.net/img/marker-green.png">';
    template +='</div><div class="places-name">' + places[i].name + "</div>";
    template += '<div class="places-rate"> | rate: ' + places[i].rate + '</div>';
    template += '<div class="places-description">' + places[i].description + '</div>';
    template += '<div class="places-buttons"><button class="ui-btn ui-icon-navigation ui-btn-icon-right" onclick="viewPlace(' +"'" +places[i]._id+ "'" + ')">View on Map</button>';
    if(curUser)
      template += '<button class="ui-btn ui-icon-delete ui-btn-icon-right" onclick="deletePlace(' +"'" +places[i]._id+ "'" + ')">Delete</button>';
    else
      template += '<button class="ui-btn ui-icon-heart ui-btn-icon-right" onclick="ratePlace(' +"'" +places[i]._id+ "'" + ')">Rate +1</button>';
    template += '</div>';
    template += '</div>';
  }
  if(curUser) $("#fragment-1").html(template);
  else $("#fragment-2").html(template);
}
$(document).delegate('#' + pages.Places, 'pageshow', function () {
	initialize();
	navigator.geolocation.getCurrentPosition(onSuccess, onError);

  $.ajax({
      url: domain + "places/" + curUser._id,
      type: 'GET',
      data: {user_id_access_token: user_id_access_token},
      dataType: 'json',
      error : function (){ document.title='error'; }, 
      success: function (places) {
        console.log(places);
        placesCurUser = places;
        markersCurUser = PlacesService.displayPlaces(map, places, true);
        PlacesService.openInfoMarkerArray(map, markersCurUser, placesCurUser);
        PlacesService.setCenter(map, curLatLng);
        renderPlaces(placesCurUser, true);

        console.log("Markers");
        console.log(markersCurUser);
      }
  });
  $.ajax({
      url: domain + "places/allexceptofuser/" + curUser._id,
      type: 'GET',
      data: {user_id_access_token: user_id_access_token},
      dataType: 'json',
      error : function (){ document.title='error'; }, 
      success: function (places) {
        console.log(places);
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
  alert(id)
}
function deletePlace(id){
  alert(id);
}
