<<<<<<< HEAD

const { getFortune } = require('./fortune')
exports.home = (req, res) => res.render('home')
exports.about = (req, res) =>
res.render('about', {fortune: getFortune})

exports.notFound = (req, res) => res.render('404')
=======
const fortune = require("./fortune");

exports.home = (req, res) => res.render("home");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render("404");
>>>>>>> ccc14d987f21c942e0caf7922ad1d5b767145170

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
<<<<<<< HEAD
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */
=======
exports.serverError = (err, req, res, next) => res.render("500");
/* eslint-enable no-unused-vars */
>>>>>>> ccc14d987f21c942e0caf7922ad1d5b767145170
