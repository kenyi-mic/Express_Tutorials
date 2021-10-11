const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  handlebars({
    extname: ".handlebars",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
);

const fortunes = [
  "congure your fear or they will conqure you!",
  "Do not fear what you do not know",
  "River need springs",
  "You will have a pleasant suprise!",
  "When ever possible keep it simple",
];

app.use(express.static(`${__dirname}/public/`));

app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => {
  const randomFortunes = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortunes });
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((req, res) => {
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `The server is listening in the port ${port} to exit click Ctrl C`
  )
);
