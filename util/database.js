const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'postgres', 'PostGres1234', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;


// const { Pool, Client } = require('pg')

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     database: 'postgres',
//     password: 'PostGres1234'
// })

// module.exports = pool.connect()
