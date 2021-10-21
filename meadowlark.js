const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const handlers = require("./lib/handlers");

const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  handlebars({
    extname: ".handlebars",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
);

app.use(express.static(`${__dirname}/public/`));

app.set("view engine", "handlebars");

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

app.use(handlers.serverError);

app.listen(port, () =>
  console.log(
    `The server is listening in the port ${port} to exit click Ctrl C`
  )
);
