const express = require('express');
const { randomBytes } = require('crypto');

const bodyParser = require ('body-parser');


const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}; // TO STORE ALL THE COMMENTS OF POST BY ID


app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id]|| []);

});

app.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments= commentsByPostId[req.params.id] || []; // give  array of comments by id or if no comments give empty array

    comments.push({id : commentId, content});

    commentsByPostId[req.params.id]= comments; // add new comments to the array 

    res.status(201).send(comments);
});

app.listen(4001, ()=>{
    console.log('Listening to 4001');
});