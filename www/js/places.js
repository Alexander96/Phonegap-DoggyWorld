function initialize() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 15,
        center: latlng
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
            myOptions);
}
$(document).delegate('#' + pages.Places, 'pageshow', function () {
	initialize();
	alert("loaded");
})
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);