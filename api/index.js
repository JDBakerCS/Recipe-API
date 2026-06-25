const express = require("express");
const router = express.Router();
const recipeRouter= require("./recipes");
const reviewsRouter= require("./reviews");


router.use("/recipes", recipeRouter);
router.use("/recipes", reviewsRouter);


module.exports = router;