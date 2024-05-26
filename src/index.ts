import { Elysia } from "elysia";
import { LinkTabel, configDB, pool } from "./config/db";
import { createShortLinks, redirectLinks } from "./handlers/link";
import { html } from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'

const app = new Elysia()
  .use(html())
  .use(staticPlugin())

  .get('/:shortlink', ({ params: { shortlink } }) => redirectLinks(shortlink))
  .group('/api', api => {
    return api
      .post('/create-link', ({ body, set }) => createShortLinks(body as { url: string, shortlink: string }))
  })


app.get("/", () => {
  return Bun.file('./src/index.html')
})

const startServer = async () => {
  try {
    await configDB()
    app.listen(8880, () => { console.log('Server is running on port 8880') })
  } catch (error) {
    console.log(error)
  }
}


await startServer()