const http = require('http');

var todos = [];

const requestlistener = (req,res)=> {
    const method = req.method;
    const route = req.url;
    
    //GET
    if(method === 'GET' && route === '/'){
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify(todos));
    }
    
    //POST  //add item to todos array
    else if(method === 'POST' && route ==='/'){
        const body =[];
        // listener on event 'data'
        req.on("data",(chunk) => {
            body.push(chunk);
        }).on("end",()=>{
            console.log(Buffer.concat(body).toJSON());
            todos.push(JSON.parse(Buffer.concat(body).toString()));
        });
    }

    // DELETE
    else if(method === 'DELETE' && route ==='/'){
        todos = [];
    }
    
    //PUT
    else if(method === 'PUT' && route ==='/'){
        todos = [];
        const body =[];
        // listener on event 'data'
        req.on("data",(chunk) => {
            body.push(chunk);
        }).on("end",()=>{
            console.log(Buffer.concat(body).toJSON());
            todos.push(JSON.parse(Buffer.concat(body).toString()));//json.parse string to json
        });
    }
        // not found
    else{
        res.write("Not Found");
    }
    
    
    res.end();
}

const server = http.createServer(requestlistener);

server.listen(3000,'localhost',()=>{
    console.log('server is up');
})
