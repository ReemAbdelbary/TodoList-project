const express = require('express');

const app = express();
var todos =[];

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.json(todos);
});

app.post('/',(req,res)=>{
    const body = req.body;
    todos.push(body);
    res.json({ message : "item added to the list"});
});

app.delete('/',(req,res)=>{
    todos = [];
    res.json({ message : "todo list is deleted"})
});

app.put('/',(req,res)=>{
    todos = [];
    const body = req.body;
    todos.push(body);
    res.json({ message : "todo list is updated"});
});

app.listen(3000,'localhost',()=>{
    console.log('server is up on port 3000');
});