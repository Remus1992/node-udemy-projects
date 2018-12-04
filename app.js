const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// https://expressjs.com/en/api.html#app.set
// see 'view engine' for info on below 
app.set('view engine', 'pug');
// let express know where to find views (although 'views' is default, if we had 'templates'
// or something then it would replace the second 'views' below)
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

// this allows us to access CSS files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

