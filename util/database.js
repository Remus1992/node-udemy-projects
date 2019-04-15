const { Pool, Client } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'PostGres1234'
})

module.exports = pool.connect()
// pool.connect()
//     .then(client => {
//         return client.query('SELECT * FROM "node-complete".products')
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     })

// pool.query('SELECT * FROM "node-complete".products')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// pool.query('SELECT * FROM "node-complete".products', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: 'PostGres1234'
})

// client.connect()
// module.exports = client.connect()

// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })


