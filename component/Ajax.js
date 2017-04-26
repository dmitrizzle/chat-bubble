function Ajax(url, fn) { 
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			fn(data);
		} else {
			console.log("Error. Server connection OK.", request.responseText);
		}
	};
	request.onerror = function() {
		console.log("Error. Server connection FAIL.", request.responseText);
	};
	request.send();
};