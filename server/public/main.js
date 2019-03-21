var socket = io.connect(window.location.host, 
	{ query: "frontend=true" }
);

socket.on('event', function(data) {
	console.log('got event', data);
	try {
		var conStatus = document.getElementById('status'); 
		if (data.status == 'connected' || data.status == 'disconnected') {
			conStatus.innerHTML = data.status + " " + data.size
		}
	} catch (e) {
		console.error('Unable to parse ', e , data); 
	}
});

function sendData(button) {
	var token = location.search.split('token=')[1]
	if (!token) {
		console.error("Missing token")
	} else 	fetch('/send?data='+button+'&token='+token).then(r => {
		r.json().then(json => {})
	});
}