const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// Connecting to DB and establishing models
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Associations & Relationships
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
    // this will overwrite tables and isn't always wanted as it will delete previous information
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findById(1)
        // console.log(result);
    })
    .then(user => {
        if(!user) {
            return User.create({
                first_name: "Remi",
                last_name: "Hendo",
                email: "test@email.com"
            })
        }
        // since the above statement returns a promise, we wan
        // this block to do the same so we can have a 'then' method
        // Promise.resolve is one such method but since this is 
        // already in one 'then' method, it will by default be a promise
        // return Promise.resolve(user);
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })


