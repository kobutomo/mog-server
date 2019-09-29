import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata';
import bcrypt from "bcrypt"
import { User } from './entities/User'
import { Post } from './entities/Post'
import { createConnection } from 'typeorm'
import jwt from "jsonwebtoken"
import config from "./config"
import * as fs from "fs"
import multer from "multer"
import * as path from "path"

const app = express()

const dir = app.get('env') === "development"
  ? path.resolve("/home/tomoro/projects/mogmogram/public/img/uploads/")
  : ""

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir)
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: (req, file, cb) => {
    const date = new Date()
    const month = date.getMonth() + 1
    const yy = date.getFullYear()
    const MM = ('0' + month).slice(-2)
    const dd = ('0' + date.getDate()).slice(-2)
    cb(null, `${yy}-${MM}-${dd}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

// どうしてもtry/catchを書きたくなかった
const verifyToken = async (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

createConnection().then(async (connection) => {

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  // アップロードテスト

  app.post('/api/upload/', upload.single('file'), (req, res) => {
    res.status(200).json({ file: req.file })
  })

  app.post('/api/upload/delete/', (req, res) => {
    const file = req.body.filename
    fs.unlink(path.resolve(dir + file), (err) => {
      if (err) { res.json({ 'result': 'error' })
      console.log(err)
    }
      else { res.json({ 'result': 'success!' }) }
    })
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
    user.token = "temptoken"

    // 登録が成功したら
    await User.save(user).then(async (result) => {
      // token発行処理
      const payload = {
        USER_ID: result.user_id
      }
      const token = jwt.sign(payload, config.jwtKey, { expiresIn: "1d" })

      // 先ほど登録したユーザーにトークンを付与
      result.token = token
      await User.save(result).then(() => {
        res.json({
          created: true,
          token: token
        })
      }).catch(() => {
        User.remove(result)
        res.json({ created: false })
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
        // token更新
        const payload = {
          USER_ID: user.user_id
        }
        const token = jwt.sign(payload, config.jwtKey, { expiresIn: "1d" })

        res.json({ auth: true, token: token })
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
      if (result.USER_ID) {
        /* decodeして取得したemailをリクエストbodyに加える
        そうすることで、next()で続くmiddleware上でメールアドレスを使用できる */
        req.body.USER_ID = result.USER_ID
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

    const USER_ID = req.body.USER_ID
    const users = await User.findOne({
      where: { user_id: USER_ID },
      relations: ["posts"]
    })

    const posts = await Post.find({
      where: { user_id: USER_ID },
      relations: ["user_id"]
    })

    if (users) {
      users
      res.send(posts)
    }
    else {
      res.send("no such user")
    }
  })

  app.get('/api/getpost', async (req, res) => {
    const USER_ID = req.body.USER_ID
    const user = await User.findOne({
      user_id: USER_ID
    })

    if (user) {
      console.log(user.posts)
      res.json({ posts: user.posts })
    }
    else {
      res.send("no such user")
    }
  })

  // テスト投稿
  app.get('/api/post', async (req, res) => {
    const USER_ID = req.body.USER_ID
    const user = await User.findOne({
      user_id: 2
    })

    if (user) {
      const post1 = new Post()
      post1.title = "タイトル１"
      post1.user_id = user
      await Post.save(post1)

      const post2 = new Post()
      post2.title = "タイトル２"
      post2.user_id = user
      await Post.save(post2)

      const posts = await Post.find({ where: [{ user: 2 }], relations: ["user"] })
      user.posts = [...posts, post1, post2]
      await User.save(user)
      res.send("ドヤァ…")
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
