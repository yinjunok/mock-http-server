const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/xml', ctx => {
  ctx.body = `
    <apps>
      <app>
        <id>1</id>
        <name>aaa</name>
        <version>1</version>
      </app>
      <app>
        <id>2</id>
        <name>bbb</name>
        <version>2</version>
      </app>
      <app>
        <id>3</id>
        <name>ccc</name>
        <version>3s</version>
      </app>
    </apps>
  `
})

const a = {
  message: "一段消息",
  code: 10,
  data: []
}

router.get('/json', ctx => {
  const body = [
    {id: 1, version: 1, name: 'aaa'},
    {id: 2, version: 2, name: 'bbb'},
    {id: 3, version: 3, name: 'ccc'}
  ]
  ctx.body = JSON.stringify(body)
})

router.post('/login', ctx => {
  if (Math.random() > 0.5) {
    ctx.body = {
      error_code: 0,
      message: '登录成功!',
      data: {
        token: 'token',
        expires_in: 10,
        token_type: 'bearer'
      }
    }
  } else {
    ctx.response.status = 401
    ctx.body = {
      message: "发生错误",
      data: {},
      error_code: 1
    }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(4000)