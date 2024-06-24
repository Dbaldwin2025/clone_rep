/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryController = require("./controllers/invController")
const inventoryController2 = require("./controllers/invController2")
const inventoryRoute = require("./routes/inventoryRoute")
const inventoryModel = require("./models/inventory-model")
const utilities = require("./utilities/index")
const accountController = require('./controllers/accountController')
const accountRoute = require('./routes/accountRoute')
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")

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

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/

// Inventory routes

app.use(static)
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)




app.get("/", utilities.handleErrors(inventoryController.getInventoryJSON))
app.get("/", utilities.handleErrors(inventoryController.buildByClassificationId, inventoryController.buildByInvId, inventoryController.buildTest, inventoryController.buildManagement, inventoryController.addVehicle, inventoryController.buildClassification, inventoryController.newClassification, inventoryController.newVehicle))
app.get("/", utilities.handleErrors(utilities.buildClassificationGrid, utilities.buildDetailView,utilities.buildRegisterPage, utilities.buildLoginPage, utilities.getNav, utilities.buildManagementPage, utilities.buildClassificationList, utilities.buildNewVehicle, utilities.buildNewClassification))
app.post("/", utilities.handleErrors(inventoryController2.newClassification, inventoryController2.newVehicle))

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'The app crashed! Try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

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
  console.log(`app listening on ${host}:${port}`)
})
