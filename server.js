/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts") 
// const env = require("dotenv").config()
const app = express()
// const bodyParser = require("body-parser")

//Require the Session package and DB connection
const session = require("express-session")
const pool = require('./database/')

// const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
// const accountRoute = require("./routes/accountRoute")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
// const errorRoute = require("./routes/errorRoute")



/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))



/* ***********************
 * View engine
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")


/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
//Index route - unit 3, activity
app.get('/', utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/ ", require("./routes/inventoryRoute"))
//error route
app.use("/error", require("./routes/errorRoute"))


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'});
});


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await Util.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  });
});


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST


/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
