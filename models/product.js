const db = require('../util/database');
const Cart = require('./cart');

// db.query('SELECT * FROM "node-complete".products')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// db.then(client => {
//   return client.query('SELECT * FROM "node-complete".products')
//       .then(res => {
//           console.log(res)
//       })
//       .catch(err => {
//           console.log(err)
//       })
// })

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {

  }

  static deleteById(id) {

  }

  static async fetchAll() {
    const client = await db
    return client.query('SELECT * FROM "node-complete".products')
  }

  static findById(id) {

  }
};
