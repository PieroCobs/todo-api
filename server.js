const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('Todo-api root');
});

app.listen(PORT, function() {
	console.log('Express listenining on port' + PORT + '!');
});