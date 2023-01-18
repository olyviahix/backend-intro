const http = require('http');

const cats = [
        {
            "id":"abys",
            "name":"Abyssinian Cat"
        },
        {
            "id" : "bob",
            "name": "Bob cat"
        }
];


const server = http.createServer((request,response) =>{
    response.statusCode = 200;
    const url = request.url;
    const method = request.method;
    if(url == '/breeds'){
        if(method=='GET'){
            response.write(JSON.stringify(cats));
            response.end();
        }
    }
});

server.listen(3000,'127.0.0.1',()=>{
    console.log("Server started successfully");
})







