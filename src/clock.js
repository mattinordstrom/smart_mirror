function setTime() {
	var dayStrings = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	var monthStrings = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	if (m < 10) {
		m = "0" + m;
	}
	$('#div_time :first').html(h + ":" + m);
	$('#div_time :eq(1)').html(dayStrings[today.getDay()]);
	$('#div_time :eq(2)').html(today.getDate() + " " + monthStrings[today.getMonth()] + " " + today.getFullYear());
	setTimeout(setTime, 500);
}
