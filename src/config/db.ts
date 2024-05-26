import { Client } from 'pg'
export const pool = new Client({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,

})

export const LinkTabel = async () => {
    try {
        const { rows } = await pool.query(
            `CREATE TABLE IF NOT EXISTS links(
                id SERIAL PRIMARY KEY,
                url VARCHAR(255) NOT NULL,
                shortlink VARCHAR(255) NOT NULL UNIQUE, 
                created_at TIMESTAMP DEFAULT NOW()
            )`
        )
        if (rows[0] === 0) {
            console.log('Table users created')
        }
    } catch (error) {
        console.log(error)
    }
}

export const configDB = async () => {
    await pool.connect().then(() => {
        console.log('Database connection successful')
    }).catch((error) => {
        console.log('Database connection failed', error)
    })

    await LinkTabel()
}

