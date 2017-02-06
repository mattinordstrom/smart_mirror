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

	//calendar, mail, weather
	this.ongoingProcesses = [false,false,false];

	setInterval(function() {
		//GOOGLE CALENDAR
		///////////////////////
		let oauth2ClientCAL = this.googleCal.getAuthClient();
		if(oauth2ClientCAL && !this.ongoingProcesses[0]){
			this.ongoingProcesses[0] = true;
			this.googleCal.listEvents(oauth2ClientCAL, function(err, response){
				this.ongoingProcesses[0] = false;
				if (err) {
					console.log('The API returned an error: ' + err);
					return;
				}

				socket.emit('calEvents', { calEvents: response.items });

			}.bind(this));
		} else {
			//console.log('oauth2Client not set.');
		}

		//GOOGLE MAIL
		///////////////////////
		let oauth2ClientMAIL = this.googleMail.getAuthClient();
		if(oauth2ClientMAIL && !this.ongoingProcesses[1]){
			this.ongoingProcesses[1] = true;
			this.googleMail.getAmountOfUnreadEmails(oauth2ClientMAIL, function(response){
				this.ongoingProcesses[1] = false;
				socket.emit('emails', { numberOfUnreadEmails: response.threadsUnread });

			}.bind(this));

		} else {
			//console.log('oauth2Client not set.');
		}

		//DARKSKY WEATHER
		///////////////////////
		if(!this.ongoingProcesses[2]){
			this.ongoingProcesses[2] = true;
			this.forecast.getForecast(function(response){
				this.ongoingProcesses[2] = false;
				socket.emit('forecast', { forecast: response });
			}.bind(this));
		}

	}.bind(this), SYNC_INTERVAL * 1000);

}

io.on('connection', Main);
