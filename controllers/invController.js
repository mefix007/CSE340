const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

/* ***************************
* Build inventory by classification view
* ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
const classification_id = req.params.classificationId;
const data = await invModel.getInventoryByClassificationId(classification_id);
const grid = await utilities.buildClassificationGrid(data);
let nav = await utilities.getNav();
const className = data[0].classification_name;
res.render("./inventory/classification", {
title: className + " vehicles",
nav,
grid,
});
};

/* ***************************
* Build inventory by inventory detail
* ************************** */
invCont.getInventoryDetail = async function (req, res) {
const inv_id = req.params.inventoryId;
try {
const vehicle = await invModel.getVehicleById(inv_id);
if (!vehicle) {
return res
.status(404)
.render("inventory/not-found", { title: "Vehicle Not Found" });
}
console.log(vehicle);
const vehicleHTML = await utilities.wrapVehicleDetail(vehicle);
console.log(vehicleHTML);
let nav = await utilities.getNav();
res.render("inventory/detail", {
title: `${vehicle.inv_make} ${vehicle.inv_model}`,
nav,
vehicleHTML,
});
} catch (error) {
console.error(error);
res.status(500).send("Internal Server Error");
}
};