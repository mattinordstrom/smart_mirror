var gcal = require('./quickstart.js');

var SYNC_INTERVAL_CAL = 15; //seconds

var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(8081);

var Main = function (socket) {
	console.log('io connected');
	
	this.googleCal = new gcal();
	this.googleCal.readFile();
	
	setInterval(function() { 
		var oauth2Client = this.googleCal.getAuthClient();
		if(oauth2Client){
			this.googleCal.listEvents(oauth2Client, function(err, response){
				if (err) {
					console.log('The API returned an error: ' + err);
					return;
				}
				
				//console.log('Emitting calendar events');
				socket.emit('calEvents', { calEvents: response.items });
				
			});
		} else {
			console.log('oauth2Client not set yet.');	
		}
		
	}.bind(this), SYNC_INTERVAL_CAL * 1000);
	
}

io.on('connection', Main);
