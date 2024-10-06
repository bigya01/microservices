const express = require('express');
const { randomBytes } = require('crypto'); 
// randomBytes is used to create ids to assign to each post after created
const bodyParser = require('body-parser'); // to parse json data sent by user 



const app = express();
app.use(bodyParser.json());

const posts = {};  // to store every post we create

app.get('/posts', (req,res)=>{    // to retrieve all the posts
    res.send(posts);
});

app.post('/posts', (req,res)=>{     // to create new post
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id, title  // this helps to unite the title of  post created  with its randomly generated id
    };

    res.status(201).send(posts[id]); // to notify new post has been created
});

app.listen(4000, ()=>{
    console.log('Listening on 4000');
});

