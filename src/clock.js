function setTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	if (m < 10) {
		m = "0" + m;
	}
	$('#div_time :first').html(h + ":" + m);
	$('#div_time :eq(1)').html(today.toDateString());
	setTimeout(setTime, 500);
}
