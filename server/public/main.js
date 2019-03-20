var socket = io.connect(window.location.host, 
	{ query: "frontend=true" }
);

socket.on('event', function(data) {
	console.log('got event', data);
	try {
		var status = document.getElementById('status'); 
		if (data.status == 'connected' || data.status == 'disconnected') {
			status.innerHTML = data.status + " " + data.size
		}
	} catch (e) {
		console.error('Unable to parse ' , data); 
	}
});

function sendData() {
	var token = location.search.split('token=')[1]
	if (!token) {
		console.error("Missing token")
	} else 	fetch('/send?token='+token).then(r => {
		r.json().then(json => {})
	});
}