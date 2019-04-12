const { Pool, Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'PostGres1234'
})

const pool = new Pool(
    // mysql code. not necessarily compatable with postgreSQL 'pg'
    {
        host: 'localhost',
        user: 'root',
        database: 'node-complete',
        password: 'PostGres1234'
    }
)

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

// callback - checkout a client
pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
        done()

        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    })
})

// promise - checkout a client
pool.connect()
    .then(client => {
        return client.query('SELECT * FROM users WHERE id = $1', [1])
            .then(res => {
                client.release()
                console.log(res.rows[0])
            })
            .catch(e => {
                client.release()
                console.log(err.stack)
            })
    })

    // async/await - check out a client
    (async () => {
        const client = await pool.connect()
        try {
            const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
            console.log(res.rows[0])
        } finally {
            client.release()
        }
    })().catch(e => console.log(e.stack))