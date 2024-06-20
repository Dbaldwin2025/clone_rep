const invModel = require("../models/inventory-model")
const regModel = require('../models/account-model')
//const build = require("../controllers/accountController")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr >'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildDetailView = async function(data2){
  let detailView 
  if(data2.length > 0){
    detailView = '<div class="detail_page">'
    detailView += '<div class="detail_view">'
    detailView += '<img src="' + data2[0].inv_image
    +'" alt="Image of '+ data2[0].inv_make + ' ' + data2[0].inv_model 
    +' on CSE Motors"> </div>'
    detailView += '<div class="detail_data">'
    detailView +=  '<h2>'+ data2[0].inv_make + ' '+ data2[0].inv_model 
    + '</h2>' 
    detailView += '<span> <span class="bold1">Price: </span> $' 
    + new Intl.NumberFormat('en-US').format(data2[0].inv_price) + '</span>'
    detailView += '<p class="description">' + '<span class="bold1">Descripton: </span>' + data2[0].inv_description + '</p>'
    detailView += '<p class="color">' + '<span class="bold1">Color: </span>' + data2[0].inv_color + '</p>'
    detailView += '<p class="miles">' + '<span class="bold1">Miles: </span>' + data2[0].inv_miles + '</p>'
    detailView += '</div>'
    detailView += '</div>'
} else { 
  detailView += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
}
  return detailView
}


Util.buildLoginPage = async function() {
let login
  if(3>2) {
    login = '<div class="login">'
    login += '<form>'

    login += '<div>'
    login += '<label >Email Address:</label>'
    login += '</div>'

    login += '<div>'
    login += '<input type="email" title="email address" name="account_email" placeholder="Enter a valid email address" required>'
    login += '</div>'

    login += '<div>'
    login += '<label>Password:</label>'
    login += '</div>'

    login += '<div>'
    login += '<input type="password" title="password" name="account_password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'
    login += '</div>'

    login += '<div>'
    login += '<p>Passwords must be minimum of 12 characters and include 1 capital letter, 1 number and 1 special character.</p>'
    login += '</div>'

    login += '<div>'
    login += '<button type="Submit" value="Submit">Login</button>'  
    login += '</div>'

    login += '</form>'

    login += '<div>'
    login += '<p>No account? '
    login += "<a href='/account/register'>Sign-up</a> </p>"
    login += '</div>'

    login += '</div>'
} else { 
  login += '<p class="notice">Sorry, no login is not availible.</p>'
}
  return login
}

Util.buildRegisterPage = async function() {
  let register
  if(3>2) {
    register = '<div class="register">'
    register += '<form action="/account/register" method="post">'
    
    register += '<p>All fields are required</p>'

    register += '<div>'
    register += '<label >First name</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="text" title="first name" name="account_firstname" required>'
    register += '</div>'

    register += '<div>'
    register += '<label >Last name</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="text" title="last name" name="account_lastname" required>'
    register += '</div>'

    register += '<div>'
    register += '<label >Email Address:</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="email" title="email address" name="account_email" placeholder="Enter a valid email address"  required>'
    register += '</div>'


    register += '<div>'
    register += '<label>Password:</label>'
    register += '</div>'

    register += '<div>'
    register += '<input type="password" title="password" name="account_password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$">'
    register += '</div>'

    register += '<div>'
    register += '<p>Passwords must be minimum of 12 characters and include 1 capital letter, 1 number and 1 special character.</p>'
    register += '</div>'

    register += '<div>'
    register += '<button type="Submit value="Submit">Register</button>'  
    register += '</div>'

    register += '</form>'

    register += '</div>'
} else { 
  register += '<p class="notice">Sorry, registration is not availible.</p>'
}
  return register


}


Util.buildManagementPage = async function() {
  let management
  if(3>2) {
    management = '<div class="management">'
    management += '<div>'
    management += '<a class="new_classification" href="#">New Classification</a>'
    management += '</div>'
    management+= '<a class="new_vehicle" href="#">New Vehicle</a>'
    management += '</div>'
} else { 
  management += '<p class="notice">Sorry, management is not availible.</p>'
}
  return management


}
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

