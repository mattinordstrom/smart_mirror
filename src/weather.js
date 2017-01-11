var OWM_API_KEY = '';
function getWeather() {
	$.get("http://api.openweathermap.org/data/2.5/forecast/city?q=V%C3%A4xj%C3%B6&units=metric&APPID=" + OWM_API_KEY, function (result) {
		$('#div_weather h1:first').html(result.list[0].main.temp + "&deg;");
		$('#div_weather :eq(1)').html(result.list[0].weather[0].description);
		$('#div_weather :eq(2)').html(result.city.name + ', ' + result.city.country);
		//IMG: http://openweathermap.org/img/w/02n.png (result.list[0].weather[0].icon)
	});
}
