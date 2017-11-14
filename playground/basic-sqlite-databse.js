const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
   'dialect': 'sqlite',
   'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
   title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
         len: [1, 250]
      }
   },
   status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
         notEmpty: true
      }
   }
});

sequelize.sync({force: true}).then(function() {
   console.log('\nSync completed successfully\n');

   Todo.create({
      title: 'Take out trash',
      status: 'pending'
   }).then(function(todo) {
      return Todo.create({
         title: 'Clean office'
      });
   }).then(function() {
      // return Todo.findById(1);
      return Todo.findAll({
         where: {
            status: 'pending'
         }
      });
   }).then(function(todos) {
      if (todos) {
         todos.forEach(function(todo) {
            console.log(todo.toJSON());
         });
      } else {
         console.log('No todo found!');
      }
   }).catch(function(e) {
      console.log(e);
   });
});