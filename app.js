const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// have to manually require express-handlers even though it is installed
const expressHbs = require('express-handlebars');

const app = express();

// now building the engine for handlebars (although name doesn't matter unless it clashes
// with built-in functions like 'pug')
app.engine('handlebars', expressHbs);

// https://expressjs.com/en/api.html#app.set
// see 'view engine' for info on below 
// pug is sort of built in upon installation while handlebars above
// needs to be imported afterwards to be used
// app.set('view engine', 'pug');

app.set('view engine', 'handlebars');

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
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    // this allows us to add dynamic content via pug (NOTE: '404.pug' is shortened)
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);

