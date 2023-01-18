const http = require('http');
const express = require('express');
const app = express();
app.use(express.json());
const {check,validationResult} = require('express-validator');
const apiKeys = ["#44@###$$$@34","#44@###$$$@34234"];
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

app.get('/breeds',(req,res) =>{
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(cats));

})

app.get('/breeds/:breedId',(req,res) =>{
    const catBreedId = req.params['breedId'];
    console.log(catBreedId);
    res.setHeader('Content-Type','application/json');
    const catToLookFor = cats.find(c=> c.id==catBreedId);
    if(catToLookFor){
        res.send(JSON.stringify(catToLookFor));
    }else{
        res.status(404).send('Breed not found');
    }
})

app.delete('/breeds/:breedId',(req,res)=>{
    const catBreedId = req.params['breedId'];
    const catToLookFor = cats.findIndex(c=> c.id==catBreedId);
    if(catToLookFor!=-1){
        cats.splice(catToLookFor,1);
        res.send("Breed deleted successfully");
    }else{
        res.status(404).send('Breed not found');
    }

})

app.post("/breeds", 
    [
        check('name','Name cannot be empty').isLength({min:1})
    ],
    (req, res) => {
        const apiKey = req.headers['apikey'];
        if(apiKeys.indexOf(apiKey)!=-1){
            const errors = validationResult(req).array();
            if(errors.length>0){
                res.status(400).send(JSON.stringify(errors));
            }else{
                const newCatData = req.body;
                console.log(newCatData);
                const existingCatBreed = cats.find((c) => c.id == newCatData.id);
                if (existingCatBreed) {
                    res.status(400).send("Breed already exists");
                } else {
                    cats.push(newCatData);
                    res.send("The Breed was added successfully");
                }
            }
        }else{
            res.status(401).send(JSON.stringify("Invalid request"));
        }

    }
);


app.put('/breeds/:breedId',(req,res)=>{
    const catBreedId = req.params['breedId'];
    const catData = req.body;
    const catToLookFor = cats.find(c=> c.id==catBreedId);
    if(catToLookFor){
        catToLookFor.name = catData.name;
        res.status(200).send("Breed name updated ")
    }else{
        res.status(404).send('Breed not found');
    }
})

const server = http.createServer(app);

server.listen(3000,'127.0.0.1',()=>{
    console.log("Server started successfully");
})