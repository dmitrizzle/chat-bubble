function Ajax(url, fn) {
  var request = new XMLHttpRequest();
  var method = "GET";
  
  if ("withCredentials" in request) {
    // CORS supported
  } else if (typeof XDomainRequest != "undefined") {
    // IE
    request = new XDomainRequest();
  } else { console.log("CORS is not supported"); }
  
  
  
	request.open(method, url);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.setRequestHeader("Access-Control-Allow-Origin", "*");
	request.setRequestHeader("Access-Control-Allow-Credentials", "true");
	request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");


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

}
