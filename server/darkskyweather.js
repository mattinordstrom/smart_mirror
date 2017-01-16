'use strict';
const DarkSky = require('dark-sky');
let darkskyInfo = require('./darksky_info.js');

var Forecast = function () {
	this.forecast = new DarkSky(darkskyInfo.DARKSKY_API_KEY);
	
	this.forecast
    .latitude(darkskyInfo.DARKSKY_LATITUDE)           
    .longitude(darkskyInfo.DARKSKY_LONGITUDE)          
    .units('ca')                    
    .language('en')                 
    .exclude('minutely,daily');
}

Forecast.prototype.getForecast = function (callback) {
	this.forecast.get()                          
		.then(function(res){                  
			callback(res);
		})
		.catch(function(err) {                 
			console.log('forecast error: ' + err);
		});
}

module.exports = Forecast;
