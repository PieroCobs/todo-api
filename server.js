const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
var todos = [
	{
		id: 1,
		title: 'Meet mom for lunch',
		status: 'pending'
	},
	{
		id: 2,
		title: 'Go to the grocery store',
		status: 'pending'
	},
	{
		id: 3,
		title: 'Sign up for broadcast engineering course',
		status: 'completed'
	}
];

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

app.listen(PORT, function() {
	console.log('Express listenining on port' + PORT + '!');
});