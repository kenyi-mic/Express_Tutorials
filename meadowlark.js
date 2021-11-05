const handlers = require("./lib/handlers");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const weatherMiddlware = require("./lib/middleware/weather");
const multiparty = require("multiparty");

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

// browser based form handler

// handlers for browser-based form submission
app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);
// handlers for fetch/JSON form submission
app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);
// vacation photo contest
app.get("/contest/vacation-photo", handlers.vacationPhotoContest);
app.get("/contest/vacation-photo-ajax", handlers.vacationPhotoContestAjax);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err)
      return handlers.vacationPhotoContestProcessError(req, res, err.message);
    console.log("got fields: ", fields);
    console.log("and files: ", files);
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});
app.get(
  "/contest/vacation-photo-thank-you",
  handlers.vacationPhotoContestProcessThankYou
);
app.post("/api/vacation-photo-contest/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err)
      return handlers.api.vacationPhotoContestError(req, res, err.message);
    handlers.api.vacationPhotoContest(req, res, fields, files);
  });
});
app.use(handlers.notFound);
app.use(handlers.serverError);
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
