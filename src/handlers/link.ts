import { pool } from "../config/db"

export const createShortLinks = async ({ url, shortlink }: { url: string, shortlink: string }) => {
    if (!url || !shortlink) {
        return Response.json({
            message: 'URL and shortlink are required.'
        }, {
            status: 400
        })
    }

    try {
        const existingShortlink = await pool.query(
            `SELECT * FROM links WHERE shortlink = $1`, [shortlink]
        )
        if (existingShortlink.rows.length > 0) {
            return Response.json({
                message: 'Shortlink already exists'
            }, { status: 400 })
        }
        const createLink = await pool.query(
            `INSERT INTO links (url, shortlink) VALUES ($1, $2) RETURNING *`, [url, shortlink]
        )
        return Response.json({
            message: 'Link created successfully',
            data: createLink.rows[0],
        }, {
            status: 201
        })
    } catch (error) {
        console.log(error)
    }
}

export const redirectLinks = async (shortlink: string) => {
    try {
        const findShortLink = await pool.query(`SELECT * FROM links WHERE shortlink = $1`, [shortlink])
        if (findShortLink.rows.length === 0) {
            return new Response(Bun.file('./src/handlers/notfound.html'))
        }
        return Response.redirect(findShortLink.rows[0].url)

    } catch (error) {
        console.log(error)
    }
}