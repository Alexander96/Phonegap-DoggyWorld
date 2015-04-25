var map,
  markersCurUser = [],
  placesCurUser = [],
  markersOtherUsers = [],
  placesOtherUsers = [],
  curLatLng,
  curLat,
  curLon;
function initialize() {
    var latlng = new google.maps.LatLng(42.4192551, 25.6248617);
    var myOptions = {
        zoom: 15,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
            myOptions);
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
