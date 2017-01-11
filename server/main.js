var gcal = require('./quickstart.js');
var http = require("http");

var Main = function() {
	//TODO
	//this.initServer();
	
    var googleCal = new gcal();
	googleCal.readFile();
}
Main.prototype.initServer = function() {
	http.createServer(function (request, response) {

	   // Send the HTTP header 
	   // HTTP Status: 200 : OK
	   // Content Type: text/plain
	   response.writeHead(200, {'Content-Type': 'text/plain'});
	   
	   // Send the response body as "Hello World"
	   response.end('Hello World\n');
	}).listen(8081);

	// Console will print the message
	console.log('Server running at http://127.0.0.1:8081/');
}

new Main();

module.exports = Main;
