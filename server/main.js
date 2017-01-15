'use strict';

let forecast = require('./darkskyweather.js');
let gcal = require('./quickstart.js');

const SYNC_INTERVAL_CAL = 15; //seconds

let app = require('http').createServer();
let io = require('socket.io')(app);
app.listen(8081);

var Main = function (socket) {
	console.log('io connected');
	
	this.googleCal = new gcal();
	this.googleCal.readFile();
	
	this.forecast = new forecast();
	
	setInterval(function() { 
		
		//GOOGLE CALENDAR
		///////////////////////
		let oauth2Client = this.googleCal.getAuthClient();
		if(oauth2Client){
			this.googleCal.listEvents(oauth2Client, function(err, response){
				if (err) {
					console.log('The API returned an error: ' + err);
					return;
				}
				
				socket.emit('calEvents', { calEvents: response.items });
				
			});
		} else {
			console.log('oauth2Client not set yet.');	
		}
		
		//DARKSKY WEATHER
		///////////////////////
		this.forecast.getForecast(function(response){
			socket.emit('forecast', { forecast: response });
		});
		
	}.bind(this), SYNC_INTERVAL_CAL * 1000);
	
}

io.on('connection', Main);
