const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, image_url, price, description) {
    this.id = id;
    this.title = title;
    this.image_url = image_url;
    this.price = price;
    this.description = description;
  }

  async save() {
    const dataBase = await db
    return dataBase.query(
      'INSERT INTO "node-complete".products (title, price, image_url, description) VALUES ($1, $2, $3, $4)',
      [this.title, this.price, this.image_url, this.description]
    );
  }

  static deleteById(id) {

  }

  static async fetchAll() {
    const dataBase = await db
    return dataBase.query('SELECT * FROM "node-complete".products')
  }

  static async findById(id) {
    const dataBase = await db
    return dataBase.query('SELECT * FROM "node-complete".products WHERE products.id = $1', [id])
  }
};
