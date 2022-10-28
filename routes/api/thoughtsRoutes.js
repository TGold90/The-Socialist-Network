const { 
    getThoughts, 
    createNewThought, 
    getThoughtById, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction 
} = require('../../controllers/thoughtsController');

const router = require('express').Router();

//get all thoughts - create new thought
router.route('/').get(getThoughts).post(createNewThought);

//get thought by ID - update thought - delete thought
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

//add reaction to thoguht
router.route('/:thoughtId/reactions').post(addReaction);

//add reaction to thought - delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// thoughts not populating and removeReaction funciton getting "wrong route"

module.exports = router;