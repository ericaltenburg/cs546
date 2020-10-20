const express = require('express');
const router = express.Router();
const data = require('../data');
const reviews = require('../data/reviews');
const reviewsData = data.reviews;
const booksData = data.books;

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    try {
        const reviewsList = await reviewsData.getAll(req.params.id);
        res.status(200).json(reviewsList);
    } catch (e) {
        res.status(404).json({error: "No reviews found for that book"});
    }
});

router.post('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    const reviewData = req.body;

    if (!reviewData.title) {
        res.status(400).json({error: "You must provide a title"});
        return;
    }
    if (!reviewData.reviewer) {
        res.status(400).json({error: "You must provide a reviewer"});
        return;
    }
    if (!reviewData.bookBeingReviewed) {
        res.status(400).json({error: "You must provide a bookBeingReviewed"});
        return;
    }
    if (!reviewData.rating) {
        res.status(400).json({error: "You must provide a rating"});
        return;
    }
    if (!reviewData.dateOfReview) {
        res.status(400).json({error: "You must provide a dateOfReview"});
        return;
    }
    if (!reviewData.review) {
        res.status(400).json({error: "You must provide a review"});
        return;
    }

    try {
        await booksData.get(reviewData.bookBeingReviewed);
    } catch (e) {
        res.status(400).json({error: "Book not found with that id."})
        return;
    }

    try {
        const newReview = await reviewsData.create(reviewData.title, reviewData.reviewer, reviewData.bookBeingReviewed, reviewData.rating, reviewData.dateOfReview, reviewData.review);
        res.status(200).json(newReview);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/:tag/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }

    try {
        const reviewGot = await reviewsData.getById(req.params.id);
        res.status(200).json(reviewGot);
    } catch (e) {
        res.status(404).json({error: "Review not found with that id."});
    }
});

router.delete('/:tag/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an id' });
        return;
    }
    
    try {
        const removedReview = await reviewsData.remove(req.params.id, true);
        res.status(200).json(removedReview);
    } catch (e) {
        res.status(500).json({error: e})
    }
});

module.exports = router;