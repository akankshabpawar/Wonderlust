const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const reviews = require("../modles/review.js");
const lists = require("../modles/listing");
const reviewSchema = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

const validateReview = (req, res, next) => {
  const result = reviewSchema.validate(req.body);

  if (result.error) {
    const msg = result.error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  }
  next();
};

// Add review in show page
router.post("/", isLoggedIn, validateReview, wrapAsync( reviewController.createReview));

//delete for review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;