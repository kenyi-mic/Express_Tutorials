const fortune = require("./fortune");


exports.home = (req, res) => res.render("home");

exports.faq = (req, res) => res.render("faq")

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getFortune() });


exports.contact = (req, res) => res.render("contact");


exports.notFound = (req, res) => res.render("404");

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render("500");
/* eslint-enable no-unused-vars */
//just 4 testing....
exports.newsletter = (req, res) => res.render('newsletter-signup')


// exports.newsletterSignup = (req, res) => {
//   res.render("newsletter-signup", { csrf: "CSRF token goes here" });
// };
// exports.newsletterSignupProcess = (req, res) => {
//   console.log("Form(from queryString): " + req.query.form);
//   console.log("CSRF token (from hidden form field): " + req.body._csrf);
//   console.log("Name (from visible form field): " + req.body.name);
//   console.log("Email (from visible form field): " + req.body.email);
//   res.redirect(303, "/newsletter-signup/thank-you");
// };

// exports.newsletterSignupThankYou = (req, res) =>
//   res.render("newsletter-signup-thank-you");

// **** these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf)
  console.log('Name (from visible form field): ' + req.body.name)
  console.log('Email (from visible form field): ' + req.body.email)
  res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
// **** end browser-submitted form handlers









