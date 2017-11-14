const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

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
	var queryParams = req.query,
		 filteredTodos =  todos;
	
	if (queryParams.hasOwnProperty('status') && queryParams.status === 'completed') {
		filteredTodos = _.where(filteredTodos, {status: 'completed'});
	} else if (queryParams.hasOwnProperty('status') && queryParams.status === 'pending') {
		filteredTodos = _.where(filteredTodos, {status: 'pending'});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.title.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}

	res.json(filteredTodos);
});

// route to a single todo:id parameter
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id),
		 matchedTodo = _.findWhere(todos, {id: todoId});

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