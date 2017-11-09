const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API root');
});

// route to fetch all todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

// route to a single todo id parameter
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id),
		 matchedTodo;

	todos.forEach(function(todo) {
		if (todo.id === todoId) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// create new todo item
app.post('/todos', function(req, res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

app.listen(PORT, function() {
	console.log('Express listenining on port' + PORT + '!');
});