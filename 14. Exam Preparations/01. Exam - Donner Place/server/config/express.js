const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const handlebars = require('express-handlebars');

module.exports = (app) => {
  // View engine setup.
  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views',
    defaultLayout: 'layouts/layout'
  }));
  app.set('view engine', '.hbs');

  // We will use cookies.
  app.use(cookieParser());

  // This set up which is the parser for the request's data.
  app.use(bodyParser.urlencoded({ extended: true }));

  // Session is storage for cookies, which will be de/encrypted with that 'secret' key.
  app.use(session({
    secret: 'neshto-taino!@#$%',
    resave: false,
    saveUninitialized: false
  }));

  // For user validation we will use passport module.
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = {
          username: req.user.username,
          isAdmin: req.user.roles.indexOf('Admin') > -1
      }      
    }

    next();
  })

  // This makes the content in the "public" folder accessible for every user.
  app.use(express.static('public'));

  console.log('Express ready!');
}
