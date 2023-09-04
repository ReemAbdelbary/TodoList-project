const express = require('express');

const app = express();
var todos =[];

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/items',(req,res)=>{
    res.json(todos);
});

// get selected item
app.get('/items/:id',(req,res)=>{
    var id = req.params.id ;
    const item = todos.find((item)=> item.id === Number(id));
    if(item)
    res.json(item);
    else
    res.json({ message : "item doesn't exist"});
});

app.post('/items',(req,res)=>{
    const body = req.body;
    todos.push(body);
    res.json({ message : "item added to the list"});
});

app.delete('/items',(req,res)=>{
    todos = [];
    res.json({ message : "todo list is deleted"})
});

//delete selected item
app.delete('/items/:id',(req,res)=>{
    var id = req.params.id ;
    todos = todos.filter((item)=> item.id != Number(id));
    res.json({ message : "item is deleted"})
});

app.put('/items',(req,res)=>{
    todos = [];
    const body = req.body;
    todos.push(body);
    res.json({ message : "todo list is updated"});
});

//update selected item
app.put('/items/:id',(req,res)=>{
    var id = Number(req.params.id) ;
    const body = req.body;
    var flag = 0;
    for(var i=0 ; i<todos.length ; i++){
        if(todos[i].id === id){
            todos[i]=body;
            flag =1 ;
        }
    }
    if(flag)
    res.json({ message : "todo list is updated"});
    else
    res.json({ message : "item doesn't exist to be updated"});
});

app.listen(3000,'localhost',()=>{
    console.log('server is up on port 3000');
});
