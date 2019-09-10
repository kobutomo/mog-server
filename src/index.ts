import express from 'express'
import 'reflect-metadata';
import bcrypt from "bcrypt"
import { User } from './entities/User'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'

createConnection().then(async (connection) => {
  const app = express()

  // 接続するたびuserを追加
  app.get('/', async (req, res) => {
    const user = new User()

    // パスワード暗号化
    const hasedPassword = await bcrypt.hash('0000', 10)
    user.id = 6
    // Math.random()についてはランダムにしたいだけ
    user.login = 'adimn' + Math.random().toString()
    user.password = hasedPassword
    await User.save(user)
    res.send(user.id.toString())
  })

  // user一覧を閲覧
  app.get('/read', async (req, res) => {
    const users = await User.find({
      delete: false
    })

    if (users) {
      res.send(users)
    }
    else {
      res.send("no such user")
    }
  })

  // 接続するたびひとつuserを削除
  app.get('/delete', async (req, res) => {
    const user = await User.findOne({})
    if (user) {
      user.delete = true
      await User.save(user)
      res.send(user)
    }
    else {
      res.send("no such user")
    }
  })


  app.get('/compare', async (req, res) => {
    const users = await User.find()

    if (users) {
      // 正しく暗号化されてるかテストしたい
      const getResults = async () => {
        let results: boolean[] = []
        for (let i = 0; i < users.length; i++) {
          const result = await bcrypt.compare("0000", users[i].password)
          results.push(result)
        }
        return results
      }

      res.send(await getResults())
    }
    else {
      res.send("no such user")
    }
  })


  app.listen(4000, () => console.log('Example app listening on port 4000!'))


}).catch((error) => console.log(error))
