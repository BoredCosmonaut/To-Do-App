//Requirements
const express = require('express');
const cors = require("cors");
const db = require("./db");
const Todo = require('./todo');

//Variables
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Routes

//Gets all the todos
app.get('/api/todos',async (req,res)=> {
    const todos = await Todo.find();
    res.json(todos);
})

app.get('/api/todos/completed', async(req,res) => {
    const todos = await Todo.find({completed:false});
    res.json(todos);
})

//Adds a todo
app.post('/api/todos/new',async (req,res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send();
}) 

//Delete all the completed todos
app.delete('/api/todos/delete', async(req,res) => {
    console.log('Delete route hit');
    const {completed} = req.body;
    await Todo.deleteMany({completed});
    res.send();
})

//update a todo
app.patch('/api/todos/update/:id',async (req,res) => {
    const {id} = req.params;
    await Todo.findByIdAndUpdate(id,{completed:true});
    res.send()
})

//Deletes a todo
app.delete('/api/todos/delete/:id',async (req,res)=> {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.send();
})

//Listen to the server
app.listen(port,() => {
    console.log("Server is listening port 3000")
})
