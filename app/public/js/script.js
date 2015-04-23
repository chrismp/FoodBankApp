// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map, layer;

function initialize() {
	var mapOptions = {
		zoom: 11
	};

	map = new google.maps.Map(
		document.getElementById('map-canvas'),
		mapOptions
	);

	// Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				var pos = new google.maps.LatLng(
					position.coords.latitude,
					position.coords.longitude
				);
				var locationColumn = '\'Address\'';
				var tableId = '1Ezc5kU3XaYLx6CnRvbzN5J_rGNA5QWIGHiSo8g_7';

				layer = new google.maps.FusionTablesLayer({
					query: {
						select: locationColumn,
						from: tableId
					},
					suppressInfoWindows: true
				});
				layer.setMap(map);

				map.setCenter(pos);
				google.maps.event.addListener(layer,'click',function(e){
					var latLng = e.latLng;
					var row = e.row;
					var foodSupply = row['FoodSupply'].value
					var meterColor = foodSupply===1 ? 'red' : foodSupply===2 ? 'yellow' : 'green';
					var foodMeterIcon = '<span class="food-meter '+meterColor+' glyphicon glyphicon-grain" aria-hidden="true"></span>';
					 
					var foodMeter = [];
					for(var i=0; i<foodSupply; i++){
						foodMeter.push(foodMeterIcon);
					}

					var contentArray = [
						'<b>'+row['Name'].value+'</b>',
						row['Address'].value,
						row['Phone'].value,
						'<b>Food supply</b> '+foodMeter.join(''),
						'<a href="index.html" class="btn btn-primary btn-xs">Home</a>'
					];
					var content = contentArray.join('<br>');
					var infowindow = new google.maps.InfoWindow({
						map: map,
						position: {
							lat: latLng.k,
							lng: latLng.D
						},
						content: content
					});
					infowindow.open(map);
				});
			}, 
			function() {
				handleNoGeolocation(true);
			}
		);
	} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

