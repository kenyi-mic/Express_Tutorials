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
    helpers:{
      secttion: function(name, options){
        if(!this._sections)this._sections ={}
        this._sections[name] = options.fn(this)
        return null
      },
    },
  })
);



app.use(express.static(`${__dirname}/public/`));

app.set("view engine", "handlebars");


app.get("/", handlers.home);

app.get("/about", handlers.about);

app.get("/contact", handlers.contact);


// exports.getFortune = (idx) => {
//   idx = Math.floor(Math.random()* fortune.length)

//   }
// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);



if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `The server is listening in the port ${port} to exit click Ctrl C`
    )
  );
} else {
  module.exports = app;
}
