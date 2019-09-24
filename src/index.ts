import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata';
import bcrypt from "bcrypt"
import { User } from './entities/User'
import { createConnection } from 'typeorm'
import jwt from "jsonwebtoken"
import config from "./config"

// どうしてもtry/catchを書きたくなかった
const verifyToken = async (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

createConnection().then(async (connection) => {
  const app = express()

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())


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

  app.get('/api/', async (req, res) => {
    res.send("welcome to Mogserver")
  })


  // 新規ユーザー登録
  app.post('/api/create/', async (req, res) => {
    const user = new User()

    // パスワード暗号化
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // Math.random()についてはランダムにしたいだけ
    user.email = req.body.email
    user.password = hashedPassword
    const payload = {
      user_email: req.body.email
    }
    const token = jwt.sign(payload, config.jwtKey)
    user.token = token

    // 登録が成功したら
    await User.save(user).then(user => {
      // token発行処理
      res.json({
        created: true,
        token: token
      })
    }).catch(() => {
      res.json({ created: false })
    })
  })


  // ログイン処理
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


  /* JWT検証
  ユーザー認証が必要ないAPIはこれより上に記述しないと弾かれる */
  app.use(async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // トークンがあるかどうか検証
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

    await verifyToken(token, config.jwtKey).then((result: any) => {
      if (result.user_id) {
        /* decodeして取得したemailをリクエストbodyに加える
        そうすることで、next()で続くmiddleware上でメールアドレスを使用できる */
        req.body.emailForJWT = result.user_id
        next()
        // メールアドレスを取得できなかったとき
      } else {
        return res.status(403).send({
          success: false,
          message: 'Invalid token.'
        })
      }
      // JWTの検証に失敗したとき
    }).catch(() => {
      return res.status(403).send({
        success: false,
        message: 'Invalid token.'
      })
    })
  })


  // user一覧を閲覧
  app.get('/api/read', async (req, res) => {
    console.log(req.body.emailForJWT)
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

  app.listen(4000, () => console.log('Example app listening on port 4000!'))


}).catch((error) => console.log(error))
