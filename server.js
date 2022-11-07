// IMPORTS
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const { v4: uuidv4 } = require("uuid");

const sequelize = require("./config/connection");
const path = require("path");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// USING EXPRESS AND CALLING THE PORT
const app = express();
const PORT = process.env.PORT || 3001;

// COOK-KEY
const sess = {
  secret: "Secret cookie is secret",
  cookie: {
    expires: 875000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sess));

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(require("./controllers/"));

//turn on connectection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});
