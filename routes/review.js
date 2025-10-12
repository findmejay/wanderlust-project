const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { validateReview, isLoggedin, isReviewOwner } = require("../middleware.js");
const reviewController = require("../controller/review.js");

//Post Route
router.post(
  "/",
  isLoggedin, 
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",isLoggedin, isReviewOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
