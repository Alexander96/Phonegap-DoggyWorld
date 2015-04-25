var PlacesService = {
	displayPlaces: function(map, places, curUser_s){ //display the places
		var img = domain + "/img/";
		if(curUser_s){	//if current user places display markers with blue marker else with green marker
			img += 'marker-blue.png';
		}
		else{
			img += 'marker-green.png';
		}
		var markers = [];
		for(var i=0;i<places.length;i++){
			var location = new google.maps.LatLng(places[i].lat * 1, places[i].lng * 1);
			
			var marker = new google.maps.Marker({
          		position: location, 
          		draggable: false,
          		icon: img,
          		map: map,
          		zIndex: 3
      		});
      		markers.push(marker);
		}
		return markers;
	},
	setInfoMarker: function (map, marker, place){		//sets the info window of a marker
		marker.info = new google.maps.InfoWindow({
            content: '<div class="markerNameInfo">' 
            + (place.name || "no name of place") + '</div>' 
            + (place.description || "no description") + "<br />" 
            + "rate: " + place.rate
      	});
          google.maps.event.addListener(marker, 'click', function() {
            marker.info.open(map, marker);
      	});
        marker.info.open(map, marker);
	},
	openInfoMarkerArray: function (map, markers, places){		//open the info windows of array of markers
		for(var i=0;i<markers.length;i++){
			this.setInfoMarker(map, markers[i], places[i]);
		}
	},
	deletePlace: function(marker){	//delete place from the map
		if(marker)
			marker.setMap(null);
	},
	setLatLngObj: function (place){	//sets the lat and lng of a place (return from the database)
		var location = new google.maps.LatLng(place.lat * 1, place.lng * 1);
		place.location = location;
		return place;
	}
}