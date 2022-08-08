// Imports 
const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    createReaction,
    updateThought,
    deleteReaction,
    deleteThought
} = require('../../controllers/thought-controller');

// Routes for Thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
;

// Routes for ID
router      
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
;

// Routes for Reaction
router  
    .route('/:thoughtId/reactions')
    .post(createReaction)
;

// Routes for DELETE Reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)
;

// Export for External
module.exports = router;