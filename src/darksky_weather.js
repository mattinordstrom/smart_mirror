/*
clear-day
clear-night
partly-cloudy-day
partly-cloudy-night
cloudy
rain
sleet
snow
wind
fog
*/
var skycons = new Skycons({"color": "white"});
function handleWeather(data) {
	skycons.set("weather_icon", Skycons[data.forecast.currently.icon.toUpperCase().replace(/-/g, '_')]);
	skycons.play();
	
	$('#div_weather h2:first').html(data.forecast.currently.temperature.toFixed(1) + "&deg;");
	$('#div_weather :eq(1)').html(data.forecast.currently.summary);
	$('#weatherCoords').html("Longitude: " + data.forecast.longitude + "<br/>Latitude: " + data.forecast.latitude);
		
}
