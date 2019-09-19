import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata';
import bcrypt from "bcrypt"
import { User } from './entities/User'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'

createConnection().then(async (connection) => {
  const app = express()

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  // 接続するたびuserを追加
  app.get('/api/', async (req, res) => {
    const user = new User()

    // パスワード暗号化
    const hasedPassword = await bcrypt.hash('0000', 10)
    // Math.random()についてはランダムにしたいだけ
    user.email = 'adimn' + Math.random().toString()
    user.password = hasedPassword
    await User.save(user)
    res.send(user.id.toString())
  })

  app.post('/api/create/', async (req, res) => {
    const user = new User()

    // パスワード暗号化
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // Math.random()についてはランダムにしたいだけ
    user.email = req.body.email
    user.password = hashedPassword
    await User.save(user).then(() => {
      res.json({ created: true })
    }).catch(() => {
      res.json({ created: false })
    })
  })

  app.post("/api/login/", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email
    })
    // アカウントが存在したときの処理
    if (user) {
      // 暗号化比較
      const result = await bcrypt.compare(req.body.password, user.password)
      if (result) {
        res.json({ auth: true })
      }
      // PWが違うとき
      else {
        res.json({ auth: false })
      }
    }
    // アカウントが存在しないとき
    else {
      res.json({ auth: false })
    }
  })

  // email被りチェック
  app.post("/api/checkemail/", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email
    })

    if (user) {
      res.json({ exists: true })
    }
    else {
      res.json({ exists: false })
    }
  })

  // user一覧を閲覧
  app.get('/api/read', async (req, res) => {
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
  app.get('/api/delete', async (req, res) => {
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


  app.get('/api/compare', async (req, res) => {
    const users = await User.find({
      delete: false
    })

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
