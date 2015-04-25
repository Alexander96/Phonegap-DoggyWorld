var map;
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
});
var onSuccess = function(position) {
	var lat = position.coords.latitude,
		lon = position.coords.longtitude;
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    map.setCenter(new GLatLng(lat, lon));
};

// onError Callback receives a PositionError object
//
function onError(error) {
	//error.code
	//error.message
	console.log("couldnt get current location");
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);