const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data2 = await invModel.getInventoryByInvId(inv_id)
  const detailView = await utilities.buildDetailView(data2)
  let nav = await utilities.getNav()
  const vehicleMake = data2[0].inv_make
  const vehicleModel = data2[0].inv_model
  res.render("./inventory/details", {
    title: vehicleMake + "  " + vehicleModel,
    nav,
    detailView,
  })
}

module.exports = invCont