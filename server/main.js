'use strict';

let forecast = require('./darkskyweather.js');
let gapi = require('./quickstart.js');

const SYNC_INTERVAL = 15; //seconds

let app = require('http').createServer();
let io = require('socket.io')(app);
app.listen(8081);

var Main = function (socket) {
	console.log('io connected');
	
	this.googleCal = new gapi('calendar');
	this.googleCal.readFile();
	
	this.googleMail = new gapi('gmail');
	this.googleMail.readFile();
	
	this.forecast = new forecast();
	
	setInterval(function() { 
		
		//GOOGLE CALENDAR
		///////////////////////
		let oauth2ClientCAL = this.googleCal.getAuthClient();
		if(oauth2ClientCAL){
			this.googleCal.listEvents(oauth2ClientCAL, function(err, response){
				if (err) {
					console.log('The API returned an error: ' + err);
					return;
				}
				
				socket.emit('calEvents', { calEvents: response.items });
				
			});
		} else {
			console.log('oauth2Client not set yet.');	
		}
		
		//GOOGLE MAIL
		///////////////////////
		let oauth2ClientMAIL = this.googleMail.getAuthClient();
		if(oauth2ClientMAIL){
			this.googleMail.listEmails(oauth2ClientMAIL, function(response){
				socket.emit('emails', { unreadEmails: response.resultSizeEstimate });
				
			});
		} else {
			console.log('oauth2Client not set yet.');	
		}
		
		//DARKSKY WEATHER
		///////////////////////
		this.forecast.getForecast(function(response){
			socket.emit('forecast', { forecast: response });
		});
		
	}.bind(this), SYNC_INTERVAL * 1000);
	
}

io.on('connection', Main);
