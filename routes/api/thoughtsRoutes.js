const { getThoughts, createNewThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thoughtsController');

const router = require('express').Router();

router.route('/').get(getThoughts).post(createNewThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);