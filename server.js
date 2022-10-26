// IMPORTS
const path = require("path");
const express = require("express");
const session = require("express-session");
// const morgan = require("morgan");
// const helmet = require("helmet");
const exphbs = require("express-handlebars");
// const fileUpload = require("express-fileupload");
// const multer = require("multer");

// USING EXPRESS AND CALLING THE PORT
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

app.use(session(sess));
// app.use(morgan("dev"));
// app.use(helmet());
// app.use(fileUpload());

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});
