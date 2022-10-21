const res = require('express/lib/response');
const { User, Reaction, Thoughts } = require('../models');

module.exports = {
    //GET ALL THOUGHTS
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thoughts.find();
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
            res.json(newThought);
            console.log(newThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //GET USER BY ID
    async getThoughtById(req, res) {
        console.log(req.params.userId);
        try {
            const singleThought = await Thoughts.findOne({ _id: req.params.thoughtId });
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //UPDATE USER BY ID
    async updateThought(req, res) {
        try {
            // i think the filter is not quite right. see { _id: ObjectId(req.body.id) }, from activity 6
            const changedThought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId }, { $set: req.body }, { returnDocument: "after" });
            res.json(changedThought);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //REMOVE USER BY ID
    async deleteThought(req, res) {
        try {
            const removedThought = await Thoughts.findByIdAndDelete(req.params.thoughtId);
            res.status(200).json(removedThought);
            console.log(`Deleted: ${removedThought}`);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
};