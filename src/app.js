import express from 'express';
import cors from 'cors';
import { users, tweets } from './data.js';

const invalidReq = {
  message: "Todos os campos são obrigatórios!"
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tweets', (req, res) => {
  const tweetList = tweets.slice(-10).reverse().map(tweet => {
    const user = users.find(user => user.username == tweet.username); // need to get the tweet user's avatar
    tweet.avatar = user.avatar;

    return tweet;
  })

  res.status(200).send(tweetList);
});

app.post('/sign-up', (req, res) => {
  const  { username, avatar } = req.body;
  
  if(!username || !avatar || typeof(username) !== 'string' || typeof(avatar) !== 'string') {
    return res.status(400).send(invalidReq);
  }

  const checkUsername = users.map(user => user.username).includes(username);
  if(checkUsername) return res.status(401).send(); 

  users.push( {username, avatar} );
  return res.status(201).send();
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  if(!username || typeof(username) !== 'string' || !tweet || typeof(tweet) !== 'string') {
    return res.status(400).send(invalidReq)
  }

  const checkUsername = users.find(user => user.username === username);
  if(!checkUsername) return res.status(401).send();

  tweets.push( {username, tweet} );
  res.status(201).send()
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));