const { Pool, Client } = require('pg')

// const client = new Client({
//     host: 'localhost',
//     user: 'postgres',
//     database: 'postgres',
//     password: 'PostGres1234'
// })

// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'PostGres1234'
})

pool.query('SELECT * FROM "node-complete".products', (err, res) => {
    console.log(err, res)
    pool.end()
})
