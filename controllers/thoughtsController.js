const res = require('express/lib/response');
const { User, Reaction, Thoughts } = require('../models');
const { ObjectId } = require('mongoose');

module.exports = {
    //GET ALL THOUGHTS
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thoughts.find()
            .select('-__v');
            res.json(allThoughts);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    },
    //CREATE NEW THOUGHT
    async createNewThought(req, res) {
        try {
            const newThought = await Thoughts.create(req.body);
            await User.findByIdAndUpdate(req.body.userId,
                { $addToSet: { thoughts: newThought._id } },
                { new: true });
            res.json(newThought);
            console.log(newThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    // async createNewThought(req, res) {
    //     try {
            
    //         res.json(newThought);
    //         console.log(newThought);
    //     } catch (err) {
    //         res.status(500).json(err.message);
    //     }
    // },
    //GET THOUGHT BY ID
    async getThoughtById(req, res) {
        try {
            const singleThought = await Thoughts.findOne(
                { _id: req.params.thoughtId })
                .select('-__v');
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //UPDATE THOUGHT BY ID
    async updateThought(req, res) {
        try {
            
            const changedThought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $set: req.body }, 
                { returnDocument: "after" });
            res.json(changedThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //REMOVE THOUGHT BY ID
    async deleteThought(req, res) {
        try {
            const removedThought = await Thoughts.findByIdAndDelete(req.params.thoughtId);
            res.status(200).json(removedThought);
            console.log(`Deleted: ${removedThought}`);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const newReaction = await Thoughts.findByIdAndUpdate( 
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true });
            res.json(newReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove reaction from thought
    async removeReaction(req, res) {
        try {
            const killReaction = await Thoughts.findByIdAndUpdate(
                req.params.thoughtId, 
                { $pull: { reactions: { reactionId: req.params.reactionId } } }, 
                { new: true });
            res.json(killReaction);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};