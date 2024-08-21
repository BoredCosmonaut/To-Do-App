const Todo = require('./todo');
const db = require('./db');

const seedTodo = [
    {
        todo:"Wash the dishes",
        completed:false
    },
    {
        todo:"Walk the god",
        completed:false
    },
    {
        todo:"Cook dinner",
        completed:true
    },
    {
        todo:"Take a shower",
    }
]

Todo.insertMany(seedTodo)
    .then(res => {
        console.log(res)
    })
    