import express from 'express'
import 'reflect-metadata';
import { User } from './entities/User'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'

createConnection().then(async (connection) => {
  const app = express();
  app.get('/', async (req, res) => {
    const user = new User();
    user.id = 6
    user.login = 'adimn' + Math.random().toString();
    user.password = '0000';
    await User.save(user);
    res.send(user);
  });
  app.get('/read', async (req, res) => {
    // const users = await User.find()
    const users = await User.find({});

    // if (users) await users.remove();
    if (users) {
      res.send(users);
    }
    else {
      res.send("no such user")
    }
  });
  app.get('/delete', async (req, res) => {
    // const users = await User.find()
    const users = await User.findOne({});

    if (users) await users.remove();
    if (users) {
      res.send(users);
    }
    else {
      res.send("no such user")
    }
  });
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}).catch((error) => console.log(error));
