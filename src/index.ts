import { Elysia } from "elysia";
import { LinkTabel, configDB, pool } from "./config/db";
import { createShortLinks, redirectLinks } from "./handlers/link";

const startServer = async () => {
  try {
    await configDB()
    const app = new Elysia()
    app.get('/:shortlink', ({ params: { shortlink } }) => redirectLinks(shortlink))
    app.group('/api', api => {
      return api
        .post('/create-link', ({ body, set }) => createShortLinks(body as { url: string, shortlink: string }))

        .get('/', () => {
          Response.json({
            message: 'Welcome to the Link Shortener API'
          })
        })
    })
    app.listen(8888, () => { console.log('Server is running on port 8888') })
  } catch (error) {
    console.log(error)
  }
}
await startServer()