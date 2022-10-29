const res = require('express/lib/response');
const { User, Reaction, Thoughts } = require('../models');

module.exports = {
    //GET ALL USERS
    //THOUGHTS ARE NOT PROPERLY POPULATING
    async getUsers(req, res) {
        try {
            const allUsers = await User.find().select('-__v').populate('thoughts').populate('friends');
            res.json(allUsers);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    },
    //CREATE NEW USER
    async createNewUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
            console.log(newUser);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //GET USER BY ID
    //THOUGHTS ARE NOT PROPERLY POPULATING
    async getUserById(req, res) {
        console.log(req.params.userId);
        try {
            const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');
            res.json(singleUser);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //UPDATE USER BY ID
    async updateUser(req, res) {
        try {
            const changedUser = await User.findOneAndUpdate(
                { _id: req.params.userId }, { $set: req.body }, { returnDocument: "after" });
            res.json(changedUser);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //REMOVE USER BY ID
    async deleteUser(req, res) {
        try {
            const destroyUser = await User.findByIdAndDelete(req.params.userId);
            res.status(200).json(destroyUser);
            console.log(`Deleted: ${destroyUser}`);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    // ADD FRIEND
    async addFriend(req, res) {
        try {
            const newFriend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            res.json(newFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const killFriend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            res.json(killFriend);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};


