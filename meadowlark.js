const handlers = require("./lib/handlers");

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



app.use(express.static(`${__dirname}/public/`));

app.set("view engine", "handlebars");


app.get("/", handlers.home);

app.get("/about", handlers.about);

// exports.getFortune = (idx) => {
//   idx = Math.floor(Math.random()* fortune.length)

//   }
// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);



app.listen(port, () =>
  console.log(
    `The server is listening in the port ${port} to exit click Ctrl C`
  )
);
