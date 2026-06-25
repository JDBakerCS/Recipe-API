const express = require('express')
const router = express.Router();

let reviews = [
    { id: 1, recipeId: 1, reviewer: "Sam", rating: 5, comment: "Restaurant quality." },
    { id: 2, recipeId: 1, reviewer: "Priya", rating: 4, comment: "Good but a little salty." },
    { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;

function validateReview(req, res, next) {
    console.log("BODY:", req.body);
    console.log("RATING:", req.body.rating);
    console.log("TYPE:", typeof req.body.rating);
    const { rating } = req.body;

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({
            error: "Rating must be a number between 1 and 5"
        })
    }
    next();
}
router.get("/:recipeId/reviews", (req, res, next) => {
    try {

        const recipeId = Number(req.params.recipeId);

        const recipeReviews = reviews.filter((review) => {
            return review.recipeId === recipeId;
        });

        res.json(recipeReviews)
    } catch (err) {
        next(err);
    }
});
router.post("/:recipeId/reviews", validateReview, (req, res, next) => {
    try {
        const recipeId = Number(req.params.recipeId);
        const { reviewer, rating, comment } = req.body;
        const newReview = {
            id: nextReviewId,
            recipeId: recipeId,
            reviewer: reviewer,
            rating: rating,
            comment: comment
        };
        nextReviewId++;
        reviews.push(newReview);
        res.status(201).json(newReview)
    } catch (err) {
        next(err);
    }
})
router.delete("/:id", (req, res, next) => {
    try {
        const reviewId = Number(req.params.id) 
        const reviewIndex = reviews.findIndex((review) => {
            return review.id === reviewId
        })
        if (reviewIndex === -1) {
            return res.status(404).json({
                error: "review not found"
            })
        }
        reviews.splice(recipeIndex, 1)

        res.sendStatus(204)
        } catch (err) {
        next(err)
    }
})
module.exports = router;