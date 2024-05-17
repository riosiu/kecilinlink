import { pool } from "../config/db"



export const createShortLinks = async ({ url, shortlink }: { url: string, shortlink: string }) => {
    if (!url || !shortlink) {
        return Response.json({
            message: 'URL and shortlink are required.'
        })
    }


    try {
        const existingShortlink = await pool.query(
            `SELECT * FROM links WHERE shortlink = $1`, [shortlink]
        )
        if (existingShortlink.rows.length > 0) {
            return Response.json({
                message: 'Shortlink already exists'
            })
        }
        const createLink = await pool.query(
            `INSERT INTO links (url, shortlink) VALUES ($1, $2) RETURNING *`, [url, shortlink]
        )
        return Response.json({
            message: 'Link created successfully',
            data: createLink.rows[0],
        })
    } catch (error) {
        console.log(error)
    }
}