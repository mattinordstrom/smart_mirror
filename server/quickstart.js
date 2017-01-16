var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
    
function GApi(type) {
	this.type = type;
	
	this.tokenPath = TOKEN_DIR + type + '-nodejs-quickstart.json';
	
	// If modifying these scopes, delete your previously saved credentials
	// at ~/.credentials/calendar-nodejs-quickstart.json
	this.scopes = ['https://www.googleapis.com/auth/'+ type +'.readonly'];
	

	var oAuth2Client = null;
	
	this.setAuthClient = function(oauth2Client) {
        oAuth2Client = oauth2Client;
    }

    this.getAuthClient = function() {
        return oAuth2Client;
    }
}

GApi.prototype.readFile = function () {
	// Load client secrets from a local file.
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
		if (err) {
			console.log('Error loading client secret file: ' + err);
			return;
		}
		// Authorize a client with the loaded credentials, then call the
		// Google Calendar/Gmail API.
		this.authorize(JSON.parse(content), this.setAuthClient);
	}.bind(this));

};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
GApi.prototype.authorize = function (credentials, callback) {
	var clientSecret = credentials.installed.client_secret;
	var clientId = credentials.installed.client_id;
	var redirectUrl = credentials.installed.redirect_uris[0];
	var auth = new googleAuth();
	var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

	// Check if we have previously stored a token.
	fs.readFile(this.tokenPath, function (err, token) {
		if (err) {
			this.getNewToken(oauth2Client, callback);
		} else {
			oauth2Client.credentials = JSON.parse(token);
			callback(oauth2Client);
		}
	}.bind(this));
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
GApi.prototype.getNewToken = function (oauth2Client, callback) {
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: this.scopes
	});
	console.log('Authorize this app by visiting this url: ', authUrl);
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Enter the code from that page here: ', function (code) {
		rl.close();
		oauth2Client.getToken(code, function (err, token) {
			if (err) {
				console.log('Error while trying to retrieve access token', err);
				return;
			}
			oauth2Client.credentials = token;
			this.storeToken(token);
			callback(oauth2Client);
		}.bind(this));
	}.bind(this));
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
GApi.prototype.storeToken = function (token) {
	try {
		fs.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw err;
		}
	}
	fs.writeFile(this.tokenPath, JSON.stringify(token));
	console.log('Token stored to ' + this.tokenPath);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
GApi.prototype.listEvents = function (auth, callback) {
	if(this.type !== 'calendar') {
		console.log('Error: Type is not calendar. '+this.type);
		return;
	}
	
	var calendar = google.calendar('v3');
	calendar.events.list({
		auth: auth,
		calendarId: 'primary',
		timeMin: (new Date()).toISOString(),
		maxResults: 10,
		singleEvents: true,
		orderBy: 'startTime'
	}, callback);
	
}

/**
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
GApi.prototype.listEmails = function (auth, callback) {
	if(this.type !== 'gmail') {
		console.log('Error: Type is not gmail. '+this.type);
		return;
	}

	  var gmail = google.gmail('v1');
	  gmail.users.messages.list({
		auth: auth,
		userId: 'me',
		q: 'is:unread'
	  }, function (err, response) {
		  if (err) {
			  console.log('The API returned an error: ' + err);
			  return;
			}
			
			callback(response);
	  });
	  
}

module.exports = GApi;
