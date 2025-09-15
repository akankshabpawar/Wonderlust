const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const lists = require("../modles/listing");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js"); 
// const { equal } = require("joi");
// const listingSchema = require("../schema.js");

// const validateListing = (req, res, next) => {
//   const result = listingSchema.validate(req.body);

//   if (result.error) {
//     const msg = result.error.details.map(el => el.message).join(', ');
//     throw new ExpressError(400, msg);
//   }
//   next();
// };


// all listing 
router.get("/", wrapAsync( listingController.index));

// rendering form
router.get("/new", isLoggedIn, listingController.renderForm);

// Add new listing 
router.post("/", isLoggedIn, wrapAsync(listingController.addNewListing));

// show listing using id from req.body
router.get("/:id", wrapAsync( listingController.showlisting));

// render form to EDIT 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner, wrapAsync( listingController.updateListing))

// delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync( listingController.deleteListing));

module.exports = router;