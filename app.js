const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// have to manually require express-handlers even though it is installed
// const expressHbs = require('express-handlebars');

const app = express();

// now building the engine for handlebars (although name doesn't matter unless it clashes
// with built-in functions like 'pug')
// to make a layout, we have to manually pass to the function where it is
// NOTE: 'view/layouts/' is default but we put it anyway.
// NOTE: 'hbs' can be anything we want. BUT we also have to denote in extname for layout
// app.engine(
//     'hbs',
//     expressHbs({
//         layoutsDir: "views/layouts/",
//         defaultLayout: 'main-layout',
//         extname: 'hbs'
//     })
// );

// https://expressjs.com/en/api.html#app.set
// see 'view engine' for info on below 
// pug is sort of built in upon installation while handlebars above
// needs to be imported afterwards to be used
// app.set('view engine', 'pug');
// app.set('view engine', 'hbs');

app.set('view engine', 'ejs');

// let express know where to find views (although 'views' is default, if we had 'templates'
// or something then it would replace the second 'views' below)
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

// this allows us to access CSS files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    // this allows us to add dynamic content via pug (NOTE: '404.pug' is shortened)
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);

