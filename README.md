#smart_mirror

##Preparations 
**1.**
Install dependencies
```sh 
$ cd server/ && npm install
```
  
**2.**
Google auth setup for calendar and email:  
Download your **client_secret.json** and put it in smart_mirror/server/

Follow Step 1 here:  
https://developers.google.com/google-apps/calendar/quickstart/nodejs
  
**3.**
Dark Sky setup for weather data:  
Set your coords and API key in **server/darksky_info.js**  
Get API key from here: https://darksky.net/dev/
  
**4.**
News API setup:  
Set your news sources and API key in **src/news_config.js**  
Get API key from here: https://newsapi.org/account

**Note regarding google auth:**  
The first time you run the sample, it will prompt you to authorize access:  

a. Browse to the provided URL in your web browser.
If you are not already logged into your Google account, you will be prompted to log in. If you are logged into multiple Google accounts, you will be asked to select one account to use for the authorization.  

b. Click the Accept button.  

c. Copy the code you're given, paste it into the command-line prompt, and press Enter.
  
##Usage
```sh 
$ cd server/ && node main.js
```

```sh 
$ chromium-browser --kiosk file:///home/pi/smart_mirror/index.html
```
Press ctrl + w to exit



---
To hide config changes in git:  
git update-index --assume-unchanged server/darksky_info.js  
git update-index --assume-unchanged src/news_config.js
