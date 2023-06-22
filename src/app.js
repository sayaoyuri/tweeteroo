import express from 'express';
import cors from 'cors';
import { users, tweets } from './data.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tweets', (req, res) => {
  const userList = users.data;
  const data = tweets.data.slice(-10).reverse().map(tweet => {
    const user = userList.find(user => user.username == tweet.username); // need to get the tweet user's avatar
    tweet.avatar = user.avatar;

    return tweet;
  })

  res.send(data);
});

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  if(!username.length || !avatar.length) {
    res.statusCode = 400;
    res.send()
  } else {
    const checkUsername = users.data.map(user => user.username).includes(username);
    if(!checkUsername) {
        users.data.push( {username, avatar} );
        const data = { message: "User created!" };
        
        res.statusCode = 200;
        res.send(data);
      } else {
        res.statusCode = 401;
        res.send();
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));