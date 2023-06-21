import express from 'express';
import cors from 'cors';
import { users, tweets } from './data.js';

const app = express();
app.use(cors());

app.get('/tweets', (req, res) => {
  const userList = users.data;
  const data = tweets.data.slice(-10).reverse().map(tweet => {
    const user = userList.find(user => user.username == tweet.username); // need to get the tweet user's avatar
    tweet.avatar = user.avatar;

    return tweet;
  })

  res.send(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));