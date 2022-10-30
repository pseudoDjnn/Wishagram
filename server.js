// IMPORTS
const express = require("express");
const session = require("express-session");
// const morgan = require("morgan");
// const helmet = require("helmet");
const exphbs = require("express-handlebars");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const multer = require("multer");
// const cloudinary = require('./config/cloudinary')

const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const session = require("express-session");

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
    db: sequelize
  })
};

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sess));
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
// app.use(morgan("dev"));
// app.use(helmet());
// app.use(fileUpload());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

//turn on connectection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});
