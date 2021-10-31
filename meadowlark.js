const handlers = require("./lib/handlers");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const weatherMiddlware = require("./lib/middleware/weather");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  handlebars({
    extname: ".handlebars",
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set("view engine", "handlebars");

app.use(weatherMiddlware);

app.use(express.static(`${__dirname}/public/`));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.get("/contact", handlers.contact);

app.get("/faq", handlers.faq);

app.get("/newsletter", handlers.newsletter);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

// browser based form handler
app.get("/newsletter-signup", handlers.newsletterSignup);
app.get("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `The server is listening in the port ${port} to exit click Ctrl C`
    )
  );
} else {
  module.exports = app;
}
